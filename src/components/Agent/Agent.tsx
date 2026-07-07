"use client";
import React, { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { useShallow } from "zustand/react/shallow";

import { deriveActivity, deriveTrace } from "@/services";
import { useAgentStore } from "@/store";

import { Chat } from "./Chat";
import { Chips } from "./Chips";
import { Form } from "./Form";
import { Heading } from "./Heading";
import { Hero } from "./Hero";
import { Messages } from "./Messages";
import { Trace } from "./Trace";

import { wrapperClass, contentClass } from "./Agent.css";

const Agent: React.FC = () => {
  const { autonomyMode, setActivity, setChatMessages } = useAgentStore(
    useShallow(({ autonomyMode, setActivity, setChatMessages }) => ({
      autonomyMode,
      setActivity,
      setChatMessages,
    }))
  );
  const { addToolOutput, messages, sendMessage, setMessages, status, stop } =
    useChat<TAgentUIMessage>({
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
      transport: new DefaultChatTransport({
        api: "/api/chat",
        body: { autonomyMode },
      }),
    });
  const steps: TraceStep[] = deriveTrace(messages, status);
  const hasToolActivity: boolean = messages.some(
    ({ parts, role }) => role === "assistant" && parts.some(({ type }) => type.startsWith("tool-"))
  );
  const isRunning: boolean = status === "streaming" || status === "submitted";
  const lastAssistant = [...messages].reverse().find(({ role }) => role === "assistant");
  const lastPart = lastAssistant?.parts.at(-1);
  const isAsking: boolean = !isRunning && lastPart?.type === "text";
  const showTrace: boolean = hasToolActivity && !isAsking;
  const showMessages: boolean = messages.length > 0 && !showTrace;

  useEffect((): void => {
    const activity: TAgentActivity = deriveActivity(messages, status);

    setActivity(activity);
    setChatMessages(messages);
  }, [messages, status]);

  return (
    <div className={wrapperClass}>
      <Heading {...{ setMessages, stop }} />

      <div className={contentClass}>
        {showMessages || showTrace ? (
          <Chat>
            {showMessages && <Messages {...{ messages }} />}
            {showTrace && <Trace {...{ addToolOutput, steps }} />}
          </Chat>
        ) : (
          <Hero />
        )}

        <Form {...{ isRunning, sendMessage }} />
        {!(showMessages || showTrace) && <Chips {...{ sendMessage }} />}
      </div>
    </div>
  );
};

export { Agent };
