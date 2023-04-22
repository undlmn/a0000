# a0000

Simple and fast hash and pseudorandom key functions in `a0000` format.

## What is `a0000` format?

`a0000` is a string where the first character is always a letter (a-z), and the 4 remaining characters are either a number or a letter. All in lowercase.
43 670 016 possible variants from `"a0000"` to `"zzzzz"`.
This can be useful for auto assigning CSS class names, data keys, etc.

## Install

```bash
npm install a0000
```

## Usage

```js
import { genKey, hash, hashEC, hashSC } from "a0000";
```

or

```js
import a0000 from "a0000";
```

### a0000.genKey()

Generates a pseudorandom key in `a0000` format.
All keys will be unique within the current process.

##### Syntax

```js
genKey();
```

##### Parameter Values

No parameters.

##### Examples

```js
genKey(); // "pl3w8"
genKey(); // "dgfc6"
genKey(); // "om9ad"
```

### a0000.hash()

Calculates the hash sum of data in `a0000` format.

##### Syntax

```js
hash(arg1, arg2, arg3, ...)
```

##### Parameter Values

_arg1, arg2, arg3, ..._ - one or more items to calculate the shared hash. Each item must be a serializable object or primitive.

##### Examples

```js
hash(78); // "vz158"
hash("Lorem ipsum"); // "eg008"
hash({ a: 1, b: 2 }); // "gkxpl"
hash(true, [7, 6, 5], null, 3.14); // "mqnmw"
hash(99n); // Throws TypeError: Do not know how to serialize a BigInt
```

### a0000.hashEC()

Calculates the hash sum of data in `a0000` format with the exception of hash collision.
All calculated hashes are stored in memory, and if a hash collision occurs, an exception will be thrown.

##### Syntax

```js
hashEC(arg1, arg2, arg3, ...)
```

##### Parameter Values

_arg1, arg2, arg3, ..._ - one or more items to calculate the shared hash. Each item must be a serializable object or primitive.

##### Examples

```js
hash(194998); // "w1odj"
hash(203894); // "w1odj"

hashEC(194998); // "w1odj"
hashEC(203894); // Throws Error: A hash collision has occurred
```

### a0000.hashSC()

Calculates the hash sum of data in `a0000` format with the shift of hash collision.
All calculated hashes are stored in memory, and if a hash collision occurs, the next free value will be considered as a hash (see examples).

##### Syntax

```js
hashSC(arg1, arg2, arg3, ...)
```

##### Parameter Values

_arg1, arg2, arg3, ..._ - one or more items to calculate the shared hash. Each item must be a serializable object or primitive.

##### Examples

```js
hash(194998); // "w1odj"
hash(203894); // "w1odj"

hashSC(194998); // "w1odj"
hashSC(203894); // "w1odk"
hashSC(194998); // "w1odj"
hashSC(203894); // "w1odk"
```

### a0000()

Converts a number to a string in `a0000` format.

##### Syntax

```js
a0000(n);
```

##### Parameter Values

_n_ - an integer.

##### Examples

```js
a0000(0); // "a0000"
a0000(123); // "a003f"
a0000(5.3); // Throws TypeError: a0000 argument must be an integer
```

### a0000.toNumber()

Converts string in `a0000` format to number.

##### Syntax

```js
a0000.toNumber(s);
```

##### Parameter Values

_s_ - a string in `a0000` format.

##### Examples

```js
a0000.toString("a0000"); // 0
a0000.toString("a003f"); // 123
a0000.toString("4321z"); // Throws TypeError: toNumber argument must be a string in `a0000` format
```
