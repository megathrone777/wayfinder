import { ai } from "@/services";

import type { UIMessage } from "ai";
import type { NextRequest } from "next/server";

interface TRequestData {
  autonomyMode: TAgentAutonomyMode;
  messages: UIMessage[];
}

export const POST = async (request: NextRequest): Promise<Response> => {
  const { messages } = (await request.json()) as TRequestData;

  return await ai.streamMessages(messages);
};
