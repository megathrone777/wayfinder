import React from "react";

import { wrapperClass, buttonClass, hintClass, listClass } from "./Chips.css";

import type { TChip, TProps } from "./Chips.types";

const description: string = `
  Do not ask any clarifying questions — assume sensible defaults, search flights and hotels, 
  then present the results.
`;

const chips: TChip[] = [
  {
    label: "From Prague to Vienna, in 10 days, 2 persons, any budget",
    prompt: "Plan a 10-day trip from Prague to Vienna for 2 people, any budget.",
  },
  {
    label: "Small 5 days vacation in Budapest",
    prompt: "Plan a 5-day trip from Berlin to Budapest for 1 person, mid-range budget.",
  },
  {
    label: "Long weekend in Kyoto — temples & a ryokan",
    prompt: `
      Plan a 4-day trip from San Francisco to Kyoto for 2 people, focused on temples 
      with a ryokan stay, mid-range budget.
    `,
  },
  {
    label: "10 days Patagonia, hiking & lodges",
    prompt: `
      Plan a 10-day trip from London to El Calafate, Patagonia for 2 people,
      hiking and lodges, higher budget.
    `,
  },
  {
    label: "6 days Lisbon & Sintra, food + design",
    prompt: `
      Plan a 6-day trip from New York to Lisbon and Sintra for 2 people, 
      food and design focus, mid-range budget.
    `,
  },
];

const Chips: React.FC<TProps> = ({ sendMessage }) => {
  const handleButtonClick = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    await sendMessage({ text: `${currentTarget.value} ${description}` });
  };

  return (
    <div className={wrapperClass}>
      <p className={hintClass}>try</p>

      <ul className={listClass}>
        {chips.map<React.ReactElement>(({ label, prompt }: TChip) => (
          <li key={label}>
            <button
              className={buttonClass}
              onClick={handleButtonClick}
              type="button"
              value={prompt}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Chips };
