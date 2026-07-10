import { describe, expect, it } from "@jest/globals";

import { generateTemplate } from "../generateTemplate";

const booking: TBooking = {
  bookedAt: "2026-07-10T12:00:00.000Z",
  clientEmail: "traveler@example.com",
  confirmed: true,
  currency: "USD",
  itinerarySummary: "Three days in Rome",
  totalPrice: 1499,
};

const company: TCompany = {
  email: "hello@wayfinder.test",
  phone: "+420 777 888 999",
  webAddress: "https://wayfinder.test",
};

describe("generateTemplate", () => {
  it("compiles the pug template to an HTML string", async () => {
    const html = await generateTemplate({ booking, company });

    expect(typeof html).toBe("string");
    expect(html).toContain("<");
  });

  it("includes the total price and currency in the output", async () => {
    const html = await generateTemplate({ booking, company });

    expect(html).toContain("1499");
    expect(html).toContain("USD");
  });

  it("includes company contact details", async () => {
    const html = await generateTemplate({ booking, company });

    expect(html).toContain("hello@wayfinder.test");
  });
});
