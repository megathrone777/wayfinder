type TAgentStoreState = {
  activity: TAgentActivity;
  autonomyMode: TAgentAutonomyMode;
};

type TAgentStoreActions = {
  setActivity: (status: TAgentActivity) => void;
  setAutonomyMode: (autonomyMode: TAgentAutonomyMode) => void;
};

export type TAgentStore = TAgentStoreState & TAgentStoreActions;
