import type { UseChatHelpers } from "@ai-sdk/react";

export type TProps = Pick<UseChatHelpers<TAgentUIMessage>, "setMessages" | "stop">;
