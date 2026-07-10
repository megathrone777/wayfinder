import { describe, expect, it } from "@jest/globals";

import { lineClamp } from "../lineClamp";

describe("lineClamp", () => {
  it("returns the webkit multi-line clamp style object", () => {
    expect(lineClamp(3)).toEqual({
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
    });
  });

  it("passes the requested number of lines through", () => {
    expect((lineClamp(1) as { WebkitLineClamp: number }).WebkitLineClamp).toBe(1);
    expect((lineClamp(10) as { WebkitLineClamp: number }).WebkitLineClamp).toBe(10);
  });
});
