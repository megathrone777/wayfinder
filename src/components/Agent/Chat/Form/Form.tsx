import React, { useId, useState } from "react";
import NextForm from "next/form";

import { Button, Icon } from "@/ui";

import {
  wrapperClass,
  formClass,
  footerClass,
  hintClass,
  hintIconClass,
  inputClass,
} from "./Form.css";

import type { TProps } from "./Form.types";

const Form: React.FC<TProps> = ({ isRunning, sendMessage }) => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
    setInputValue(currentTarget.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const text: string = inputValue.trim();

    if (!text) return;

    setInputValue("");
    await sendMessage({ text });
  };

  return (
    <div className={wrapperClass}>
      <NextForm
        action="#"
        className={formClass}
        onSubmit={handleSubmit}
      >
        <input
          autoComplete="off"
          className={inputClass}
          disabled={isRunning}
          id={inputId}
          onChange={handleInputChange}
          placeholder="Describe your trip..."
          spellCheck="false"
          value={inputValue}
        />

        <div className={footerClass}>
          <p className={hintClass}>
            <Icon
              className={hintIconClass}
              id="return"
            />

            <span>to plan</span>
          </p>

          <Button
            disabled={isRunning}
            iconId="moveRight"
            size="normal"
            type="submit"
          >
            Plan trip
          </Button>
        </div>
      </NextForm>
    </div>
  );
};

export { Form };
