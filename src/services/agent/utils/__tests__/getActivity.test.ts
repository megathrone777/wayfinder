import { describe, expect, it } from "@jest/globals";

import { getActivity } from "../getActivity";

import { assistant, bookingPart, flightsPart, hotelsPart, userText } from "./fixtures";

import type { ChatStatus } from "ai";

const readyStatus: ChatStatus = "ready";
const streamingStatus: ChatStatus = "streaming";

describe("getActivity", () => {
  it("is idle with no messages", () => {
    expect(getActivity([], readyStatus)).toBe("idle");
  });

  describe("while busy", () => {
    it("reports searching-flights when a flight search is running", () => {
      const messages = [assistant([flightsPart("input-available")])];

      expect(getActivity(messages, streamingStatus)).toBe("searching-flights");
    });

    it("reports searching-stays when a hotel search is running", () => {
      const messages = [assistant([hotelsPart("input-streaming")])];

      expect(getActivity(messages, streamingStatus)).toBe("searching-stays");
    });

    it("falls back to building-itinerary when nothing is actively searching", () => {
      const messages = [assistant([{ text: "planning", type: "text" }])];

      expect(getActivity(messages, streamingStatus)).toBe("building-itinerary");
    });
  });

  describe("booking states", () => {
    it("reports waiting when a booking approval is requested and idle", () => {
      const messages = [assistant([bookingPart("approval-requested")])];

      expect(getActivity(messages, readyStatus)).toBe("waiting");
    });

    it("reports booking when a booking approval is requested while busy", () => {
      const messages = [assistant([bookingPart("approval-requested")])];

      expect(getActivity(messages, streamingStatus)).toBe("booking");
    });

    it("reports trip-rejected when the booking was denied", () => {
      const messages = [assistant([bookingPart("output-denied")])];

      expect(getActivity(messages, readyStatus)).toBe("trip-rejected");
    });

    it("reports trip-confirmed when the booking output is confirmed and idle", () => {
      const messages = [
        assistant([bookingPart("output-available", { output: { confirmed: true } })]),
      ];

      expect(getActivity(messages, readyStatus)).toBe("trip-confirmed");
    });

    it("reports booking when a confirmed booking is still streaming", () => {
      const messages = [
        assistant([bookingPart("output-available", { output: { confirmed: true } })]),
      ];

      expect(getActivity(messages, streamingStatus)).toBe("booking");
    });

    it("reports trip-rejected when an unconfirmed booking output settles idle", () => {
      const messages = [
        assistant([bookingPart("output-available", { output: { confirmed: false } })]),
      ];

      expect(getActivity(messages, readyStatus)).toBe("trip-rejected");
    });
  });

  it("reports waiting for a search awaiting approval", () => {
    const messages = [assistant([flightsPart("approval-requested")])];

    expect(getActivity(messages, readyStatus)).toBe("waiting");
  });

  it("only inspects the latest assistant message", () => {
    const messages = [
      assistant([flightsPart("output-available", { output: [] })]),
      userText("book it"),
      assistant([bookingPart("output-available", { output: { confirmed: true } })]),
    ];

    expect(getActivity(messages, readyStatus)).toBe("trip-confirmed");
  });
});
