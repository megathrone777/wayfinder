"use client";
import React, { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import useVibration, { VibrationPatterns } from "@luxonauta/use-vibration";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";

import { agent } from "@/services";
import { useAgentStore, useLayoutStore } from "@/store";

import { Chat } from "./Chat";
import { Chips } from "./Chips";
import { Form } from "./Form";
import { Heading } from "./Heading";
import { Hero } from "./Hero";
import { Messages } from "./Messages";
import { Trace } from "./Trace";

import { wrapperClass, contentClass } from "./Agent.css";

const Agent: React.FC = () => {
  const [{ isSupported }, { vibrate }] = useVibration();
  const { autonomyMode, setActivity, setChatMessages } = useAgentStore(
    useShallow(({ autonomyMode, setActivity, setChatMessages }) => ({
      autonomyMode,
      setActivity,
      setChatMessages,
    }))
  );
  const layoutView = useLayoutStore(({ view }) => view);

  const { addToolApprovalResponse, messages, sendMessage, setMessages, status, stop } =
    useChat<TAgentUIMessage>({
      onFinish: ({ isAbort, isDisconnect, isError, message }): void => {
        if (!isSupported) return;
        if (isAbort || isDisconnect || isError) return;
        if (message.parts.at(-1)?.type !== "text") return;
        vibrate(VibrationPatterns.tap);
      },

      sendAutomaticallyWhen: (options): boolean =>
        lastAssistantMessageIsCompleteWithToolCalls(options) ||
        lastAssistantMessageIsCompleteWithApprovalResponses(options),
      transport: new DefaultChatTransport({
        api: "/api/chat",
        body: { autonomyMode },
      }),
    });

  const t = useTranslations("Steps");
  const traceSteps: TraceStep[] = agent.getSteps(messages, status, t);
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
    const activity: TAgentActivity = agent.getActivity(messages, status);

    setActivity(activity);
    setChatMessages(messages);
  }, [messages, status]);

  return (
    <div className={wrapperClass[layoutView]}>
      <Heading {...{ setMessages, stop }} />

      <div className={contentClass[showMessages || showTrace ? "default" : "scrollable"]}>
        {showMessages || showTrace ? (
          <Chat>
            {showMessages && <Messages {...{ messages }} />}
            {showTrace && <Trace {...{ addToolApprovalResponse, traceSteps }} />}
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
