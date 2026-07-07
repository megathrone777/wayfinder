import React from "react";
import Link from "next/link";

import { wrapperClass, contentClass, labelClass, layoutClass } from "./Logo.css";

import type { TProps } from "./Logo.types";

const Logo: React.FC<TProps> = ({ template = "header" }) => {
  const renderTemplate = (
    <>
      <span className={layoutClass} />
      <span className={labelClass[template]}>Wayfinder</span>
    </>
  );

  return (
    <div className={wrapperClass}>
      {template === "header" ? (
        <Link
          className={contentClass}
          href="/"
        >
          {renderTemplate}
        </Link>
      ) : (
        <span className={contentClass}>{renderTemplate}</span>
      )}
    </div>
  );
};

export { Logo };
