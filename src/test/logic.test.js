/** @vitest-environment jsdom */
import { describe, it, expect } from 'vitest';
import { greet, add, updateScore, getScore, resetScore } from '../js/main.js';
import { sumArray } from '../js/array.js';
import { getProperty } from '../js/object.js';
import { reverseString } from '../js/string.js';

describe('Core Logic', () => {
  it('greet function should return "Hello, World!"', () => {
    expect(greet()).toBe('Hello, World!');
  });

  it('add function should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it('score functions should work correctly', () => {
    document.body.innerHTML = '<div id="score"></div>';
    resetScore();
    expect(getScore()).toBe(0);
    updateScore(10);
    expect(getScore()).toBe(10);
    updateScore(5);
    expect(getScore()).toBe(15);
  });

  it('sumArray function should sum an array of numbers', () => {
    expect(sumArray([1, 2, 3])).toBe(6);
    expect(sumArray([-1, 1, 0])).toBe(0);
    expect(sumArray([])).toBe(0);
  });

  it('getProperty function should get a property from an object', () => {
    const obj = { a: 1, b: { c: 2 } };
    expect(getProperty(obj, 'a')).toBe(1);
    expect(getProperty(obj, 'b.c')).toBe(2);
    expect(getProperty(obj, 'd')).toBeUndefined();
  });

  it('reverseString function should reverse a string', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('')).toBe('');
    expect(reverseString('a')).toBe('a');
  });
});
