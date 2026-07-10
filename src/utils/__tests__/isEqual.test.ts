import { describe, expect, it } from "@jest/globals";

import { isEqual } from "../isEqual";

describe("isEqual", () => {
  it("returns true for identical primitives", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual("a", "a")).toBe(true);
    expect(isEqual(true, true)).toBe(true);
  });

  it("returns false for different primitives", () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual("a", "b")).toBe(false);
  });

  it("treats the same reference as equal", () => {
    const obj = { a: 1 };

    expect(isEqual(obj, obj)).toBe(true);
  });

  it("returns true for two null values", () => {
    expect(isEqual(null, null)).toBe(true);
  });

  it("returns false when only one value is null", () => {
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual({}, null)).toBe(false);
  });

  it("returns false when comparing an object with a primitive", () => {
    expect(isEqual({ a: 1 }, 1)).toBe(false);
  });

  it("returns false when one is an array and the other is a plain object", () => {
    expect(isEqual([], {})).toBe(false);
  });

  it("returns true for shallowly equal objects", () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("is order-independent for object keys", () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("returns false when objects differ in a value", () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("returns false when objects have a different number of keys", () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("compares nested objects deeply", () => {
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
  });

  it("compares equal arrays deeply", () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("returns false for arrays with different values", () => {
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it("returns false for arrays of different lengths", () => {
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it("compares arrays of objects deeply", () => {
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])).toBe(false);
  });
});
