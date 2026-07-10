import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("ai", () => ({ tool: (config: unknown): unknown => config }));

import { assembleItinerary } from "../assembleItinerary";

const pool = [
  { id: "1", stops: ["a"], title: "Day A" },
  { id: "2", stops: ["b"], title: "Day B" },
  { id: "3", stops: ["c"], title: "Day C" },
];

const run = (input: { city: string; days: number }): Promise<TItineraryDay[]> =>
  (
    assembleItinerary.execute as unknown as (
      i: typeof input,
      o: unknown
    ) => Promise<TItineraryDay[]>
  )(input, {});

describe("assembleItinerary tool", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.PUBLIC_URL = "https://wayfinder.test";

    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(pool),
    }) as unknown as typeof fetch;

    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("returns one day per requested day", async () => {
    const result = await run({ city: "Rome", days: 2 });

    expect(result).toHaveLength(2);
  });

  it("numbers the days sequentially starting from 1", async () => {
    const result = await run({ city: "Rome", days: 3 });

    expect(result.map((day) => day.day)).toEqual([1, 2, 3]);
  });

  it("clamps the day count to the pool size", async () => {
    const result = await run({ city: "Rome", days: 99 });

    expect(result).toHaveLength(pool.length);
  });

  it("returns at least one day when zero or negative days are requested", async () => {
    const result = await run({ city: "Rome", days: 0 });

    expect(result).toHaveLength(1);
  });

  it("carries stops and titles from the pool", async () => {
    const result = await run({ city: "Rome", days: 3 });

    result.forEach((day: TItineraryDay) => {
      expect(Array.isArray(day.stops)).toBe(true);
      expect(typeof day.title).toBe("string");
    });
  });
});
