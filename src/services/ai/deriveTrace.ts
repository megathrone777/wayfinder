import type { ChatStatus } from "ai";

type TAgentPart = TAgentUIMessage["parts"][number];
type ToolPart = Extract<TAgentPart, { state: string }>;
type ToolType = ToolPart["type"];

const isTextPart = (part: TAgentPart): part is Extract<TAgentPart, { type: "text" }> =>
  part.type === "text";

const findToolPart = <T extends ToolType>(
  parts: TAgentPart[],
  type: T
): Extract<ToolPart, { type: T }> | undefined =>
  [...parts].reverse().find((part): part is Extract<ToolPart, { type: T }> => part.type === type);

const toStatus = (part: ToolPart | undefined): TraceStatus => {
  if (!part) return "queued";

  switch (part.state) {
    case "output-available":
      return "done";
    case "output-error":
      return "error";
    default:
      return "active";
  }
};

const deriveTrace = (messages: TAgentUIMessage[], status: ChatStatus): TraceStep[] => {
  const busy = status === "submitted" || status === "streaming";
  const firstUserText = messages.find(({ role }) => role === "user")?.parts.find(isTextPart)?.text;

  // Auto-resubmit (sendAutomaticallyWhen) splits one logical turn across several
  // assistant messages, so gather tool parts from all of them, not just the last.
  const parts = messages
    .filter(({ role }) => role === "assistant")
    .flatMap(({ parts: messageParts }) => messageParts);

  const flights = findToolPart(parts, "tool-searchFlights");
  const hotels = findToolPart(parts, "tool-searchHotels");
  const book = findToolPart(parts, "tool-bookTrip");

  const flightsStatus = toStatus(flights);
  const hotelsStatus = toStatus(hotels);

  // The itinerary is being assembled once both searches are done and before a
  // booking is proposed; it is finished as soon as a booking step appears.
  const searchesDone = flightsStatus === "done" && hotelsStatus === "done";

  let itineraryStatus: TraceStatus = "queued";

  if (book) itineraryStatus = "done";
  else if (searchesDone) itineraryStatus = busy ? "active" : "done";

  // Human-in-the-loop: an input-available booking is awaiting the user.
  let confirmStatus: TraceStatus = "queued";

  if (book?.state === "input-available") confirmStatus = "waiting";
  else if (book?.state === "output-available")
    confirmStatus = book.output.confirmed ? "done" : "error";
  else if (book) confirmStatus = "active";

  const confirmed = book?.state === "output-available" && book.output.confirmed;

  let finalizeStatus: TraceStatus = "queued";

  if (confirmed) finalizeStatus = busy ? "active" : "done";

  return [
    {
      detail: firstUserText,
      id: "parse-intent",
      status: firstUserText ? "done" : "queued",
      title: "Parse intent",
    },
    {
      detail: flights?.input && `${flights.input.cityFrom} \u21C4 ${flights.input.cityTo}`,
      id: "search-flights",
      status: flightsStatus,
      title: "Search flights",
    },
    {
      detail: hotels?.input?.city,
      id: "search-stays",
      status: hotelsStatus,
      title: "Search stays",
    },
    {
      detail: searchesDone ? "Balancing pace + travel time" : undefined,
      id: "assemble-itinerary",
      status: itineraryStatus,
      title: "Assemble itinerary",
    },
    {
      approval:
        book?.state === "input-available"
          ? {
              itinerarySummary: book.input.itinerarySummary,
              toolCallId: book.toolCallId,
              totalPrice: book.input.totalPrice,
            }
          : undefined,
      detail: book?.input && `Booking for $${book.input.totalPrice}`,
      id: "confirm",
      status: confirmStatus,
      title: "Confirm with traveler",
    },
    {
      detail: confirmed ? "Fares locked, room reserved" : "Lock fares, reserve room",
      id: "finalize",
      status: finalizeStatus,
      title: "Finalize & book",
    },
  ];
};

export { deriveTrace };
