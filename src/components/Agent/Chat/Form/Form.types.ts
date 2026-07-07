import type { UseChatHelpers } from "@ai-sdk/react";

export interface TProps extends Pick<UseChatHelpers<TAgentUIMessage>, "sendMessage"> {
  isRunning: boolean;
}
