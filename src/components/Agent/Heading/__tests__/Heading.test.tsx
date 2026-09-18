import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { useAgentStore } from "@/store/agentStore/useAgentStore";

import { Heading } from "../Heading";

jest.mock("next-intl", () => ({
  useTranslations:
    (namespace: string) =>
      (key: string): string =>
      `${namespace}.${key}`,
}));

const stop = jest.fn();
const setMessages = jest.fn();

const agentInitial = useAgentStore.getState();

const renderHeading = (): void => {
  render(
    <Heading
      setMessages={setMessages as never}
      stop={stop as never}
    />
  );
};

describe("Heading", () => {
  beforeEach((): void => {
    stop.mockClear();
    setMessages.mockClear();
    useAgentStore.setState(agentInitial, true);
  });

  it("shows the lane hint while the agent is idle", () => {
    renderHeading();
    expect(screen.getByText("Toolbar.agentLane")).toBeInTheDocument();
  });

  it("replaces the hint with the current activity once the agent is busy", () => {
    useAgentStore.setState({ activity: "searching-stays" });
    renderHeading();

    expect(screen.getByText("Activity.searching-stays")).toBeInTheDocument();
    expect(screen.queryByText("Toolbar.agentLane")).not.toBeInTheDocument();
  });

  it("does not touch the conversation until reset is used", () => {
    renderHeading();

    expect(stop).not.toHaveBeenCalled();
    expect(setMessages).not.toHaveBeenCalled();
  });

  it("stops the stream and clears the conversation on reset", () => {
    renderHeading();

    fireEvent.click(screen.getByRole("button", { name: "Toolbar.reset" }));

    expect(stop).toHaveBeenCalledTimes(1);
    expect(setMessages).toHaveBeenCalledWith([]);
  });
});
