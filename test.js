import a0000, { genKey, hash, hashEC, hashSC } from "./index.js";

const sfy = JSON.stringify;

const testStringFormat = (callback, times = 1) => {
  it(`${callback
    .toString()
    .replace(
      /^\(i?\) => /,
      ""
    )}; // Should return /^[a-z][a-z\\d]{4}$/ string (test ${times} times)`, () => {
    for (let i = 0; i < times; i++) {
      const result = callback(i);
      if (typeof result != "string" || !/^[a-z][a-z\d]{4}$/.test(result)) {
        throw new Error(
          `Unexpected result ${sfy(
            result
          )}. It should be string in \`a0000\` format`
        );
      }
    }
  });
};

const testResult = (callback, expected) => {
  const throws = typeof expected == "function";
  it(`${callback.toString().replace(/^\(\) => /, "")}; // Should ${
    throws ? `throw ${expected.name}` : `return ${sfy(expected)}`
  }`, () => {
    if (throws) {
      let threw = false;
      try {
        callback();
      } catch (e) {
        if (e.constructor === expected) {
          threw = true;
        }
      }
      if (!threw) {
        throw new Error(
          `An exception with ${expected.name} was expected but it didn't happen`
        );
      }
    } else {
      const result = callback();
      if (result !== expected) {
        throw new Error(`Expected ${sfy(expected)}, but got ${sfy(result)}.`);
      }
    }
  });
};

describe("a0000()", () => {
  testStringFormat(() => a0000(Math.random() * 2 ** 53), 100000);
  [
    [() => a0000(0), "a0000"],
    [() => a0000(43670015), "zzzzz"],
    [() => a0000(43670016), "a0000"],
    [() => a0000(43670017), "a0001"],
    [() => a0000(9007199254740991), "ja2gv"],
    [() => a0000(-43670015), "a0001"],
    [() => a0000(-43670016), "a0000"],
    [() => a0000(-43670017), "zzzzz"],
    [() => a0000(-9007199254740991), "qpxj5"],
    [() => a0000(), TypeError],
    [() => a0000(true), TypeError],
    [() => a0000("1"), TypeError],
    [() => a0000({}), TypeError],
    [() => a0000(1.2), TypeError],
    [() => a0000(Infinity), TypeError],
  ].forEach((a) => testResult(...a));
});

describe("a0000.toNumber()", () => {
  [
    [() => a0000.toNumber("a0000"), 0],
    [() => a0000.toNumber("zzzzz"), 43670015],
    [() => a0000.toNumber("ja2gv"), 15586303],
    [() => a0000.toNumber("54321"), TypeError],
    [() => a0000.toNumber(54), TypeError],
    [() => a0000.toNumber({}), TypeError],
    [() => a0000.toNumber(), TypeError],
  ].forEach((a) => testResult(...a));
});

describe("genKey()", () => {
  testStringFormat(() => genKey(), 100000);
});

describe("hash()", () => {
  testStringFormat((i) => hash(i, `${Math.random() * 2 ** 53}-${i}`), 10000);
  [
    [() => hash(), "dhnkz"],
    [() => hash(null), "kw2uw"],
    [() => hash(0), "l6n4j"],
    [() => hash(""), "vzmg3"],
    [() => hash(false), "phxoe"],
    [() => hash(78), "vz158"],
    [() => hash("Lorem ipsum"), "eg008"],
    [() => hash({ a: 1, b: 2 }), "gkxpl"],
    [() => hash(true, [7, 6, 5], null, 3.14), "mqnmw"],
    [() => hash(194998), "w1odj"],
    [() => hash(203894), "w1odj"],
  ].forEach((a) => testResult(...a));
});

describe("hashEC()", () => {
  [
    [() => hashEC(), "dhnkz"],
    [() => hashEC(null), "kw2uw"],
    [() => hashEC(0), "l6n4j"],
    [() => hashEC(""), "vzmg3"],
    [() => hashEC(false), "phxoe"],
    [() => hashEC(78), "vz158"],
    [() => hashEC("Lorem ipsum"), "eg008"],
    [() => hashEC({ a: 1, b: 2 }), "gkxpl"],
    [() => hashEC(true, [7, 6, 5], null, 3.14), "mqnmw"],
    [() => hashEC(194998), "w1odj"],
    [() => hashEC(203894), Error],
  ].forEach((a) => testResult(...a));
});

describe("hashSC()", () => {
  [
    [() => hashSC(), "dhnkz"],
    [() => hashSC(null), "kw2uw"],
    [() => hashSC(0), "l6n4j"],
    [() => hashSC(""), "vzmg3"],
    [() => hashSC(false), "phxoe"],
    [() => hashSC(78), "vz158"],
    [() => hashSC("Lorem ipsum"), "eg008"],
    [() => hashSC({ a: 1, b: 2 }), "gkxpl"],
    [() => hashSC(true, [7, 6, 5], null, 3.14), "mqnmw"],
    [() => hashSC(194998), "w1odj"],
    [() => hashSC(203894), "w1odk"],
    [() => hashSC(194998), "w1odj"],
    [() => hashSC(203894), "w1odk"],
  ].forEach((a) => testResult(...a));
  testStringFormat((i) => hashSC(i, `${Math.random() * 2 ** 53}-${i}`), 10000);
});
