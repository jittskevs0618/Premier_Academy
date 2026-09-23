// Signs and verifies the OAuth `state` value shared by auth.js and
// callback.js. See the comment in auth.js for why this replaced a
// cookie-based check.

const crypto = require('crypto');

const MAX_AGE_MS = 10 * 60 * 1000; // matches the old cookie's Max-Age=600

function signState(secret, nonce) {
  const ts = Date.now().toString(36);
  const payload = `${ts}.${nonce}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyState(secret, state) {
  if (typeof state !== 'string') return false;
  const parts = state.split('.');
  if (parts.length !== 3) return false;
  const [ts, nonce, sig] = parts;
  const payload = `${ts}.${nonce}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const issuedAt = parseInt(ts, 36);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > MAX_AGE_MS) return false;

  return true;
}

module.exports = { signState, verifyState };
