import type { UseChatHelpers } from "@ai-sdk/react";

export interface TChip {
  label: string;
  prompt: string;
}

export type TProps = Pick<UseChatHelpers<TAgentUIMessage>, "sendMessage">;
