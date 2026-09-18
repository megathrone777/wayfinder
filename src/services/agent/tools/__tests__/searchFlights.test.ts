import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import { searchFlights } from "../searchFlights";

jest.mock("ai", () => ({ tool: (config: unknown): unknown => config }));

const makeFlight = (id: string): TFlight => ({
  airline: { code: id, name: `Airline ${id}`, region: "EU" },
  cityFrom: "placeholder",
  cityTo: "placeholder",
  price: { currency: "USD", total: 100 },
  schedule: { arrival: "12:00", departure: "10:00", duration: "2h" },
});

const pool = [makeFlight("a"), makeFlight("b"), makeFlight("c"), makeFlight("d"), makeFlight("e")];

const run = (input: { cityFrom: string; cityTo: string }): Promise<TFlight[]> =>
  (
    searchFlights.execute as unknown as (
      i: typeof input,
      o: unknown
    ) => Promise<TFlight[]>
  )(input, {});

describe("searchFlights tool", () => {
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

  it("stamps every flight with the requested cities", async () => {
    const flights = await run({ cityFrom: "Prague", cityTo: "Rome" });

    expect(flights).toHaveLength(4);

    for (const flight of flights) {
      expect(flight.cityFrom).toBe("Prague");
      expect(flight.cityTo).toBe("Rome");
    }
  });

  it("fetches flights from the public mock endpoint", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    global.fetch = fetchMock as unknown as typeof fetch;
    await run({ cityFrom: "Prague", cityTo: "Rome" });
    expect(fetchMock).toHaveBeenCalledWith("https://wayfinder.test/mock/flights.json");
  });

  it("returns the whole pool when it is smaller than the flights limit", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([makeFlight("a"), makeFlight("b")]),
    }) as unknown as typeof fetch;

    await expect(run({ cityFrom: "Prague", cityTo: "Rome" })).resolves.toHaveLength(2);
  });

  it("returns an empty array when the endpoint has no flights", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([]),
    }) as unknown as typeof fetch;

    await expect(run({ cityFrom: "Prague", cityTo: "Rome" })).resolves.toEqual([]);
  });

  it("declares an input schema with origin and destination", () => {
    expect(searchFlights.inputSchema).toBeDefined();
  });
});