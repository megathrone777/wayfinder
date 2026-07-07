import React from "react";

import { Approval } from "./Approval";

import {
  wrapperClass,
  bodyClass,
  detailClass,
  headingClass,
  itemClass,
  listClass,
  markerClass,
  progressClass,
  statusClass,
  titleClass,
} from "./Trace.css";

import type { TProps } from "./Trace.types";

const statusLabel: Record<TraceStatus, string> = {
  active: "Running",
  done: "Done",
  error: "Failed",
  queued: "Queued",
  waiting: "Waiting",
};

const Trace: React.FC<TProps> = ({ addToolOutput, steps }) => {
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
      <p className={headingClass}>Reasoning trace</p>

      <ol className={listClass}>
        {steps.map<React.ReactElement>(({ approval, detail, id, status, title }: TraceStep) => (
          <li
            className={itemClass}
            data-status={status}
            key={id}
          >
            <span className={markerClass} />

            <div className={bodyClass}>
              <p className={titleClass}>{title}</p>
              {detail && <p className={detailClass}>{detail}</p>}

              {approval && (
                <Approval
                  {...{ approval }}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  totalPrice={123}
                />
              )}
            </div>

            {status === "active" && <div className={progressClass} />}
            <span className={statusClass}>{statusLabel[status]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { Trace };
