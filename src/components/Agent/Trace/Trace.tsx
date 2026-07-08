import React from "react";
import { useTranslations } from "next-intl";

import { Approval } from "./Approval";
import { Step } from "./Step";

import { wrapperClass, headingClass, listClass } from "./Trace.css";

import type { TProps } from "./Trace.types";

const Trace: React.FC<TProps> = ({ addToolOutput, traceSteps }) => {
  const t = useTranslations("Trace");

  const handleApprove = (toolCallId: string): void => {
    void addToolOutput({
      output: {
        confirmed: true,
        itinerarySummary: "",
        totalPrice: 0,
      },
      tool: "bookTrip",
      toolCallId,
    });
  };

  const handleReject = (toolCallId: string): void => {
    void addToolOutput({
      output: { confirmed: false },
      tool: "bookTrip",
      toolCallId,
    });
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
                  onApprove={handleApprove}
                  onReject={handleReject}
                  toolCallId={approval.toolCallId}
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
