import React from "react";
import { useTranslations } from "next-intl";

import { wrapperClass, buttonClass, hintClass, listClass } from "./Chips.css";

import type { TChip, TProps } from "./Chips.types";

const description: string = `
  Do not ask any clarifying questions — assume sensible defaults, search flights and hotels, 
  then present the results.
`;

const Chips: React.FC<TProps> = ({ sendMessage }) => {
  const t = useTranslations("Chips");
  const chips = t.raw("chips") as TChip[];

  const handleButtonClick = async ({
    currentTarget,
  }: React.SyntheticEvent<HTMLButtonElement>): Promise<void> => {
    await sendMessage({ text: `${currentTarget.value} ${description}` });
  };

  return (
    <div className={wrapperClass}>
      <p className={hintClass}>{t("hint")}</p>

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
