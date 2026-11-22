import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkQuantity, MAX_QTY } from '../src/rules/rules.js';

// Rule 1: order 1 to MAX_QTY servers of one plan, and not more than the stock.
// In most tests the stock is 10, so only the quantity limit is tested.

test('a normal quantity (2) is accepted', () => {
  const result = checkQuantity(2, 10);
  assert.equal(result.ok, true);
});

test('a quantity exactly at the limit (MAX_QTY) is accepted', () => {
  const result = checkQuantity(MAX_QTY, 10);
  assert.equal(result.ok, true);
});

test('a quantity above the limit (MAX_QTY + 1) is rejected', () => {
  const result = checkQuantity(MAX_QTY + 1, 10);
  assert.equal(result.ok, false);
  assert.match(result.message, new RegExp(`Max is ${MAX_QTY}`));
});

test('a quantity above the stock is rejected', () => {
  const result = checkQuantity(3, 2);
  assert.equal(result.ok, false);
  assert.match(result.message, /Only 2 left/);
});

test('zero is rejected', () => {
  const result = checkQuantity(0, 10);
  assert.equal(result.ok, false);
});
