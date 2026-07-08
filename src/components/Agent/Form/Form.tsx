import React, { useId } from "react";
import { useTranslations } from "next-intl";
import NextForm from "next/form";

import { Button, Icon } from "@/ui";

import {
  wrapperClass,
  formClass,
  footerClass,
  hintClass,
  hintIconClass,
  textareaClass,
} from "./Form.css";

import type { TProps } from "./Form.types";

const Form: React.FC<TProps> = ({ isRunning, sendMessage }) => {
  const textareaId = useId();
  const t = useTranslations("Chat");

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if ((event.key === "Enter" || event.key === "NumpadEnter") && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const text: string = `${formData.get("message") || ""}`.trim();

    if (!text) return;
    currentTarget.reset();
    await sendMessage({ text });
  };

  return (
    <div className={wrapperClass}>
      <NextForm
        action="#"
        className={formClass}
        onSubmit={handleSubmit}
      >
        <textarea
          autoComplete="off"
          autoFocus={false}
          className={textareaClass}
          disabled={isRunning}
          id={textareaId}
          name="message"
          onKeyDown={handleTextareaKeyDown}
          placeholder={t("placeholder")}
          spellCheck="false"
        />

        <div className={footerClass}>
          <p className={hintClass}>
            <Icon
              className={hintIconClass}
              id="return"
            />

            <span>{t("hint")}</span>
          </p>

          <Button
            disabled={isRunning}
            iconId="moveRight"
            size="normal"
            type="submit"
          >
            {t("planTrip")}
          </Button>
        </div>
      </NextForm>
    </div>
  );
};

export { Form };
