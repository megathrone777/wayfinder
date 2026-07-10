import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("ai", () => ({ tool: (config: unknown): unknown => config }));

import { searchHotels } from "../searchHotels";

const makeHotel = (id: string): THotel => ({
  amenities: ["wifi"],
  breakfastIncluded: true,
  city: "placeholder",
  currency: "USD",
  distanceKm: 1,
  id,
  name: `Hotel ${id}`,
  nightlyUsd: 120,
  rating: 4.5,
  refundable: true,
  reviews: 200,
  tags: ["central"],
  thumbnailUrl: "/img.jpg",
  type: "hotel",
  walkMinutes: 5,
});

const run = (input: { city: string }): Promise<THotel[]> =>
  (searchHotels.execute as unknown as (i: typeof input, o: unknown) => Promise<THotel[]>)(
    input,
    {}
  );

describe("searchHotels tool", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.PUBLIC_URL = "https://wayfinder.test";
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("stamps every hotel with the requested city", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([makeHotel("a"), makeHotel("b")]),
    }) as unknown as typeof fetch;

    const result = await run({ city: "Rome" });

    expect(result).toHaveLength(2);
    result.forEach((hotel) => expect(hotel.city).toBe("Rome"));
  });

  it("fetches hotels from the public mock endpoint", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    global.fetch = fetchMock as unknown as typeof fetch;
    await run({ city: "Rome" });
    expect(fetchMock).toHaveBeenCalledWith("https://wayfinder.test/mock/hotels.json");
  });

  it("returns an empty array when the endpoint has no hotels", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    }) as unknown as typeof fetch;

    await expect(run({ city: "Rome" })).resolves.toEqual([]);
  });
});
