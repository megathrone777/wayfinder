"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { useAgentStore } from "@/store";

import { wrapperClass, buttonClass, listClass, titleClass } from "./Autonomy.css";

const autonomies: TAgentAutonomyMode[] = ["ask-always", "ask-before-booking", "auto"];

const Autonomy: React.FC = () => {
  const { autonomyMode, setAutonomyMode } = useAgentStore();
  const t = useTranslations("Autonomy");

  const handleButtonClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    setAutonomyMode(currentTarget.value as TAgentAutonomyMode);
  };

  return (
    <div className={wrapperClass}>
      <p className={titleClass}>{t("title")}</p>

      {autonomies && !!autonomies.length && (
        <ul className={listClass}>
          {autonomies.map<React.ReactElement>((mode: TAgentAutonomyMode) => (
            <li key={`autonomy-menu-item-${mode}`}>
              <button
                className={buttonClass[autonomyMode === mode ? "active" : "default"]}
                onClick={handleButtonClick}
                type="button"
                value={mode}
              >
                {t(mode)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Autonomy };
