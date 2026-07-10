import { describe, expect, it } from "@jest/globals";

import { slugify } from "../slugify";

describe("slugify", () => {
  it("lowercases the text", () => {
    expect(slugify("HELLO")).toBe("hello");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
  });

  it("collapses multiple spaces into a single hyphen", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  it("collapses multiple hyphens into a single hyphen", () => {
    expect(slugify("hello---world")).toBe("hello-world");
  });

  it("strips diacritics from accented characters", () => {
    expect(slugify("Café Crème")).toBe("cafe-creme");
  });

  it("removes characters that are not alphanumeric, space or hyphen", () => {
    expect(slugify("hello, world!")).toBe("hello-world");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("  spaced out  ")).toBe("spaced-out");
  });

  it("returns an empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });

  it("preserves numbers", () => {
    expect(slugify("Route 66")).toBe("route-66");
  });

  it("strips non-latin characters entirely", () => {
    expect(slugify("Привет")).toBe("");
  });
});
