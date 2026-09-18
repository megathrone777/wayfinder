import { beforeEach, describe, expect, it } from "@jest/globals";
import { getLocale } from "next-intl/server";

import { agent } from "@/services";

import { POST } from "../route";

// the swc jest transform only hoists the *global* `jest` identifier, so every mock has to
// be a bare `jest.mock` call - importing `jest` as a value from "@jest/globals" would
// rewrite these calls to `_globals.jest.mock(...)` and cancel the hoisting, which would
// load the real ESM `next-intl/server` before the mock is registered
jest.mock("next-intl/server", () => ({ getLocale: jest.fn() }));

jest.mock("@/services", () => ({ agent: { streamMessages: jest.fn() } }));

// the global `jest` namespace from `@types/jest` provides the `Mock<T, Y, C>` type:
// T = return type, Y = argument tuple (v30 dropped the "single function generic" form);
// `unknown[]` keeps the matcher type instantiation shallow
const mockGetLocale = getLocale as unknown as jest.Mock<Promise<string>, unknown[]>;
const mockStreamMessages = agent.streamMessages as unknown as jest.Mock<
  Promise<Response>,
  unknown[]
>;

const request = (body: unknown): never =>
  ({ json: async (): Promise<unknown> => await Promise.resolve(body) }) as never;

const messages = [
  { id: "1", parts: [{ text: "Rome", type: "text" }], role: "user" },
] as unknown as TAgentUIMessage[];

const response = new Response("stream");

describe("POST /api/chat", () => {
  beforeEach((): void => {
    mockGetLocale.mockReset();
    mockStreamMessages.mockReset();
    mockStreamMessages.mockResolvedValue(response);
    mockGetLocale.mockResolvedValue("en");
  });

  it("streams the messages with the requested autonomy mode", async () => {
    const result = await POST(
      request({ autonomyMode: "ask-before-booking", messages }) as never
    );

    expect(result).toBe(response);
    expect(mockStreamMessages).toHaveBeenCalledWith(messages, "ask-before-booking", "en");
  });

  it("passes the resolved locale through to the agent", async () => {
    mockGetLocale.mockResolvedValue("ru");

    await POST(request({ autonomyMode: "auto", messages }) as never);

    expect(mockStreamMessages).toHaveBeenCalledWith(messages, "auto", "ru");
  });

  it("falls back to English for an unsupported locale", async () => {
    mockGetLocale.mockResolvedValue("de");

    await POST(request({ autonomyMode: "auto", messages }) as never);

    expect(mockStreamMessages).toHaveBeenCalledWith(messages, "auto", "en");
  });

  it("forwards an empty conversation without inventing content", async () => {
    await POST(request({ autonomyMode: "ask-always", messages: [] }) as never);

    expect(mockStreamMessages).toHaveBeenCalledWith([], "ask-always", "en");
  });
});
