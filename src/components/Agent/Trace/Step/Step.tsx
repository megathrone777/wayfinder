import React from "react";
import { useTranslations } from "next-intl";

import { Icon } from "@/ui";

import {
  wrapperClass,
  connectorClass,
  contentClass,
  detailClass,
  headerClass,
  iconClass,
  progressClass,
  railClass,
  spotClass,
  statusClass,
  titleClass,
} from "./Step.css";

import type { TProps } from "./Step.types";

const Step: React.FC<TProps> = ({ children, detail, isLast, isPast, status, title }) => {
  const t = useTranslations("Trace");

  return (
    <div className={wrapperClass}>
      <div className={railClass}>
        <div className={spotClass[status]}>
          {status === "done" && (
            <Icon
              className={iconClass}
              id="checkmark"
            />
          )}
        </div>

        <div className={connectorClass[isLast ? "isLast" : isPast ? "isPast" : "default"]} />
      </div>

      <div className={contentClass}>
        <div className={headerClass}>
          <p className={titleClass[status === "queued" ? "queued" : "default"]}>{title}</p>
          <p className={statusClass[status]}>{t(status)}</p>
        </div>

        {detail && <p className={detailClass}>{detail}</p>}
        {children}
        {status === "active" && <div className={progressClass} />}
      </div>
    </div>
  );
};

export { Step };
