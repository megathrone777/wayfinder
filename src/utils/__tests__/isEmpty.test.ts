import { describe, expect, it } from "@jest/globals";

import { isEmpty } from "../isEmpty";

describe("isEmpty", () => {
  it("returns true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it("returns false for a non-empty string", () => {
    expect(isEmpty("hello")).toBe(false);
  });

  it("returns false for an empty string (not null/undefined)", () => {
    expect(isEmpty("")).toBe(false);
  });

  it("returns false for the number zero", () => {
    expect(isEmpty(0)).toBe(false);
  });

  it("returns false for the boolean false", () => {
    expect(isEmpty(false)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isEmpty({})).toBe(false);
  });

  it("returns true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("returns true for an array of only null/undefined items", () => {
    expect(isEmpty([null, undefined, null])).toBe(true);
  });

  it("returns false for an array containing at least one non-nullish item", () => {
    expect(isEmpty([null, 1, undefined])).toBe(false);
  });

  it("returns false for an array of empty strings (empty strings are not nullish)", () => {
    expect(isEmpty(["", ""])).toBe(false);
  });
});
