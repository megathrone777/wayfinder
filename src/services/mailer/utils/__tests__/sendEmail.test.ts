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

const setEnv = (updates: Record<string, string | undefined>): void => {
  const env = process.env as unknown as Record<string, string | undefined>;

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      delete env[key];
    } else {
      env[key] = value;
    }
  }
};

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

  afterEach(() => {
    setEnv({
      EMAIL_ADDRESS: undefined,
      EMAIL_APP_PASSWORD: undefined,
      EMAIL_SMTP_HOST: undefined,
      EMAIL_SMTP_PORT: undefined,
      NODE_ENV: "test",
    });
  });

  it("connects to a local SMTP without auth in development", async () => {
    setEnv({ EMAIL_SMTP_HOST: "localhost", EMAIL_SMTP_PORT: "1025" });

    sendMail.mockResolvedValue({ accepted: ["traveler@example.com"] });

    await expect(sendEmail(booking())).resolves.toBe(true);

    expect(mockedCreateTransport).toHaveBeenCalledWith({
      auth: undefined,
      host: "localhost",
      port: 1025,
      secure: false,
    });
  });

  it("uses smtp.gmail.com:465 with auth in production by default", async () => {
    setEnv({
      EMAIL_ADDRESS: "sender@gmail.com",
      EMAIL_APP_PASSWORD: "aaaa bbbb cccc dddd",
      NODE_ENV: "production",
    });

    sendMail.mockResolvedValue({ accepted: ["traveler@example.com"] });

    await sendEmail(booking());

    expect(mockedCreateTransport).toHaveBeenCalledWith({
      auth: { pass: "aaaa bbbb cccc dddd", user: "sender@gmail.com" },
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });
  });

  it("honors EMAIL_SMTP_HOST and EMAIL_SMTP_PORT in production", async () => {
    setEnv({
      EMAIL_ADDRESS: "sender@gmail.com",
      EMAIL_APP_PASSWORD: "aaaa bbbb cccc dddd",
      EMAIL_SMTP_HOST: "smtp.resend.com",
      EMAIL_SMTP_PORT: "587",
      NODE_ENV: "production",
    });

    sendMail.mockResolvedValue({ accepted: ["traveler@example.com"] });

    await sendEmail(booking());

    expect(mockedCreateTransport).toHaveBeenCalledWith({
      auth: { pass: "aaaa bbbb cccc dddd", user: "sender@gmail.com" },
      host: "smtp.resend.com",
      port: 587,
      secure: false,
    });
  });

  it("returns false in production when credentials are missing", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    setEnv({ EMAIL_ADDRESS: undefined, EMAIL_APP_PASSWORD: undefined, NODE_ENV: "production" });

    await expect(sendEmail(booking())).resolves.toBe(false);

    expect(mockedCreateTransport).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("EMAIL_APP_PASSWORD"));

    spy.mockRestore();
  });

  it("logs an actionable hint when the SMTP server rejects credentials with 535", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    setEnv({
      EMAIL_ADDRESS: "sender@gmail.com",
      EMAIL_APP_PASSWORD: "aaaa bbbb cccc dddd",
      NODE_ENV: "production",
    });

    sendMail.mockRejectedValue({ responseCode: 535 });

    await expect(sendEmail(booking())).resolves.toBe(false);

    expect(spy.mock.calls[0]?.[2]).toEqual(
      expect.objectContaining({ hint: expect.stringContaining("app password"), responseCode: 535 })
    );

    spy.mockRestore();
  });
});
