import { describe, expect, it } from "@jest/globals";

import { splitText } from "../splitText";

describe("splitText", () => {
  it("returns the whole text as a single element when parts is 1", () => {
    expect(splitText("hello world", 1)).toEqual(["hello world"]);
  });

  it("returns the whole text as a single element when parts is 0 or negative", () => {
    expect(splitText("hello world", 0)).toEqual(["hello world"]);
    expect(splitText("hello world", -3)).toEqual(["hello world"]);
  });

  it("defaults to two parts", () => {
    expect(splitText("a b c d")).toEqual(["a b", "c d"]);
  });

  it("splits at the nearest space to the midpoint", () => {
    expect(splitText("one two three four", 2)).toEqual(["one two", "three four"]);
  });

  it("does not split text without any spaces", () => {
    expect(splitText("nospaceshere", 2)).toEqual(["nospaceshere"]);
  });

  it("joins back to the original text minus the split spaces", () => {
    const text = "the quick brown fox jumps over the lazy dog";
    const parts = splitText(text, 3);

    expect(parts.join(" ")).toBe(text);
  });

  it("produces the requested number of parts when enough spaces exist", () => {
    const parts = splitText("alpha beta gamma delta epsilon zeta", 3);

    expect(parts).toHaveLength(3);
  });

  it("never returns empty leading fragments for a normal sentence", () => {
    const parts = splitText("travel the world with wayfinder today", 2);

    parts.forEach((part) => expect(part.length).toBeGreaterThan(0));
  });
});
