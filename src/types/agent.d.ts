declare global {
  type TAgentStatus = "confirmed" | "idle" | "processing" | "waiting";
  type TAgentAutonomyMode = "ask-always" | "ask-before-booking" | "auto";

  interface TAgentAutonomy {
    label: string;
    mode: TAgentAutonomyMode;
  }
}

export {};
