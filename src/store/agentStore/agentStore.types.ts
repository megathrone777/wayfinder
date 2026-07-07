type TAgentStoreState = {
  activity: TAgentActivity;
  autonomyMode: TAgentAutonomyMode;
  messages: TAgentUIMessage[];
};

type TAgentStoreActions = {
  setActivity: (status: TAgentActivity) => void;
  setAutonomyMode: (autonomyMode: TAgentAutonomyMode) => void;
  setChatMessages: (messages: TAgentUIMessage[]) => void;
};

export type TAgentStore = TAgentStoreState & TAgentStoreActions;
