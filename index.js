const q0000 = 43670016;

/**
 * Converts a number (modulo 43670016) into
 * a five-character string of lowercase letters and numbers
 * where the first character is always a letter.
 * (a0000-zzzzz)
 */
export function a0000(num) {
  num = Math.floor(num) % q0000;
  if (isNaN(num)) {
    num = 0;
  } else if (num < 0) {
    num += q0000;
  }
  return (q0000 / 2.6 + num).toString(36);
}

/**
 * Generates a random key
 * as a five-character string of lowercase letters and numbers
 * where the first character is always a letter.
 * (a0000-zzzzz)
 */
export function genKey() {
  return a0000(Math.random() * q0000);
}

/**
 * Calculates the hash
 * as a five-character string of lowercase letters and numbers
 * where the first character is always a letter.
 * (a0000-zzzzz)
 */
export function calcHash(str, shift = 0) {
  str = String(str);
  let num = 5381;
  for (let i = str.length; i--; ) {
    num = (num * 33) ^ str.charCodeAt(i);
  }
  return a0000(num + shift);
}

/**
 * Returns a function that generates unique keys
 * as a five-character string of lowercase letters and numbers
 * where the first character is always a letter.
 * (a0000-zzzzz)
 */
export function uniqueKeysPool() {
  const keys = new Set();

  return function uniqueKey() {
    const key = genKey();
    if (keys.has(key)) {
      return uniqueKey();
    }
    keys.add(key);

    return key;
  };
}

/**
 * Returns a function that calculates unique hashes (shift collisions)
 * as a five-character string of lowercase letters and numbers
 * where the first character is always a letter.
 * (a0000-zzzzz)
 */
export function uniqueHashPool() {
  const cache = new Map();
  const hashes = new Set();

  return function uniqueHash(str) {
    if (cache.has(str)) {
      return cache.get(str);
    }

    let hash;
    let shift = 0;
    do {
      hash = calcHash(str, shift++);
    } while (hashes.has(hash));
    cache.set(str, hash);
    hashes.add(hash);

    return hash;
  };
}
