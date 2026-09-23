// OAuth step 1: redirect the CMS login popup to GitHub's authorize screen.
//
// Decap CMS (the admin UI at /admin/) needs a small server-side helper to log
// an editor in with GitHub, because the client secret can never be exposed in
// the browser. This project isn't on Netlify (which bundles that helper as
// "Git Gateway"), so this pair of files — auth.js and callback.js — is that
// helper, running as a Vercel serverless function.
//
// Flow: /admin/ opens this in a popup -> redirects here to GitHub -> GitHub
// redirects back to /api/callback with a code -> callback.js exchanges it for
// a token and hands it back to the opener window. See callback.js for the
// second half.

module.exports = (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID environment variable.');
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  // A random state, checked again in callback.js, so a third party can't feed
  // the callback a code that didn't originate from this login attempt.
  const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
  res.setHeader(
    'Set-Cookie',
    `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  res.writeHead(302, { Location: authorizeUrl.toString() });
  res.end();
};
