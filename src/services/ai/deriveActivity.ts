import type { ChatStatus } from "ai";

type TAgentPart = TAgentUIMessage["parts"][number];
type TToolPartState = Extract<TAgentUIMessage["parts"][number], { state: string }>["state"];

export const activityLabel: Record<TAgentActivity, string> = {
  booking: "Booking...",
  "building-itinerary": "Building itinerary...",
  idle: "Idle",
  "searching-flights": "Searching flights...",
  "searching-stays": "Searching stays...",
  "trip-confirmed": "Trip confirmed",
  "trip-rejected": "Booking declined",
  waiting: "Waiting for you",
};

const isBookTripPart = (part: TAgentPart): part is Extract<TAgentPart, { type: "tool-bookTrip" }> =>
  part.type === "tool-bookTrip";

const isRunning = (state: TToolPartState): boolean =>
  state === "input-streaming" || state === "input-available";

const isSearchPart = (
  part: TAgentPart
): part is Extract<TAgentPart, { type: "tool-searchFlights" | "tool-searchHotels" }> =>
  part.type === "tool-searchFlights" || part.type === "tool-searchHotels";

const isRunningSearchPart = (
  part: TAgentPart
): part is Extract<TAgentPart, { type: "tool-searchFlights" | "tool-searchHotels" }> =>
  isSearchPart(part) && isRunning(part.state);

const deriveActivity = (messages: TAgentUIMessage[], status: ChatStatus): TAgentActivity => {
  const busy = status === "submitted" || status === "streaming";
  const assistant = [...messages].reverse().find(({ role }) => role === "assistant");
  const parts = assistant?.parts ?? [];
  const book = [...parts].reverse().find(isBookTripPart);

  if (book) {
    const { output, state } = book;

    if (state === "input-available") {
      return busy ? "booking" : "waiting";
    }

    if (state === "output-available") {
      if (output.confirmed) return busy ? "booking" : "trip-confirmed";
      if (!busy) return "trip-rejected";
    }
  }

  if (busy) {
    const running = [...parts].reverse().find(isRunningSearchPart);

    if (running?.type === "tool-searchFlights") return "searching-flights";
    if (running?.type === "tool-searchHotels") return "searching-stays";

    return "building-itinerary";
  }

  return "idle";
};

export { deriveActivity };
