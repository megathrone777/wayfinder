import { getLocale } from "next-intl/server";

import { isLocale, type TLocale } from "@/i18n";
import { agent } from "@/services";

import type { NextRequest } from "next/server";

interface TRequestData {
  autonomyMode: TAgentAutonomyMode;
  messages: TAgentUIMessage[];
}

export const POST = async (request: NextRequest): Promise<Response> => {
  const { autonomyMode, messages } = (await request.json()) as TRequestData;
  const resolvedLocale = await getLocale();
  const locale: TLocale = isLocale(resolvedLocale) ? resolvedLocale : "en";

  return await agent.streamMessages(messages, autonomyMode, locale);
};
