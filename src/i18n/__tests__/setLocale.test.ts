import { beforeEach, describe, expect, it } from "@jest/globals";
import { cookies } from "next/headers";

import { setLocale } from "../setLocale";

import type { TLocale } from "../config";

jest.mock("next/headers", () => ({ cookies: jest.fn() }));

const set = jest.fn();
const mockedCookies = cookies as jest.MockedFunction<typeof cookies>;

describe("setLocale", () => {
  beforeEach(() => {
    set.mockClear();
    mockedCookies.mockReset();
    mockedCookies.mockResolvedValue({ set } as never);
  });

  it("sets the NEXT_LOCALE cookie for a valid locale", async () => {
    await setLocale("cz");
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(
      "NEXT_LOCALE",
      "cz",
      expect.objectContaining({ path: "/", sameSite: "lax" })
    );
  });

  it("sets a one-year max age", async () => {
    await setLocale("en");
    const options = set.mock.calls[0][2] as { maxAge: number };

    expect(options.maxAge).toBe(60 * 60 * 24 * 365);
  });

  it("does nothing for an invalid locale", async () => {
    await setLocale("de" as TLocale);
    expect(set).not.toHaveBeenCalled();
  });
});
