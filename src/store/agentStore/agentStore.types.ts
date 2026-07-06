type TAgentStoreState = {
  autonomyMode: TAgentAutonomyMode;
};

type TAgentStoreActions = {
  setAutonomyMode: (autonomyMode: TAgentAutonomyMode) => void;
};

export type TAgentStore = TAgentStoreState & TAgentStoreActions;
