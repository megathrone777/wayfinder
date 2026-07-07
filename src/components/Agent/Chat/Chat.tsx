import React from "react";

import { useStickToBottom } from "@/hooks";

import { wrapperClass, layoutClass } from "./Chat.css";

import type { TProps } from "./Chat.types";

const Chat: React.FC<TProps> = ({ children }) => {
  const { setContainer, setContent } = useStickToBottom();

  return (
    <div
      className={wrapperClass}
      ref={setContainer}
    >
      <div
        className={layoutClass}
        ref={setContent}
      >
        {children}
      </div>
    </div>
  );
};

export { Chat };
