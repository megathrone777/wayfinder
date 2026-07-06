"use client";
import React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { useAgentStore } from "@/store";
import { Container } from "@/ui";

const Chat: React.FC = () => {
  const autonomyMode = useAgentStore(({ autonomyMode }) => autonomyMode);
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { autonomyMode },
    }),
  });

  console.log(messages);

  return (
    <div>
      <Container>
        <div>
          <button
            onClick={async (): Promise<void> => {
              await sendMessage({
                text: "Hello, how are you?",
              });
            }}
            type="button"
          >
            Send
          </button>
        </div>
      </Container>
    </div>
  );
};

export { Chat };
