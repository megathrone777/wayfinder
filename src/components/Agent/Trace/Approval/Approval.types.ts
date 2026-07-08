export interface TProps extends Required<Pick<TraceApproval, "toolCallId" | "totalPrice">> {
  onApprove: (toolCallId: string) => void;
  onReject: (toolCallId: string) => void;
}
