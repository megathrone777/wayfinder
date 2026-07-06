import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { model } from "./model";
import { bookTrip, searchFlights, searchHotels } from "./tools";

// if (autonomy === 'ask_always') → всегда требовать confirm
// if (autonomy === 'ask_before_booking') → confirm только для placeOrder/booking-инструментов
// if (autonomy === 'full_auto') → не спрашивать

const streamMessages = async (
  messages: UIMessage[],
  autonomyMode: TAgentAutonomyMode
): Promise<Response> => {
  const result = streamText({
    messages: await convertToModelMessages(messages),
    model,
    stopWhen: stepCountIs(8),
    system: `
      You are a travel-planning agent. Use the tools to search flights,
      hotels and activities, then assemble a day-by-day itinerary.
      Explain each step briefly as you go.
    `,
    tools: {
      bookTrip,
      searchFlights,
      searchHotels,
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(result),
  });
};

export { streamMessages };
