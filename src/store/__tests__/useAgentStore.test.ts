import { beforeEach, describe, expect, it } from "@jest/globals";

import { useAgentStore } from "../agentStore/useAgentStore";

const initial = useAgentStore.getState();

describe("useAgentStore", () => {
  beforeEach(() => {
    useAgentStore.setState(initial, true);
  });

  it("starts idle, in ask-before-booking mode, with no messages", () => {
    const state = useAgentStore.getState();

    expect(state.activity).toBe("idle");
    expect(state.autonomyMode).toBe("ask-before-booking");
    expect(state.messages).toEqual([]);
  });

  it("updates the activity", () => {
    useAgentStore.getState().setActivity("searching-flights");
    expect(useAgentStore.getState().activity).toBe("searching-flights");
  });

  it("updates the autonomy mode", () => {
    useAgentStore.getState().setAutonomyMode("auto");
    expect(useAgentStore.getState().autonomyMode).toBe("auto");
  });

  it("replaces the chat messages", () => {
    const messages = [{ id: "1", parts: [], role: "user" }] as unknown as TAgentUIMessage[];

    useAgentStore.getState().setChatMessages(messages);
    expect(useAgentStore.getState().messages).toBe(messages);
  });

  it("does not mutate unrelated slices when setting one value", () => {
    useAgentStore.getState().setActivity("booking");
    expect(useAgentStore.getState().autonomyMode).toBe("ask-before-booking");
    expect(useAgentStore.getState().messages).toEqual([]);
  });
});
