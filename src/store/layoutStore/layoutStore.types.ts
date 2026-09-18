export interface TLayoutStoreState {
  view: TLayoutView;
}

interface TLayoutStoreActions {
  setView: (view: TLayoutView) => void;
}

export type TLayoutStore = TLayoutStoreState & TLayoutStoreActions;
