import type { tools } from "@/services/agent/tools";

import type { InferUITools, UIMessage } from "ai";

declare global {
  type TAgentTools = InferUITools<typeof tools>;
  type TAgentUIMessage = UIMessage<unknown, Record<string, never>, TAgentTools>;
  type TAgentAutonomyMode = "ask-always" | "ask-before-booking" | "auto";
  type TAgentPart = TAgentUIMessage["parts"][number];
  type TraceStatus = "active" | "done" | "error" | "queued" | "waiting";

  type TAgentActivity =
    | "booking"
    | "building-itinerary"
    | "idle"
    | "searching-flights"
    | "searching-stays"
    | "trip-confirmed"
    | "trip-rejected"
    | "waiting";

  interface TAgentAutonomy {
    label: string;
    mode: TAgentAutonomyMode;
  }

  interface TraceApproval {
    approvalId: string;
    totalPrice?: number;
  }

  interface TraceStep {
    approval?: TraceApproval;
    detail?: string;
    id: string;
    status: TraceStatus;
    title: string;
  }
}

export {};
