// Signs and verifies the OAuth `state` value shared by auth.js and
// callback.js. See the comment in auth.js for why this replaced a
// cookie-based check.
//
// The signed payload also carries the exact redirect_uri used when starting
// the flow, so callback.js can reuse that same string for the token exchange
// instead of recomputing it from its own request's headers — which could, in
// principle, differ from auth.js's computation for the same login attempt.

const crypto = require('crypto');

const MAX_AGE_MS = 10 * 60 * 1000; // matches the old cookie's Max-Age=600

function signState(secret, data) {
  const ts = Date.now().toString(36);
  const body = Buffer.from(JSON.stringify(data)).toString('base64url');
  const payload = `${ts}.${body}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

// Returns the decoded data object if `state` is validly signed and not
// expired, otherwise null.
function verifyState(secret, state) {
  if (typeof state !== 'string') return null;
  const parts = state.split('.');
  if (parts.length !== 3) return null;
  const [ts, body, sig] = parts;
  const payload = `${ts}.${body}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  const issuedAt = parseInt(ts, 36);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > MAX_AGE_MS) return null;

  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

module.exports = { signState, verifyState };
