import { getOutput } from "./getOutput";

const getResultsCount = (messages: TAgentUIMessage[], activity: TAgentActivity): number => {
  const flights = getOutput(messages, "tool-searchFlights");
  const itinerary = getOutput(messages, "tool-assembleItinerary");
  const hotels = getOutput(messages, "tool-searchHotels");

  const hasFlight = !!flights?.output.length;
  const hasItinerary = !!itinerary?.output.length;
  const hasHotel = !!hotels?.output.length;

  const sections = [hasFlight, hasItinerary, hasHotel].filter(Boolean).length;

  return activity === "trip-confirmed" ? sections + 2 : sections;
};

export { getResultsCount };
