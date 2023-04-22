const A = parseInt("a0000", 36);
const Q = parseInt("q0000", 36);
const H = (s) => {
  let n = 5381;
  for (let i = s.length; i--; n = (n * 33) ^ s.charCodeAt(i));
  return n;
};

function a0000(n) {
  if (!Number.isInteger(n)) {
    throw TypeError("a0000 argument must be an integer");
  }
  return (A + (((n % Q) + Q) % Q)).toString(36);
}

function toNumber(a) {
  if (typeof a != "string" || !/^[a-z][\da-z]{4}$/.test(a)) {
    throw TypeError("toNumber argument must be a string in `a0000` format");
  }
  return parseInt(a, 36) - A;
}

const keys = new Set();

export function genKey() {
  let key;
  do {
    key = a0000(Math.floor(Math.random() * Q));
  } while (keys.has(key));
  keys.add(key);
  return key;
}

const cache = new Map();

export function hash(...args) {
  const s = JSON.stringify(args);
  if (cache.has(s)) {
    return cache.get(s);
  }
  const h = a0000(H(s));
  cache.set(s, h);
  return h;
}

const cacheEC = new Map();
const hashesEC = new Set();

export function hashEC(...args) {
  const s = JSON.stringify(args);
  if (cacheEC.has(s)) {
    return cacheEC.get(s);
  }
  const h = a0000(H(s));
  if (hashesEC.has(h)) {
    throw new Error("A hash collision has occurred");
  }
  cacheEC.set(s, h);
  hashesEC.add(h);
  return h;
}

const cacheSC = new Map();
const hashesSC = new Set();

export function hashSC(...args) {
  const s = JSON.stringify(args);
  if (cacheSC.has(s)) {
    return cacheSC.get(s);
  }
  let n = H(s);
  let h;
  do {
    h = a0000(n++);
  } while (hashesSC.has(h));
  cacheSC.set(s, h);
  hashesSC.add(h);
  return h;
}

export default Object.assign(a0000, { toNumber, genKey, hash, hashEC, hashSC });
