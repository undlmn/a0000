import {
  a0000,
  genKey,
  calcHash,
  uniqueKeysPool,
  uniqueHashPool,
} from "./index.js";

const _ = JSON.stringify.bind(JSON);

const uniqueKey = uniqueKeysPool();

const uniqueHash1 = uniqueHashPool();
const uniqueHash2 = uniqueHashPool();
const uniqueHash3 = uniqueHashPool();

const testString = (callback) => {
  const times = 100000;
  it(`Should return string /^[a-z][a-z0-9]{4}$/ (test ${times} times)`, () => {
    for (let i = 0; i < times; i++) {
      const result = callback(i);
      if (typeof result != "string" || !/^[a-z][a-z0-9]{4}$/.test(result)) {
        throw new Error(`Unexpected result ${_(result)}.`);
      }
    }
  });
};

const testResult = (script, expected) => {
  it(`${script} should return ${_(expected)}`, () => {
    const result = eval(script);
    if (result !== expected) {
      throw new Error(`Expected ${_(expected)}, but got ${_(result)}.`);
    }
  });
};

describe("a0000", () => {
  testString((i) => a0000(Math.random() * 2 ** 53));

  testResult("a0000(0)", "a0000");
  testResult("a0000(43670015)", "zzzzz");
  testResult("a0000(43670016)", "a0000");
  testResult("a0000(43670017)", "a0001");
  testResult("a0000(9007199254740991)", "ja2gv");
  testResult("a0000(-43670015)", "a0001");
  testResult("a0000(-43670016)", "a0000");
  testResult("a0000(-43670017)", "zzzzz");
  testResult("a0000(-9007199254740991)", "qpxj5");
  testResult("a0000()", "a0000");
  testResult("a0000(Infinity)", "a0000");
  testResult('a0000("2")', "a0002");
  testResult('a0000("text")', "a0000");
  testResult("a0000({})", "a0000");
});

describe("genKey", () => {
  testString((i) => genKey());
});

describe("calcHash", () => {
  testString((i) => calcHash(`${Math.random() * 2 ** 53}-${i}`));

  testResult("calcHash()", "yvpdr");
  testResult('calcHash("undefined")', "yvpdr");
  testResult('calcHash("We\'re thinking of the answer right now.")', "qak8z");
  testResult("calcHash(12344)", "msqxh");
  testResult("calcHash(12345)", "ngml0");
  testResult("calcHash(12345, 1)", "ngml1");
  testResult("calcHash(12345, 36)", "ngmm0");
  testResult('calcHash("")', "a045h");
  testResult('calcHash("", -5381)', "a0000");
});

describe("uniqueKeysPool", () => {
  testString((i) => uniqueKey());

  const times = 100000;
  it(`Should generate only unique keys (test ${times} times)`, () => {
    const keys = new Set();
    for (let i = 0; i < times; i++) {
      const result = uniqueKey();
      if (keys.has(result)) {
        throw new Error(`Not a unique result ${_(result)}.`);
      }
      keys.add(result);
    }
  });
});

describe("uniqueHashPool", () => {
  testString((i) => uniqueHash1(`${Math.random() * 2 ** 53}-${i}`));

  const times = 100000;
  it(`Should generate only unique hashes (test ${times} times)`, () => {
    const hashes = new Set();
    for (let i = 0; i < times; i++) {
      const result = uniqueHash1(`${Math.random() * 2 ** 53}-${i}`);
      if (hashes.has(result)) {
        throw new Error(`Not a unique result ${_(result)}.`);
      }
      hashes.add(result);
    }
  });

  // Testing the shift on collisions
  testResult('uniqueHash2("54046682175001622430432380439894")', "zovn0");
  testResult('uniqueHash3("72309725032890587578023469422484")', "zovn0");
  testResult('uniqueHash2("72309725032890587578023469422484")', "zovn1");
});
