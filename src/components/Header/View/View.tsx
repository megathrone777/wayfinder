"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { useAgentStore, useLayoutStore } from "@/store";
import { Container } from "@/ui";

import { wrapperClass, amountClass, buttonClass, buttonGlowClass, layoutClass } from "./View.css";

const View: React.FC = () => {
  const messages = useAgentStore(({ messages }) => messages);
  const { setView, view } = useLayoutStore();
  const t = useTranslations("Toolbar");

  const handleButtonClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    setView(currentTarget.value as TLayoutView);
  };

  return (
    <div className={wrapperClass}>
      <Container>
        <div className={layoutClass}>
          <button
            className={buttonClass[view === "agent" ? "active" : "default"]}
            onClick={handleButtonClick}
            type="button"
            value="agent"
          >
            {t("agentLane")}
          </button>

          <button
            className={`
              ${buttonClass[view === "output" ? "active" : "default"]} 
              ${messages.length > 1 ? buttonGlowClass : ""}
            `}
            onClick={handleButtonClick}
            type="button"
            value="output"
          >
            <span>{t("results")}</span>
            {messages.length > 1 && <span className={amountClass}>{messages.length}</span>}
          </button>
        </div>
      </Container>
    </div>
  );
};

export { View };
