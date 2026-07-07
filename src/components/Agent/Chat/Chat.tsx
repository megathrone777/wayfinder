"use client";
import React, { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { useShallow } from "zustand/react/shallow";

import { deriveActivity } from "@/services";
import { useAgentStore } from "@/store";

import { Chips } from "./Chips";
import { Form } from "./Form";
import { Messages } from "./Messages";

import type { TProps } from "./Chat.types";

const Chat: React.FC<TProps> = ({ children }) => {
  const { autonomyMode, setActivity } = useAgentStore(
    useShallow(({ autonomyMode, setActivity }) => ({
      autonomyMode,
      setActivity,
    }))
  );
  const { addToolOutput, messages, sendMessage, status } = useChat<TAgentUIMessage>({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { autonomyMode },
    }),
  });
  const isRunning: boolean = status === "streaming" || status === "submitted";

  useEffect((): void => {
    const activity: TAgentActivity = deriveActivity(messages, status);

    setActivity(activity);
  }, [messages, status]);

  return (
    <>
      {messages && !!messages.length ? <Messages {...{ addToolOutput, messages }} /> : children}
      <Form {...{ isRunning, sendMessage }} />
      {messages.length === 0 && <Chips {...{ sendMessage }} />}
    </>
  );
};

export { Chat };
