import React from "react";

import { Button, Icon } from "@/ui";

import {
  wrapperClass,
  buttonClass,
  contentClass,
  footerClass,
  headerClass,
  iconClass,
  iconHolderClass,
  titleClass,
} from "./Approval.css";

import type { TProps } from "./Approval.types";

const Approval: React.FC<TProps> = ({ approval, onApprove, onReject, totalPrice }) => {
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

        <h6 className={titleClass}>Approval needed</h6>
      </div>

      <div className={contentClass}>
        Ready to book flights + stay for ${totalPrice}. This action spends money — confirm to
        proceed.
      </div>

      <div className={footerClass}>
        <button
          className={buttonClass}
          onClick={handleApproveClick}
          type="button"
          value={approval?.toolCallId}
        >
          Approve &amp; book
        </button>

        <Button
          onClick={handleRejectClick}
          size="normal"
          template="tertiary"
          type="button"
          value={approval?.toolCallId}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export { Approval };
