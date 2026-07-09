"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";

import { agent } from "@/services";
import { useAgentStore, useLayoutStore } from "@/store";
import { Container } from "@/ui";

import {
  wrapperClass,
  amountClass,
  buttonClass,
  buttonGlowClass,
  layoutClass,
} from "./ViewSwitcher.css";

const ViewSwitcher: React.FC = () => {
  const { activity, messages } = useAgentStore(
    useShallow(({ activity, messages }) => ({
      activity,
      messages,
    }))
  );
  const { setView, view } = useLayoutStore();
  const t = useTranslations("Toolbar");
  const resultsCount = agent.getResultsCount(messages, activity);

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
              ${resultsCount > 0 ? buttonGlowClass : ""}
            `}
            onClick={handleButtonClick}
            type="button"
            value="output"
          >
            <span>{t("results")}</span>
            {resultsCount > 0 && <span className={amountClass}>{resultsCount}</span>}
          </button>
        </div>
      </Container>
    </div>
  );
};

export { ViewSwitcher };
