type TLayoutStoreState = {
  view: TLayoutView;
};

type TLayoutStoreActions = {
  setView: (view: TLayoutView) => void;
};

export type TLayoutStore = TLayoutStoreState & TLayoutStoreActions;
