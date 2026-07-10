import { describe, expect, it } from "@jest/globals";

import { getResultsCount } from "../getResultsCount";

import { assistant, flightsPart, hotelsPart, itineraryPart } from "./fixtures";

const withOutput = (part: Record<string, unknown>, output: unknown[]): Record<string, unknown> => ({
  ...part,
  output,
});

describe("getResultsCount", () => {
  it("returns 0 when there are no results", () => {
    expect(getResultsCount([], "idle")).toBe(0);
  });

  it("counts a single populated section", () => {
    const messages = [
      assistant([withOutput(flightsPart("output-available"), [{ price: { total: 1 } }])]),
    ];

    expect(getResultsCount(messages, "idle")).toBe(1);
  });

  it("does not count sections whose output is empty", () => {
    const messages = [assistant([withOutput(flightsPart("output-available"), [])])];

    expect(getResultsCount(messages, "idle")).toBe(0);
  });

  it("counts flights, hotels and itinerary independently", () => {
    const messages = [
      assistant([
        withOutput(flightsPart("output-available"), [{ id: "f" }]),
        withOutput(hotelsPart("output-available"), [{ id: "h" }]),
        withOutput(itineraryPart("output-available"), [{ day: 1 }]),
      ]),
    ];

    expect(getResultsCount(messages, "idle")).toBe(3);
  });

  it("adds two extra sections when the trip is confirmed", () => {
    const messages = [
      assistant([withOutput(flightsPart("output-available"), [{ id: "f" }])]),
    ];

    expect(getResultsCount(messages, "trip-confirmed")).toBe(3);
  });

  it("adds the two confirmation sections even with no search results", () => {
    expect(getResultsCount([], "trip-confirmed")).toBe(2);
  });
});
