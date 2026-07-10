import { describe, expect, it } from "@jest/globals";

import { rgba } from "../rgba";

describe("rgba", () => {
  it("converts a 6-digit hex color to rgba", () => {
    expect(rgba("#ff8800", 0.5)).toBe("rgba(255, 136, 0, 0.5)");
  });

  it("expands a 3-digit shorthand hex color", () => {
    expect(rgba("#f80", 1)).toBe("rgba(255, 136, 0, 1)");
  });

  it("handles black and white", () => {
    expect(rgba("#000000", 1)).toBe("rgba(0, 0, 0, 1)");
    expect(rgba("#ffffff", 0)).toBe("rgba(255, 255, 255, 0)");
  });

  it("wraps CSS custom properties in color-mix", () => {
    expect(rgba("var(--brand)", 0.25)).toBe("color-mix(in srgb, var(--brand) 25%, transparent)");
  });

  it("computes the mix percentage from the alpha", () => {
    expect(rgba("var(--brand)", 1)).toBe("color-mix(in srgb, var(--brand) 100%, transparent)");
  });

  it("passes through comma-separated rgb channel values", () => {
    expect(rgba("12, 34, 56", 0.8)).toBe("rgba(12, 34, 56, 0.8)");
  });
});
