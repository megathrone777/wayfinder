import React from "react";
import Link from "next/link";

import { Icon } from "@/ui";

import { buttonClass, buttonSizeClass, buttonTemplateClass, iconClass } from "./Button.css";

import type { TProps } from "./Button.types";

const Button: React.FC<TProps> = ({
  children,
  disabled,
  href,
  iconId,
  id,
  onClick,
  size = "small",
  template = "primary",
  type = "button",
  value,
}) => {
  const renderChildren = (): React.ReactElement => (
    <>
      {children && <span>{children}</span>}

      {iconId && (
        <Icon
          className={iconClass}
          id={iconId}
        />
      )}
    </>
  );

  return href ? (
    <Link
      {...{ href }}
      className={`${buttonClass} ${buttonSizeClass[size]} ${buttonTemplateClass[template]}`}
    >
      {renderChildren()}
    </Link>
  ) : (
    <button
      {...{ disabled, id, onClick, type, value }}
      className={`${buttonClass} ${buttonSizeClass[size]} ${buttonTemplateClass[template]}`}
    >
      {renderChildren()}
    </button>
  );
};

export { Button };
