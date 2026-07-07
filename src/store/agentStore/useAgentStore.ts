import { create } from "zustand";

import type { TAgentStore } from "./agentStore.types";

const useAgentStore = create<TAgentStore>((set) => ({
  activity: "idle",
  autonomyMode: "ask-before-booking",

  setActivity: (activity: TAgentActivity): void =>
    set({
      activity,
    }),

  setAutonomyMode: (autonomyMode: TAgentAutonomyMode): void =>
    set({
      autonomyMode,
    }),
}));

export { useAgentStore };
