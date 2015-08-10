import _ from 'lodash';
import chai from 'chai';
const assert = chai.assert;


// Instead of _.extend
const dst = { xeb: 0 };
const src1 = { foo: 1, bar: 2 };
const src2 = { foo: 3, baz: 4 };

_.extend(dst, src1, src2);

assert.deepEqual(dst, { xeb: 0, foo: 3, bar: 2, baz: 4 });

// ... you can use Object.assign
const dst2 = { xeb: 0 };

Object.assign(dst2, src1, src2);

assert.deepEqual(dst2, { xeb: 0, foo: 3, bar: 2, baz: 4 });


// Instead of _.defaults / _.defaultsDeep for config object param
function someFuncExpectingConfig(config) {
  _.defaultsDeep(config, {
    text: 'default',
    colors: {
      bgColor: 'black',
      fgColor: 'white'
    }
  });
  return config;
}
let config = { colors: { bgColor: 'grey' } };

someFuncExpectingConfig(config);

assert.equal(config.text, 'default');
assert.equal(config.colors.bgColor, 'grey');
assert.equal(config.colors.fgColor, 'white');

// ... you can use destructuring
function destructuringFuncExpectingConfig({
  text = 'default',
  colors: {
    bgColor: bgColor = 'black',
    fgColor: fgColor = 'white' }
  }) {
  return { text, bgColor, fgColor };
}

const config2 = destructuringFuncExpectingConfig({ colors: { bgColor: 'grey' } });

assert.equal(config2.text, 'default');
assert.equal(config2.bgColor, 'grey');
assert.equal(config2.fgColor, 'white');


// Instead of:
// _.find
// _.findIndex
const arr = [{ name: 'A', id: 123 }, { name: 'B', id: 436 }, { name: 'C', id: 568 }];
function predicateB(val) {
  return val.name === 'B';
}

assert.equal(_.find(arr, predicateB).id, 436);
assert.equal(_.findIndex(arr, predicateB), 1);

// ... you can use Array builtins
assert.equal(Array.find(arr, predicateB).id, 436);
assert.equal(Array.findIndex(arr, predicateB), 1);


// Instead of _.fill
const filled = _.fill(new Array(3), 'a', 1);
assert.deepEqual(filled, [, 'a', 'a']);

// .. you can use Array.fill
const filled2 = Array.fill(new Array(3), 'a', 1);
assert.deepEqual(filled2, [, 'a', 'a']);


// Instead of:
// _.repeat
// _.startsWith
// _.endsWith
// _.includes (for strings)
assert.equal(_.repeat('ab', 3), 'ababab');
assert.isTrue(_.startsWith('ab', 'a'));
assert.isTrue(_.endsWith('ab', 'b'));
assert.isTrue(_.includes('abc', 'b'));

// ... you can use String builtins
assert.equal('ab'.repeat(3), 'ababab');
assert.isTrue('ab'.startsWith('a'));
assert.isTrue('ab'.endsWith('b'));
assert.isTrue('abc'.includes('b'));


// Instead of:
// _.isNaN
// _.isFinite
assert.isTrue(_.isNaN(NaN));
assert.isFalse(_.isFinite(Infinity));

// .. you can use Number builtins
assert.isTrue(Number.isNaN(NaN));
assert.isFalse(Number.isFinite(Infinity));


// Instead of
// _.first
// _.rest
const elems = [1, 2, 3];

assert.equal(_.first(elems), 1);
assert.deepEqual(_.rest(elems), [2, 3]);

// ... you can use the rest parameter and destructuring
const [first, ...rest] = elems;

assert.equal(first, 1);
assert.deepEqual(rest, [2, 3]);


// Instead of _.restParam
function whatNames(what, names) {
  return what + ' ' + names.join(';');
}
const restWhatNames = _.restParam(whatNames);

assert.equal(restWhatNames('hi', 'a', 'b', 'c'), 'hi a;b;c');

// ... you can use the rest parameter
function whatNamesWithRest(what, ...names) {
  return what + ' ' + names.join(';');
}

assert.equal(whatNamesWithRest('hi', 'a', 'b', 'c'), 'hi a;b;c');


// Instead of _.spread
function whoWhat(who, what) {
  return who + ' ' + what;
}
const spreadWhoWhat = _.spread(whoWhat);
const callArgs = ['yo', 'bro'];

assert.equal(spreadWhoWhat(callArgs), 'yo bro');

// ... you can use the spread operator
assert.equal(whoWhat(...callArgs), 'yo bro');


// Instead of using
// _.values
// _.keys
// _.pairs
const bar = { a: 1, b: 2, c: 3 };

const values = _.values(bar);
const keys = _.keys(bar);
const pairs = _.pairs(bar);

assert.deepEqual(values, [1, 2, 3]);
assert.deepEqual(keys, ['a', 'b', 'c']);
assert.deepEqual(pairs, [['a', 1], ['b', 2], ['c', 3]]);

// ... you can use Object builtins

const values2 = Object.values(bar);
const keys2 = Object.keys(bar);
const pairs2 = Object.entries(bar);

assert.deepEqual(values2, [1, 2, 3]);
assert.deepEqual(keys2, ['a', 'b', 'c']);
assert.deepEqual(pairs2, [['a', 1], ['b', 2], ['c', 3]]);


// Instead of using _.forIn
const foo = { a: 1, b: 2, c: 3 };
let sum = 0;
let lastKey = undefined;

_.forIn(foo, function (value, key) {
  sum += value;
  lastKey = key;
});

assert.equal(sum, 6);
assert.equal(lastKey, 'c');

// .. you can use for-of syntax with Object.entries and destructuring

sum = 0;
lastKey = undefined;
for (let [key, value] of Object.entries(foo)) {
  sum += value;
  lastKey = key;
}

assert.equal(sum, 6);
assert.equal(lastKey, 'c');


// Instead of _.get
const obj = { a: [{}, { b: { c: 3 } }] };

const getC = _.get(obj, 'a[1].b.c');

assert.equal(getC, 3);

// .. you can use destructuring
let a, b, c;
({ a : [, { b: { c } }]} = obj);

assert.equal(c, 3);


// Instead of _.range
const range = _.range(5, 10, 2);

assert.deepEqual(range, [5, 7, 9]);

// ... you can use a generator and the spread operator
function* rangeGen(from, to, step = 1) {
  for (let i = from; i < to; i += step) {
    yield i;
  }
}

const range2 = [...rangeGen(5, 10, 2)];

assert.deepEqual(range2, [5, 7, 9]);


console.log('All green');
