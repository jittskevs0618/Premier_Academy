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

const crypto = require('crypto');
const { signState } = require('./_state');

module.exports = (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID environment variable.');
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;

  // The state passed to GitHub is self-verifying (timestamp + nonce, signed
  // with the client secret) instead of a value stashed in a cookie and
  // compared on the way back. A cookie set immediately before redirecting to
  // another site is exactly the pattern several browsers' anti-tracking
  // protections (Safari ITP, Brave Shields, and others) are designed to
  // drop or shorten — which broke real logins here. Signing the state
  // itself means callback.js can verify it came from us without needing
  // anything to have survived the round trip.
  const nonce = crypto.randomBytes(16).toString('base64url');
  const state = signState(clientSecret, nonce);

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  res.writeHead(302, { Location: authorizeUrl.toString() });
  res.end();
};
