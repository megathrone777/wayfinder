import { describe, expect, it } from "@jest/globals";

import { getSteps } from "../getSteps";

import {
  assistant,
  bookingPart,
  flightsPart,
  hotelsPart,
  itineraryPart,
  userText,
} from "./fixtures";

import type { ChatStatus } from "ai";
import type { useTranslations } from "next-intl";

type Translate = ReturnType<typeof useTranslations<"Steps">>;

const t = ((key: string, values?: Record<string, unknown>): string =>
  values ? `${key}:${JSON.stringify(values)}` : key) as unknown as Translate;

const READY: ChatStatus = "ready";
const STREAMING: ChatStatus = "streaming";

const byId = (steps: ReturnType<typeof getSteps>, id: string): (typeof steps)[number] =>
  steps.find(({ id: stepId }) => stepId === id)!;

describe("getSteps", () => {
  it("returns the six trace steps in order", () => {
    const steps = getSteps([], READY, t);

    expect(steps.map((step) => step.id)).toEqual([
      "parse-intent",
      "search-flights",
      "search-stays",
      "assemble-itinerary",
      "confirm",
      "finalize",
    ]);
  });

  it("marks every step queued for an empty conversation", () => {
    const steps = getSteps([], READY, t);

    steps.forEach((step) => expect(step.status).toBe("queued"));
  });

  it("marks parse-intent done and records the first user text", () => {
    const steps = getSteps([userText("weekend in Rome")], READY, t);
    const parse = byId(steps, "parse-intent");

    expect(parse.status).toBe("done");
    expect(parse.detail).toBe("weekend in Rome");
  });

  it("reflects flight search state and route detail", () => {
    const messages = [userText("go"), assistant([flightsPart("output-available", { output: [] })])];
    const flights = byId(getSteps(messages, READY, t), "search-flights");

    expect(flights.status).toBe("done");
    expect(flights.detail).toBe("Prague ⇄ Rome");
  });

  it("marks a searching step active while its input streams", () => {
    const messages = [assistant([hotelsPart("input-streaming")])];
    const hotels = byId(getSteps(messages, STREAMING, t), "search-stays");

    expect(hotels.status).toBe("active");
    expect(hotels.detail).toBe("Rome");
  });

  it("marks itinerary done once both searches complete and idle", () => {
    const messages = [
      assistant([
        flightsPart("output-available", { output: [] }),
        hotelsPart("output-available", { output: [] }),
      ]),
    ];
    const itinerary = byId(getSteps(messages, READY, t), "assemble-itinerary");

    expect(itinerary.status).toBe("done");
  });

  it("marks itinerary active while running after searches complete", () => {
    const messages = [
      assistant([
        flightsPart("output-available", { output: [] }),
        hotelsPart("output-available", { output: [] }),
      ]),
    ];
    const itinerary = byId(getSteps(messages, STREAMING, t), "assemble-itinerary");

    expect(itinerary.status).toBe("active");
  });

  it("uses the itinerary part's own status when present", () => {
    const messages = [assistant([itineraryPart("output-available", { output: [] })])];
    const itinerary = byId(getSteps(messages, READY, t), "assemble-itinerary");

    expect(itinerary.status).toBe("done");
  });

  it("surfaces a pending booking approval on the confirm step", () => {
    const messages = [assistant([bookingPart("approval-requested", { approval: { id: "ap-1" } })])];
    const confirm = byId(getSteps(messages, READY, t), "confirm");

    expect(confirm.status).toBe("waiting");
    expect(confirm.approval).toEqual({ approvalId: "ap-1", totalPrice: 1200 });
  });

  it("marks confirm as error when the booking is denied", () => {
    const messages = [assistant([bookingPart("output-denied")])];
    const confirm = byId(getSteps(messages, READY, t), "confirm");

    expect(confirm.status).toBe("error");
  });

  it("marks confirm and finalize done for a confirmed booking when idle", () => {
    const messages = [
      assistant([bookingPart("output-available", { output: { confirmed: true } })]),
    ];
    const steps = getSteps(messages, READY, t);

    expect(byId(steps, "confirm").status).toBe("done");
    expect(byId(steps, "finalize").status).toBe("done");
  });

  it("marks confirm as error for an unconfirmed booking output", () => {
    const messages = [
      assistant([bookingPart("output-available", { output: { confirmed: false } })]),
    ];

    expect(byId(getSteps(messages, READY, t), "confirm").status).toBe("error");
  });

  it("formats the confirm detail with the booking price", () => {
    const messages = [assistant([bookingPart("approval-requested", { approval: { id: "x" } })])];
    const confirm = byId(getSteps(messages, READY, t), "confirm");

    expect(confirm.detail).toBe("detail.confirm:{\"price\":1200}");
  });
});
