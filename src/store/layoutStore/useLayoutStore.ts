import { create } from "zustand";

import type { TLayoutStore } from "./layoutStore.types";

const useLayoutStore = create<TLayoutStore>((set) => ({
  setView: (view: TLayoutView): void =>
    set({
      view,
    }),

  view: "agent",
}));

export { useLayoutStore };
