import React, { useId } from "react";

import { Icon } from "@/ui";

import {
  iconClass,
  inputClass,
  labelClass,
  layoutClass,
  wrapperClass,
} from "./Checkbox.css";

import type { TProps } from "./Checkbox.types";

const Checkbox: React.FC<TProps> = ({
  checked,
  className,
  defaultChecked,
  disabled,
  label,
  name,
  onChange,
  template = "normal",
  type,
  value,
}) => {
  const inputId = useId();

  return (
    <div className={`${wrapperClass} ${className ? className : ""}`}>
      <span className={layoutClass[template]}>
        <input
          {...{
            checked,
            defaultChecked,
            disabled,
            name,
            onChange,
            type,
            value,
          }}
          className={inputClass}
          id={inputId}
        />

        <Icon
          className={iconClass[template]}
          id="checkmark"
        />
      </span>

      <label
        className={labelClass[template]}
        htmlFor={inputId}
      >
        {label}
      </label>
    </div>
  );
};

export { Checkbox };
