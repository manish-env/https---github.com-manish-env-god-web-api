const { scryptSync, timingSafeEqual } = require('crypto');
const bcrypt = require('bcryptjs');

function b64ToBuffer(b64) {
  const base64 = b64.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  return Buffer.from(base64 + pad, 'base64');
}

function verifyScrypt(password, stored) {
  // Supports formats:
  // - s2$<salt_b64>$<hash_b64>
  // - s2$<N>$<r>$<p>$<salt_b64>$<hash_b64>
  const parts = stored.split('$');
  if (parts[0] !== 's2') return false;

  let saltB64, hashB64, N = 16384, r = 8, p = 1;
  if (parts.length === 3) {
    saltB64 = parts[1];
    hashB64 = parts[2];
  } else if (parts.length === 6) {
    N = parseInt(parts[1], 10) || 16384;
    r = parseInt(parts[2], 10) || 8;
    p = parseInt(parts[3], 10) || 1;
    saltB64 = parts[4];
    hashB64 = parts[5];
  } else {
    return false;
  }

  const salt = b64ToBuffer(saltB64);
  const expected = b64ToBuffer(hashB64);
  const derived = scryptSync(password, salt, expected.length, { N, r, p });
  return timingSafeEqual(expected, derived);
}

async function verifyPassword(storedHash, password) {
  if (!storedHash || !password) return false;
  try {
    if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$') || storedHash.startsWith('$2y$')) {
      return await bcrypt.compare(password, storedHash);
    }
    if (storedHash.startsWith('s2$')) {
      return verifyScrypt(password, storedHash);
    }
    // Fallback: hex salt:hash
    if (storedHash.includes(':')) {
      const [saltHex, hashHex] = storedHash.split(':');
      const salt = Buffer.from(saltHex, 'hex');
      const expected = Buffer.from(hashHex, 'hex');
      const derived = scryptSync(password, salt, expected.length);
      return timingSafeEqual(expected, derived);
    }
  } catch {
    return false;
  }
  return false;
}

module.exports = { verifyPassword };


