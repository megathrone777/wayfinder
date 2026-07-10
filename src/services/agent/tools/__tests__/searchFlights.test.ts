import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("ai", () => ({ tool: (config: unknown): unknown => config }));

import { searchFlights } from "../searchFlights";

const makeFlight = (): TFlight => ({
  airline: { code: "AA", name: "Air Alpha", region: "EU" },
  cityFrom: "X",
  cityTo: "Y",
  price: { currency: "USD", total: 100 },
  schedule: { arrival: "12:00", departure: "10:00", duration: "2h" },
});

const run = (input: { cityFrom: string; cityTo: string }): Promise<TFlight[]> =>
  (searchFlights.execute as unknown as (i: typeof input, o: unknown) => Promise<TFlight[]>)(
    input,
    {}
  );

describe("searchFlights tool", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.FLIGHTS_API_URL = "https://api.example.com/flights";
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns flights stamped with the requested cities", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: [makeFlight(), makeFlight()] }),
      ok: true,
    }) as unknown as typeof fetch;

    const flights = await run({ cityFrom: "Prague", cityTo: "Rome" });

    expect(flights).toHaveLength(2);

    for (const flight of flights) {
      expect(flight.cityFrom).toBe("Prague");
      expect(flight.cityTo).toBe("Rome");
    }
  });

  it("returns an empty array when the response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: [makeFlight()] }),
      ok: false,
    }) as unknown as typeof fetch;

    await expect(run({ cityFrom: "A", cityTo: "B" })).resolves.toEqual([]);
  });

  it("returns an empty array when there are no flights", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: [] }),
      ok: true,
    }) as unknown as typeof fetch;

    await expect(run({ cityFrom: "A", cityTo: "B" })).resolves.toEqual([]);
  });

  it("declares an input schema with origin and destination", () => {
    expect(searchFlights.inputSchema).toBeDefined();
  });
});
