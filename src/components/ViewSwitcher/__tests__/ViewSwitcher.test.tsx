import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { getResultsCount as mockGetResultsCount } from "@/services/agent/utils/getResultsCount";
import { useAgentStore } from "@/store/agentStore/useAgentStore";
import { useLayoutStore } from "@/store/layoutStore/useLayoutStore";

import { ViewSwitcher } from "../ViewSwitcher";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    return (key: string): string => key;
  },
}));

jest.mock("@/services", () => ({ agent: { getResultsCount: mockGetResultsCount } }));

const agentInitial = useAgentStore.getState();
const layoutInitial = useLayoutStore.getState();

describe("ViewSwitcher", () => {
  beforeEach(() => {
    useAgentStore.setState(agentInitial, true);
    useLayoutStore.setState(layoutInitial, true);
  });

  it("renders the agent and results lane buttons", () => {
    render(<ViewSwitcher />);
    expect(screen.getByRole("button", { name: /agentLane/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /results/i })).toBeInTheDocument();
  });

  it("does not show a results count when there are none", () => {
    render(<ViewSwitcher />);
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("shows the results count badge once results exist", () => {
    useAgentStore.setState({ activity: "trip-confirmed" });
    render(<ViewSwitcher />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("switches the layout view to output when the results button is clicked", () => {
    render(<ViewSwitcher />);
    fireEvent.click(screen.getByRole("button", { name: /results/i }));
    expect(useLayoutStore.getState().view).toBe("output");
  });

  it("switches back to the agent view", () => {
    useLayoutStore.setState({ view: "output" });
    render(<ViewSwitcher />);
    fireEvent.click(screen.getByRole("button", { name: /agentLane/i }));
    expect(useLayoutStore.getState().view).toBe("agent");
  });
});
