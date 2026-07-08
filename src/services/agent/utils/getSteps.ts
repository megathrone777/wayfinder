import type { ChatStatus } from "ai";
import type { useTranslations } from "next-intl";

type Translate = ReturnType<typeof useTranslations<"Steps">>;
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

const getSteps = (messages: TAgentUIMessage[], status: ChatStatus, t: Translate): TraceStep[] => {
  const isRunning = status === "submitted" || status === "streaming";
  const firstUserText = messages.find(({ role }) => role === "user")?.parts.find(isTextPart)?.text;
  const parts = messages
    .filter(({ role }: TAgentUIMessage): boolean => role === "assistant")
    .flatMap(({ parts: messageParts }) => messageParts);

  const flights = findToolPart(parts, "tool-searchFlights");
  const hotels = findToolPart(parts, "tool-searchHotels");
  const booking = findToolPart(parts, "tool-bookTrip");

  const flightsStatus = toStatus(flights);
  const hotelsStatus = toStatus(hotels);
  const searchesDone = flightsStatus === "done" && hotelsStatus === "done";

  let itineraryStatus: TraceStatus = "queued";

  if (booking) {
    itineraryStatus = "done";
  } else if (searchesDone) {
    itineraryStatus = isRunning ? "active" : "done";
  }

  let confirmStatus: TraceStatus = "queued";

  if (booking?.state === "input-available") {
    confirmStatus = "waiting";
  } else if (booking?.state === "output-available") {
    confirmStatus = booking.output.confirmed ? "done" : "error";
  } else if (booking) {
    confirmStatus = "active";
  }

  const isConfirmed = booking?.state === "output-available" && booking.output.confirmed;

  let finalizeStatus: TraceStatus = "queued";

  if (isConfirmed) {
    finalizeStatus = isRunning ? "active" : "done";
  }

  return [
    {
      detail: firstUserText,
      id: "parse-intent",
      status: firstUserText ? "done" : "queued",
      title: t("title.parse-intent"),
    },
    {
      detail: flights?.input && `${flights.input.cityFrom} ⇄ ${flights.input.cityTo}`,
      id: "search-flights",
      status: flightsStatus,
      title: t("title.search-flights"),
    },
    {
      detail: hotels?.input?.city,
      id: "search-stays",
      status: hotelsStatus,
      title: t("title.search-stays"),
    },
    {
      detail: searchesDone ? t("detail.assemble-itinerary") : undefined,
      id: "assemble-itinerary",
      status: itineraryStatus,
      title: t("title.assemble-itinerary"),
    },
    {
      approval:
        booking?.state === "input-available"
          ? {
              itinerarySummary: booking.input.itinerarySummary,
              toolCallId: booking.toolCallId,
              totalPrice: booking.input.totalPrice,
            }
          : undefined,
      detail:
        typeof booking?.input?.totalPrice === "number"
          ? t("detail.confirm", { price: booking.input.totalPrice })
          : undefined,
      id: "confirm",
      status: confirmStatus,
      title: t("title.confirm"),
    },
    {
      detail: isConfirmed ? t("detail.finalize-locked") : t("detail.finalize-pending"),
      id: "finalize",
      status: finalizeStatus,
      title: t("title.finalize"),
    },
  ];
};

export { getSteps };
