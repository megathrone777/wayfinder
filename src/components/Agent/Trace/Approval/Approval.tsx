import React from "react";
import { useTranslations } from "next-intl";

import { Icon } from "@/ui";

import {
  wrapperClass,
  buttonApproveClass,
  buttonRejectClass,
  contentClass,
  footerClass,
  headerClass,
  iconClass,
  iconHolderClass,
  titleClass,
} from "./Approval.css";

import type { TProps } from "./Approval.types";

const Approval: React.FC<TProps> = ({ onApprove, onReject, toolCallId, totalPrice }) => {
  const t = useTranslations("Approval");

  const handleApproveClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    onApprove(currentTarget.value);
  };

  const handleRejectClick = ({ currentTarget }: React.SyntheticEvent<HTMLButtonElement>): void => {
    onReject(currentTarget.value);
  };

  return (
    <div className={wrapperClass}>
      <div className={headerClass}>
        <div className={iconHolderClass}>
          <Icon
            className={iconClass}
            id="exclamation"
          />
        </div>

        <h6 className={titleClass}>{t("title")}</h6>
      </div>

      <div className={contentClass}>{t("text", { totalPrice })}</div>

      <div className={footerClass}>
        <button
          className={buttonApproveClass}
          onClick={handleApproveClick}
          type="button"
          value={toolCallId}
        >
          {t("buttonApprove")}
        </button>

        <button
          className={buttonRejectClass}
          onClick={handleRejectClick}
          type="button"
          value={toolCallId}
        >
          {t("buttonReject")}
        </button>
      </div>
    </div>
  );
};

export { Approval };
