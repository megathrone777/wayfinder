import { describe, expect, it } from "@jest/globals";

import { getOutput } from "../getOutput";

import { assistant, flightsPart, hotelsPart, userText } from "./fixtures";

describe("getOutput", () => {
  it("returns undefined when there are no messages", () => {
    expect(getOutput([], "tool-searchFlights")).toBeUndefined();
  });

  it("returns undefined when no assistant part matches the type", () => {
    const messages = [assistant([hotelsPart("output-available", { output: [{ id: "h1" }] })])];

    expect(getOutput(messages, "tool-searchFlights")).toBeUndefined();
  });

  it("ignores parts that are not output-available", () => {
    const messages = [assistant([flightsPart("input-available")])];

    expect(getOutput(messages, "tool-searchFlights")).toBeUndefined();
  });

  it("returns the matching output-available part", () => {
    const output = [{ price: { total: 100 } }];
    const messages = [assistant([flightsPart("output-available", { output })])];
    const result = getOutput(messages, "tool-searchFlights");

    expect(result?.output).toBe(output);
  });

  it("ignores parts from user messages", () => {
    const messages = [
      userText("plan a trip"),
      assistant([flightsPart("output-available", { output: [] })]),
    ];

    expect(getOutput(messages, "tool-searchFlights")).toBeDefined();
  });

  it("returns the most recent matching part when there are several", () => {
    const messages = [
      assistant([flightsPart("output-available", { output: ["old"] })]),
      assistant([flightsPart("output-available", { output: ["new"] })]),
    ];

    expect(getOutput(messages, "tool-searchFlights")?.output).toEqual(["new"]);
  });
});
