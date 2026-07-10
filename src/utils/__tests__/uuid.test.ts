import { describe, expect, it } from "@jest/globals";

import { uuid } from "../uuid";

describe("uuid", () => {
  it("returns a non-empty string", () => {
    const id = uuid();

    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("returns a different value on each call", () => {
    const ids = new Set(Array.from({ length: 1000 }, () => uuid()));

    expect(ids.size).toBe(1000);
  });

  it("contains only base-36 characters", () => {
    expect(uuid()).toMatch(/^[0-9a-z]+$/);
  });
});
