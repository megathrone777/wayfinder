import React from "react";

import { uuid } from "@/utils";

import { wrapperClass, buttonClass, hintClass, listClass } from "./Chips.css";

import type { TProps } from "./Chips.types";

const Chips: React.FC<TProps> = ({ sendMessage }) => {
  const chips: string[] = [
    "Small 5 days vacation in Budapest",
    "Long weekend in Kyoto — temples & a ryokan",
    "10 days Patagonia, hiking & lodges",
    "6 days Lisbon & Sintra, food + design",
  ];

  const handleButtonClick = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    await sendMessage({ text: currentTarget.value.trim() });
  };

  return (
    <div className={wrapperClass}>
      <p className={hintClass}>try</p>

      <ul className={listClass}>
        {chips.map<React.ReactElement>((chip: string) => (
          <li key={`chips-item-${uuid()}`}>
            <button
              className={buttonClass}
              onClick={handleButtonClick}
              type="button"
              value={chip}
            >
              {chip}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Chips };
