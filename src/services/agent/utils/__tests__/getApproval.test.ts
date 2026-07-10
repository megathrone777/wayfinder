import { describe, expect, it } from "@jest/globals";

import { getApproval } from "../getApproval";

describe("getApproval", () => {
  it("requires no approvals in auto mode", () => {
    expect(getApproval("auto")).toEqual({});
  });

  it("requires approval only for bookTrip in ask-before-booking mode", () => {
    expect(getApproval("ask-before-booking")).toEqual({
      bookTrip: "user-approval",
    });
  });

  it("requires approval for every tool in ask-always mode", () => {
    expect(getApproval("ask-always")).toEqual({
      bookTrip: "user-approval",
      searchFlights: "user-approval",
      searchHotels: "user-approval",
    });
  });
});
