"use client";
import React from "react";

import { useAgentStore } from "@/store";

import { wrapperClass, buttonClass, listClass, titleClass } from "./Autonomy.css";

const autonomies: TAgentAutonomy[] = [
  {
    label: "Ask always",
    mode: "ask-always",
  },
  {
    label: "Ask before booking",
    mode: "ask-before-booking",
  },
  {
    label: "Full auto",
    mode: "auto",
  },
];

const Autonomy: React.FC = () => {
  const { autonomyMode, setAutonomyMode } = useAgentStore();

  const handleButtonClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    setAutonomyMode(currentTarget.value as TAgentAutonomyMode);
  };

  return (
    <div className={wrapperClass}>
      <p className={titleClass}>Autonomy</p>

      {autonomies && !!autonomies.length && (
        <ul className={listClass}>
          {autonomies.map<React.ReactElement>(({ label, mode }: TAgentAutonomy) => (
            <li key={`autonomy-menu-item-${mode}`}>
              <button
                className={buttonClass[autonomyMode === mode ? "active" : "default"]}
                onClick={handleButtonClick}
                type="button"
                value={mode}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Autonomy };
