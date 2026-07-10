import { beforeEach, describe, expect, it } from "@jest/globals";
import { createTransport } from "nodemailer";

import { sendEmail } from "../sendEmail";

jest.mock("nodemailer", () => ({ createTransport: jest.fn() }));
jest.mock("../generateTemplate", () => ({
  generateTemplate: jest.fn(() => Promise.resolve("<html>booking</html>")),
}));

const sendMail = jest.fn();
const mockedCreateTransport = createTransport as jest.MockedFunction<typeof createTransport>;

const booking = (overrides: Partial<TBooking> = {}): TBooking => ({
  bookedAt: "2026-07-10T12:00:00.000Z",
  clientEmail: "traveler@example.com",
  confirmed: true,
  itinerarySummary: "Rome trip",
  totalPrice: 1200,
  ...overrides,
});

describe("sendEmail", () => {
  beforeEach(() => {
    sendMail.mockReset();
    mockedCreateTransport.mockReset();
    mockedCreateTransport.mockReturnValue({ sendMail } as never);
  });

  it("returns false without sending when there is no client email", async () => {
    const result = await sendEmail(booking({ clientEmail: undefined }));

    expect(result).toBe(false);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns true when exactly one recipient accepts", async () => {
    sendMail.mockResolvedValue({ accepted: ["traveler@example.com"] });

    const result = await sendEmail(booking());

    expect(result).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("sends the message to the booking's client email", async () => {
    sendMail.mockResolvedValue({ accepted: ["someone@else.com"] });

    await sendEmail(booking({ clientEmail: "someone@else.com" }));

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ html: "<html>booking</html>", to: "someone@else.com" })
    );
  });

  it("returns false when no recipient accepts", async () => {
    sendMail.mockResolvedValue({ accepted: [] });

    await expect(sendEmail(booking())).resolves.toBe(false);
  });

  it("returns false and swallows the error when sending throws", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    sendMail.mockRejectedValue(new Error("smtp down"));

    await expect(sendEmail(booking())).resolves.toBe(false);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
