export interface TProps extends Pick<TBooking, "totalPrice">, Pick<TraceStep, "approval"> {
  onApprove: (toolCallId: string) => void;
  onReject: (toolCallId: string) => void;
}
