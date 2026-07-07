import type { UseChatHelpers } from "@ai-sdk/react";

export interface TProps extends Pick<UseChatHelpers<TAgentUIMessage>, "addToolOutput"> {
  steps: TraceStep[];
}
