const test = require('node:test');
const assert = require('node:assert/strict');

const { modulo, power, squareRoot } = require('../calculator');

test('modulo returns the remainder', () => {
  assert.equal(modulo(10, 3), 1);
});

test('modulo throws when divisor is zero', () => {
  assert.throws(() => modulo(10, 0), /modulo by zero/i);
});

test('power returns base raised to exponent', () => {
  assert.equal(power(2, 4), 16);
});

test('power supports negative exponents', () => {
  assert.equal(power(2, -2), 0.25);
});

test('power with zero exponent returns one', () => {
  assert.equal(power(5, 0), 1);
});

test('squareRoot returns square root of non-negative number', () => {
  assert.equal(squareRoot(81), 9);
});

test('squareRoot throws for negative input', () => {
  assert.throws(() => squareRoot(-1), /square root of a negative/i);
});
