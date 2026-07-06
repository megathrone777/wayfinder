import React from "react";
import Link from "next/link";

import { wrapperClass, labelClass, layoutClass, linkClass } from "./Logo.css";

const Logo: React.FC = () => (
  <div className={wrapperClass}>
    <Link
      className={linkClass}
      href="/"
    >
      <span className={layoutClass} />
      <span className={labelClass}>Wayfinder</span>
    </Link>
  </div>
);

export { Logo };
