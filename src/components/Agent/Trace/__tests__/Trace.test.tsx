import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { Trace } from "../Trace";

jest.mock("next-intl", () => {
  const translations = (namespace: string) =>
    (key: string, values?: Record<string, unknown>): string =>
      values ? `${namespace}.${key}(${JSON.stringify(values)})` : `${namespace}.${key}`;

  return { useTranslations: translations };
});

const addToolApprovalResponse = jest.fn();

const steps: TraceStep[] = [
  { id: "step-1", status: "done", title: "Searched flights" },
  {
    approval: { approvalId: "approval-1", totalPrice: 1240 },
    detail: "Rome, 5 nights",
    id: "step-2",
    status: "waiting",
    title: "Book the trip",
  },
];

const renderTrace = (traceSteps: TraceStep[] = steps): void => {
  render(
    <Trace
      addToolApprovalResponse={addToolApprovalResponse as never}
      {...{ traceSteps }}
    />
  );
};

const getStepContent = (title: string): HTMLElement =>
  screen.getByText(title).closest("div")?.parentElement as HTMLElement;

describe("Trace", () => {
  beforeEach((): void => {
    addToolApprovalResponse.mockClear();
  });

  it("renders a heading and every step", () => {
    renderTrace();

    expect(screen.getByText("Trace.heading")).toBeInTheDocument();
    expect(screen.getByText("Searched flights")).toBeInTheDocument();
    expect(screen.getByText("Book the trip")).toBeInTheDocument();
    expect(screen.getByText("Trace.done")).toBeInTheDocument();
    expect(screen.getByText("Trace.waiting")).toBeInTheDocument();
  });

  it("renders the step detail when it is provided", () => {
    renderTrace();

    expect(screen.getByText("Rome, 5 nights")).toBeInTheDocument();
  });

  it("asks for approval with the total price on a priced step", () => {
    renderTrace();

    expect(screen.getByText("Approval.text({\"totalPrice\":1240})")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approval.buttonApprove" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approval.buttonReject" })).toBeInTheDocument();
  });

  it("falls back to the search wording when the step carries no price", () => {
    renderTrace([
      { approval: { approvalId: "approval-2" }, id: "step-1", status: "waiting", title: "Search" },
    ]);

    expect(screen.getByText("Approval.textSearch")).toBeInTheDocument();
  });

  it("renders no approval controls for steps that need no approval", () => {
    renderTrace([{ id: "step-1", status: "active", title: "Searching flights" }]);

    expect(screen.queryByRole("button", { name: "Approval.buttonApprove" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Approval.buttonReject" })).not.toBeInTheDocument();
  });

  it("approves with the approval id taken from the button value", () => {
    renderTrace();
    fireEvent.click(screen.getByRole("button", { name: "Approval.buttonApprove" }));

    expect(addToolApprovalResponse).toHaveBeenCalledWith({
      approved: true,
      id: "approval-1",
    });
  });

  it("rejects with the approval id taken from the button value", () => {
    renderTrace();
    fireEvent.click(screen.getByRole("button", { name: "Approval.buttonReject" }));

    expect(addToolApprovalResponse).toHaveBeenCalledWith({
      approved: false,
      id: "approval-1",
    });
  });

  it("keeps each approval wired to its own step", () => {
    renderTrace([
      { approval: { approvalId: "approval-a" }, id: "step-a", status: "waiting", title: "A" },
      { approval: { approvalId: "approval-b" }, id: "step-b", status: "waiting", title: "B" },
    ]);

    expect(getStepContent("A")).not.toBe(getStepContent("B"));

    const rejectButton = screen.getAllByRole("button", { name: "Approval.buttonReject" })[1];

    expect(rejectButton).toBeDefined();
    fireEvent.click(rejectButton as HTMLElement);

    expect(addToolApprovalResponse).toHaveBeenCalledWith({
      approved: false,
      id: "approval-b",
    });
  });
});
