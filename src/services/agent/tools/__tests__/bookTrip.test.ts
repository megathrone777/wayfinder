import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

jest.mock("ai", () => ({ tool: (config: unknown): unknown => config }));

import { bookTrip } from "../bookTrip";

const run = (input: { itinerarySummary: string; totalPrice: number }): TBooking =>
  (bookTrip.execute as unknown as (i: typeof input, o: unknown) => TBooking)(input, {});

describe("bookTrip tool", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-07-10T12:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns a confirmed booking", () => {
    const booking = run({ itinerarySummary: "Rome, 3 days", totalPrice: 1500 });

    expect(booking.confirmed).toBe(true);
  });

  it("echoes the summary and total price", () => {
    const booking = run({ itinerarySummary: "Rome, 3 days", totalPrice: 1500 });

    expect(booking.itinerarySummary).toBe("Rome, 3 days");
    expect(booking.totalPrice).toBe(1500);
  });

  it("stamps the booking with the current time as an ISO string", () => {
    const booking = run({ itinerarySummary: "Rome", totalPrice: 1 });

    expect(booking.bookedAt).toBe("2026-07-10T12:00:00.000Z");
  });
});
