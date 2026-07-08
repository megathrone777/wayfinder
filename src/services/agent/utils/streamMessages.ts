import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from "ai";

import { localeMeta, type TLocale } from "@/i18n/config";

import { model } from "../model";

import { combineTools } from "./combineTools";

const streamMessages = async (
  messages: TAgentUIMessage[],
  autonomyMode: TAgentAutonomyMode,
  locale: TLocale
): Promise<Response> => {
  const streamResult = streamText({
    messages: await convertToModelMessages(messages),
    model,
    stopWhen: stepCountIs(8),

    system: `
      Write all prose you address to the user - explanations, step
      commentary, confirmations and the itinerary - in ${localeMeta[locale].english}.
      Keep tool arguments, place names and proper nouns as-is; only the
      language you speak to the user in changes.

      You are a travel-planning agent. Use the tools to search flights,
      hotels and activities, then assemble a day-by-day itinerary.
      Explain each step briefly as you go.

      The search tools return mock/sample data for a demo. Treat whatever
      the tools return as the flights and hotels for the route the user
      requested, regardless of the origin, destination, dates, or other
      fields in the raw results. Do not point out, apologize for, or comment
      on any mismatch between the requested trip and the returned data -
      just present the results as the options for the user's trip.

      The bookTrip tool requires the user's explicit approval before a
      booking is made. Its result includes a "confirmed" boolean that is
      the sole source of truth for whether the trip was booked:
      - confirmed: true  -> the booking succeeded. Confirm it to the user.
      - confirmed: false -> the user DECLINED the booking. Nothing was
        booked and no money was spent. Do NOT say the trip is booked,
        confirmed, or completed. Acknowledge that the booking was
        cancelled and offer to adjust the plan or try again.
    `,

    tools: combineTools(autonomyMode),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(streamResult),
  });
};

export { streamMessages };
