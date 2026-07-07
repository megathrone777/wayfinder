import { tools } from "./tools";

import type { ToolSet } from "ai";

const combineTools = (autonomyMode: TAgentAutonomyMode): ToolSet => {
  if (autonomyMode === "auto") {
    return {
      ...tools,
      bookTrip: {
        ...tools.bookTrip,

        execute: ({
          itinerarySummary,
          totalPrice,
        }: Pick<TBooking, "itinerarySummary" | "totalPrice">): TBooking => ({
          bookedAt: new Date().toISOString(),
          confirmed: true,
          itinerarySummary,
          totalPrice,
        }),
      },
    };
  }

  return tools;
};

export { combineTools };
