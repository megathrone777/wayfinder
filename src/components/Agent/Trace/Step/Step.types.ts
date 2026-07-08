import type React from "react";

export interface TProps extends Pick<TraceStep, "detail" | "status" | "title"> {
  children: React.ReactNode;
  isLast: boolean;
  isPast: boolean;
}
