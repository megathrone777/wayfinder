import { beforeEach, describe, expect, it } from "@jest/globals";

import { useLayoutStore } from "../layoutStore/useLayoutStore";

const initial = useLayoutStore.getState();

describe("useLayoutStore", () => {
  beforeEach(() => {
    useLayoutStore.setState(initial, true);
  });

  it("defaults to the agent view", () => {
    expect(useLayoutStore.getState().view).toBe("agent");
  });

  it("switches to the output view", () => {
    useLayoutStore.getState().setView("output");
    expect(useLayoutStore.getState().view).toBe("output");
  });

  it("switches back to the agent view", () => {
    useLayoutStore.getState().setView("output");
    useLayoutStore.getState().setView("agent");
    expect(useLayoutStore.getState().view).toBe("agent");
  });
});
