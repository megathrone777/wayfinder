import { describe, expect, it } from "@jest/globals";

import { bbox } from "../bbox";

describe("bbox", () => {
  it("returns [[minLng, minLat], [maxLng, maxLat]] for a set of coordinates", () => {
    const coordinates: [number, number][] = [
      [10, 50],
      [20, 40],
      [15, 60],
    ];

    expect(bbox(coordinates)).toEqual([
      [10, 40],
      [20, 60],
    ]);
  });

  it("handles a single coordinate (min equals max)", () => {
    expect(bbox([[5, 7]])).toEqual([
      [5, 7],
      [5, 7],
    ]);
  });

  it("handles negative coordinates", () => {
    const coordinates: [number, number][] = [
      [-10, -50],
      [-20, -40],
    ];

    expect(bbox(coordinates)).toEqual([
      [-20, -50],
      [-10, -40],
    ]);
  });

  it("spans across the prime meridian and equator", () => {
    const coordinates: [number, number][] = [
      [-5, -5],
      [5, 5],
    ];

    expect(bbox(coordinates)).toEqual([
      [-5, -5],
      [5, 5],
    ]);
  });

  it("returns Infinity bounds for an empty coordinate list", () => {
    expect(bbox([])).toEqual([
      [Infinity, Infinity],
      [-Infinity, -Infinity],
    ]);
  });
});
