"use client";
import React, { useId, useState } from "react";

import { Icon } from "@/ui";

import { errorIconClass, inputClass, labelClass, wrapperClass } from "./Input.css";

import type { TProps } from "./Input.types";

const cyrillicRegex = /[Ѐ-ӿԀ-ԯⷠ-ⷿꙀ-ꚟ]/;

const Input: React.FC<TProps> = ({
  isError,
  label,
  onBeforeInput,
  onBlur,
  restrictCyrillic,
  ...rest
}) => {
  const inputId = useId();
  const [showError, setShowError] = useState<boolean>(Boolean(isError));
  const [prevIsError, setPrevIsError] = useState(isError);

  if (prevIsError !== isError) {
    setPrevIsError(isError);
    setShowError(Boolean(isError));
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { currentTarget } = event;

    if (currentTarget.value.trim()) {
      setShowError(false);
    }

    onBlur?.(event);
  };

  const handleBeforeInput = (event: React.InputEvent<HTMLInputElement>): void => {
    if (restrictCyrillic) {
      const { data } = event.nativeEvent;

      if (data && cyrillicRegex.test(data)) {
        event.preventDefault();

        return;
      }
    }

    onBeforeInput?.(event);
  };

  return (
    <div className={wrapperClass}>
      {label && !!label.length && (
        <label
          className={labelClass}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <input
        autoComplete="new-password"
        className={inputClass[showError ? "error" : "default"]}
        id={inputId}
        onBeforeInput={handleBeforeInput}
        onBlur={handleBlur}
        spellCheck="false"
        {...rest}
      />

      {showError && (
        <Icon
          className={errorIconClass}
          id="exclamation"
        />
      )}
    </div>
  );
};

export { Input };
