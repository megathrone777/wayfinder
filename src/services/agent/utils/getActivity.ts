import type { ChatStatus } from "ai";

type ToolPartState = Extract<TAgentUIMessage["parts"][number], { state: string }>["state"];

const isBookTripPart = (part: TAgentPart): part is Extract<TAgentPart, { type: "tool-bookTrip" }> =>
  part.type === "tool-bookTrip";

const isRunning = (state: ToolPartState): boolean =>
  state === "input-streaming" || state === "input-available";

const isSearchPart = (
  part: TAgentPart
): part is Extract<TAgentPart, { type: "tool-searchFlights" | "tool-searchHotels" }> =>
  part.type === "tool-searchFlights" || part.type === "tool-searchHotels";

const isRunningSearchPart = (
  part: TAgentPart
): part is Extract<TAgentPart, { type: "tool-searchFlights" | "tool-searchHotels" }> =>
  isSearchPart(part) && isRunning(part.state);

const getActivity = (messages: TAgentUIMessage[], status: ChatStatus): TAgentActivity => {
  const busy = status === "submitted" || status === "streaming";
  const assistant = [...messages].reverse().find(({ role }) => role === "assistant");
  const parts = assistant?.parts ?? [];
  const book = [...parts].reverse().find(isBookTripPart);

  if (book) {
    const { state } = book;

    if (state === "approval-requested") return busy ? "booking" : "waiting";
    if (state === "output-denied") return "trip-rejected";

    if (state === "output-available") {
      if (book.output.confirmed) return busy ? "booking" : "trip-confirmed";
      if (!busy) return "trip-rejected";
    }
  }

  if (busy) {
    const running = [...parts].reverse().find(isRunningSearchPart);

    if (running?.type === "tool-searchFlights") return "searching-flights";
    if (running?.type === "tool-searchHotels") return "searching-stays";

    return "building-itinerary";
  }

  // A search awaiting the traveler's approval (ask-always) is a pending prompt.
  const awaitingApproval = parts.some(
    (part) => "state" in part && part.state === "approval-requested"
  );

  if (awaitingApproval) return "waiting";

  return "idle";
};

export { getActivity };
