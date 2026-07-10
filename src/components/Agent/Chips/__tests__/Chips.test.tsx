import { beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { Chips } from "../Chips";

jest.mock("next-intl", () => {
  const t = Object.assign((key: string): string => (key === "hint" ? "Try one of these" : key), {
    raw: (key: string): unknown =>
      key === "chips"
        ? [
            { label: "Weekend in Rome", prompt: "Plan a weekend in Rome" },
            { label: "Beach week", prompt: "Plan a beach week" },
          ]
        : key,
  });

  return { useTranslations: (): typeof t => t };
});

describe("Chips", (): void => {
  const sendMessage = jest.fn();

  beforeEach((): void => {
    sendMessage.mockClear();
  });

  it("renders the hint text", () => {
    render(<Chips sendMessage={sendMessage as never} />);
    expect(screen.getByText("Try one of these")).toBeInTheDocument();
  });

  it("renders a button for every chip", () => {
    render(<Chips sendMessage={sendMessage as never} />);
    expect(screen.getByRole("button", { name: "Weekend in Rome" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beach week" })).toBeInTheDocument();
  });

  it("sends the chip prompt with the appended instruction on click", () => {
    render(<Chips sendMessage={sendMessage as never} />);
    fireEvent.click(screen.getByRole("button", { name: "Weekend in Rome" }));
    expect(sendMessage).toHaveBeenCalledTimes(1);
    const arg = sendMessage.mock.calls[0][0] as { text: string };

    expect(arg.text).toContain("Plan a weekend in Rome");
    expect(arg.text).toContain("assume sensible defaults");
  });
});
