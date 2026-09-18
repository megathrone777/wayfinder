import { create } from "zustand";

import { initialState } from "./initialState";

import type { TLayoutStore } from "./layoutStore.types";

const useLayoutStore = create<TLayoutStore>((set) => ({
  ...initialState,

  setView: (view: TLayoutView): void =>
    set({
      view,
    }),
}));

export { useLayoutStore };
