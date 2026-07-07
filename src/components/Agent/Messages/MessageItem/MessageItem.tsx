import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Logo } from "@/components";

import { wrapperClass, headingClass, markdownClass, partClass, roleClass } from "./MessageItem.css";

import type { TProps } from "./MessageItem.types";

const MessageItem: React.FC<TProps> = ({ id, parts, role }) => (
  <div className={wrapperClass[role]}>
    {parts.map<null | React.ReactElement>((part, index) => {
      if (part.type === "text") {
        return (
          <div
            className={partClass[role]}
            key={`${id}-text-${role}-${index}`}
          >
            {role === "assistant" ? (
              <>
                <div className={headingClass}>
                  <Logo template="chat" />
                  <p className={roleClass}>{role}</p>
                </div>

                <div className={markdownClass}>
                  <Markdown remarkPlugins={[remarkGfm]}>{part.text}</Markdown>
                </div>
              </>
            ) : (
              <p>{part.text}</p>
            )}
          </div>
        );
      }

      return null;
    })}
  </div>
);

export { MessageItem };
