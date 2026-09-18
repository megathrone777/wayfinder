import { create } from "zustand";

import { initialState } from "./initialState";

import type { TAgentStore } from "./agentStore.types";

const useAgentStore = create<TAgentStore>((set) => ({
  ...initialState,

  setActivity: (activity: TAgentActivity): void =>
    set({
      activity,
    }),

  setAutonomyMode: (autonomyMode: TAgentAutonomyMode): void =>
    set({
      autonomyMode,
    }),

  setChatMessages: (messages: TAgentUIMessage[]): void =>
    set({
      messages,
    }),
}));

export { useAgentStore };
