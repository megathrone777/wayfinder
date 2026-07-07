import { streamMessages } from "@/services";

import type { NextRequest } from "next/server";

interface TRequestData {
  autonomyMode: TAgentAutonomyMode;
  messages: TAgentUIMessage[];
}

export const POST = async (request: NextRequest): Promise<Response> => {
  const { autonomyMode, messages } = (await request.json()) as TRequestData;

  return await streamMessages(messages, autonomyMode);
};
