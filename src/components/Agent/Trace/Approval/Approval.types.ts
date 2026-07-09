export interface TProps extends Pick<TraceApproval, "approvalId" | "totalPrice"> {
  onApprove: (approvalId: string) => void;
  onReject: (approvalId: string) => void;
}
