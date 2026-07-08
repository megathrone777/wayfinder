import React from "react";

import { wrapperClass, dotClass, footerClass, headerClass, titleClass } from "./Box.css";

import type { TProps } from "./Box.types";

const Box: React.FC<TProps> = ({ children, className, footer, header, title, ...props }) => (
  <div
    className={`
      ${wrapperClass}
      ${className && !!className.length ? ` ${className}` : ""}
    `}
    {...props}
  >
    <div className={headerClass}>
      <p className={titleClass}>
        <span className={dotClass} />
        <span>{title}</span>
      </p>

      {header}
    </div>

    {children}
    {footer && <div className={footerClass}>{footer}</div>}
  </div>
);

export { Box };
