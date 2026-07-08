"use client";
import React, { useId, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { useClickOutside } from "@/hooks";
import { localeMeta, locales, setLocale, type TLocale } from "@/i18n";
import { Icon } from "@/ui";

import {
  wrapperClass,
  angleIconClass,
  iconClass,
  layoutClass,
  listClass,
  optionClass,
  selectClass,
  triggerClass,
} from "./Language.css";

const Language: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const locale = useLocale() as TLocale;
  const router = useRouter();
  const selectId = useId();

  const toggleLocale = (newLocale: TLocale): void => {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  const handleOptionClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    const newLocale = currentTarget.value as TLocale;

    toggleLocale(newLocale);
  };

  const handleSelectChange = ({ currentTarget }: React.SyntheticEvent<HTMLSelectElement>): void => {
    const newLocale = currentTarget.value as TLocale;

    toggleLocale(newLocale);
  };

  const handleTriggerClick = (): void => {
    setIsOpened(true);
  };

  useClickOutside(wrapperRef, (): void => {
    setIsOpened(false);
  });

  return (
    <div
      className={wrapperClass}
      ref={wrapperRef}
    >
      <button
        className={triggerClass}
        onClick={handleTriggerClick}
        type="button"
      >
        <span>{localeMeta[locale].label}</span>

        <Icon
          className={angleIconClass[isOpened ? "rotated" : "default"]}
          id="angle"
        />
      </button>

      <div className={layoutClass[isOpened ? "isOpened" : "isClosed"]}>
        <ul className={listClass}>
          {locales.map<React.ReactElement>((code: TLocale) => (
            <li key={`lang-option-${code}`}>
              <button
                className={optionClass[code === locale ? "active" : "default"]}
                onClick={handleOptionClick}
                type="button"
                value={code}
              >
                <span>{localeMeta[code].label}</span>

                {code === locale && (
                  <Icon
                    className={iconClass}
                    id="checkmark"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <select
        className={selectClass}
        disabled={isPending}
        id={selectId}
        onChange={handleSelectChange}
        value={locale}
      >
        {locales.map<React.ReactElement>((code: TLocale) => (
          <option
            key={code}
            value={code}
          >
            {localeMeta[code].label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Language };
