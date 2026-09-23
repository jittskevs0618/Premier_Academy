// OAuth step 2: GitHub sends the editor back here with a one-time code. This
// exchanges it server-side for an access token (the only place the client
// secret is ever used) and hands the token to the admin UI that opened the
// popup, using the exact postMessage protocol Decap CMS's OAuth client
// listens for. See auth.js for the first half of this flow.

const { verifyState } = require('./_state');

module.exports = async (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET.');
    return;
  }

  const html = (script) => `<!doctype html><html><body><script>${script}</script></body></html>`;
  const post = (payload) => `
    (function () {
      function receive(message) {
        window.opener.postMessage('authorizing:github', '*');
        window.removeEventListener('message', receive, false);
        window.opener.postMessage(${JSON.stringify(payload)}, message.origin);
      }
      window.addEventListener('message', receive, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  `;

  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !verifyState(clientSecret, state)) {
    res.status(400).send(html(post('authorization:github:error:state mismatch')));
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
    });
    const data = await tokenRes.json();

    if (!data.access_token) {
      res.status(400).send(html(post(`authorization:github:error:${data.error_description || 'no token returned'}`)));
      return;
    }

    const message = `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`;
    res.status(200).send(html(post(message)));
  } catch (err) {
    res.status(500).send(html(post(`authorization:github:error:${String(err.message || err)}`)));
  }
};
