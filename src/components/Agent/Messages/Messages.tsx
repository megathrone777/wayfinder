import React from "react";

import { MessageItem } from "./MessageItem";

import { wrapperClass } from "./Messages.css";

import type { TProps } from "./Messages.types";

const Messages: React.FC<TProps> = ({ messages }) => (
  <div className={wrapperClass}>
    {messages.map<React.ReactElement>((message: TAgentUIMessage) => (
      <MessageItem
        key={`${message.id}-message`}
        {...message}
      />
    ))}
  </div>
);

export { Messages };
