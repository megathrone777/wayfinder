import React from "react";
import { useTranslations } from "next-intl";

import { Approval } from "./Approval";
import { Step } from "./Step";

import { wrapperClass, headingClass, listClass } from "./Trace.css";

import type { TProps } from "./Trace.types";

const Trace: React.FC<TProps> = ({ addToolApprovalResponse, traceSteps }) => {
  const t = useTranslations("Trace");

  const handleApprove = (approvalId: string): void => {
    void addToolApprovalResponse({ approved: true, id: approvalId });
  };

  const handleReject = (approvalId: string): void => {
    void addToolApprovalResponse({ approved: false, id: approvalId });
  };

  return (
    <div className={wrapperClass}>
      <p className={headingClass}>{t("heading")}</p>

      <div className={listClass}>
        {traceSteps.map<React.ReactElement>(
          ({ approval, detail, id, status, title }: TraceStep, index) => (
            <Step
              isLast={index === traceSteps.length - 1}
              isPast={status === "done"}
              key={id}
              {...{ detail, status, title }}
            >
              {approval && (
                <Approval
                  approvalId={approval.approvalId}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  totalPrice={approval.totalPrice}
                />
              )}
            </Step>
          )
        )}
      </div>
    </div>
  );
};

export { Trace };
