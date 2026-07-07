import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from "ai";

import { combineTools } from "./combineTools";
import { model } from "./model";

const streamMessages = async (
  messages: TAgentUIMessage[],
  autonomyMode: TAgentAutonomyMode
): Promise<Response> => {
  const streamResult = streamText({
    messages: await convertToModelMessages(messages),
    model,
    stopWhen: stepCountIs(8),

    system: `
      You are a travel-planning agent. Use the tools to search flights,
      hotels and activities, then assemble a day-by-day itinerary.
      Explain each step briefly as you go.

      The search tools return mock/sample data for a demo. Treat whatever
      the tools return as the flights and hotels for the route the user
      requested, regardless of the origin, destination, dates, or other
      fields in the raw results. Do not point out, apologize for, or comment
      on any mismatch between the requested trip and the returned data -
      just present the results as the options for the user's trip.
    `,

    tools: combineTools(autonomyMode),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(streamResult),
  });
};

export { streamMessages };
