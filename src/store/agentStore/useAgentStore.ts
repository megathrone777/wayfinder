import { create } from "zustand";

import type { TAgentStore } from "./agentStore.types";

const useAgentStore = create<TAgentStore>((set) => ({
  autonomyMode: "ask-before-booking",

  setAutonomyMode: (autonomyMode: TAgentAutonomyMode): void =>
    set({
      autonomyMode,
    }),
}));

export { useAgentStore };
