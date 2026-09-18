import type { TAgentStoreState } from "./agentStore.types";

const initialState: TAgentStoreState = {
  activity: "idle",
  autonomyMode: "ask-before-booking",
  messages: [],
};

export { initialState };
