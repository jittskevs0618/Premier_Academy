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
  const stateData = verifyState(clientSecret, state);

  if (!code || !stateData) {
    res.status(400).send(html(post('authorization:github:error:state mismatch')));
    return;
  }

  // Reuse the exact redirect_uri string from step 1 (embedded in the signed
  // state) instead of recomputing it from this request's own headers — see
  // the comment in auth.js for why.
  const redirectUri = stateData.redirectUri;

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
    });
    const data = await tokenRes.json();

    if (!data.access_token) {
      // TEMPORARY: include the exact redirect_uri sent to GitHub, and this
      // request's own headers, to diagnose a recurring "bad_verification_code"
      // error even after fixing the redirect_uri to no longer be recomputed
      // independently here. Remove once resolved.
      const debug = `redirect_uri=${redirectUri} host=${req.headers.host} x-forwarded-host=${req.headers['x-forwarded-host']} x-forwarded-proto=${req.headers['x-forwarded-proto']}`;
      res.status(400).send(html(post(
        `authorization:github:error:${data.error_description || data.error || 'no token returned'} | ${debug}`
      )));
      return;
    }

    const message = `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`;
    res.status(200).send(html(post(message)));
  } catch (err) {
    res.status(500).send(html(post(`authorization:github:error:${String(err.message || err)}`)));
  }
};
