const userText = (text: string): TAgentUIMessage =>
  ({
    id: `user-${text}`,
    parts: [{ text, type: "text" }],
    role: "user",
  }) as unknown as TAgentUIMessage;

const assistant = (parts: unknown[]): TAgentUIMessage =>
  ({
    id: "assistant",
    parts,
    role: "assistant",
  }) as unknown as TAgentUIMessage;

const flightsPart = (
  state: string,
  extra: Record<string, unknown> = {}
): Record<string, unknown> => ({
  input: { cityFrom: "Prague", cityTo: "Rome" },
  state,
  type: "tool-searchFlights",
  ...extra,
});

const hotelsPart = (
  state: string,
  extra: Record<string, unknown> = {}
): Record<string, unknown> => ({
  input: { city: "Rome" },
  state,
  type: "tool-searchHotels",
  ...extra,
});

const itineraryPart = (
  state: string,
  extra: Record<string, unknown> = {}
): Record<string, unknown> => ({
  input: { city: "Rome", days: 3 },
  state,
  type: "tool-assembleItinerary",
  ...extra,
});

const bookingPart = (
  state: string,
  extra: Record<string, unknown> = {}
): Record<string, unknown> => ({
  input: { itinerarySummary: "Rome trip", totalPrice: 1200 },
  state,
  type: "tool-bookTrip",
  ...extra,
});

export { assistant, bookingPart, flightsPart, hotelsPart, itineraryPart, userText };
