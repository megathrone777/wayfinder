import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Form } from "../Form";

// the swc jest transform only hoists the global `jest` identifier, so every mock has to
// be a bare `jest.mock` call and its factory has to be self-contained
jest.mock("next-intl", () => {
  const t = (key: string): string =>
    ({
      hint: "Press Enter to send",
      placeholder: "Where would you like to go?",
      planTrip: "Plan trip",
    })[key] ?? key;

  return { useTranslations: (): typeof t => t };
});

const sendMessage = jest.fn();

const renderForm = (isRunning: boolean = false): HTMLTextAreaElement => {
  render(
    <Form
      isRunning={isRunning}
      sendMessage={sendMessage as never}
    />
  );

  return screen.getByPlaceholderText("Where would you like to go?") as HTMLTextAreaElement;
};

const getForm = (textarea: HTMLTextAreaElement): HTMLFormElement => {
  const { form } = textarea;

  if (!form) throw new Error("expected the textarea to be wrapped in a form");

  return form;
};

describe("Form", () => {
  beforeEach((): void => {
    sendMessage.mockClear();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it("ignores an empty submit", () => {
    const textarea = renderForm();

    fireEvent.submit(getForm(textarea));
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("ignores a whitespace-only submit", () => {
    const textarea = renderForm();

    fireEvent.change(textarea, { target: { value: "   " } });
    fireEvent.submit(getForm(textarea));
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("sends the trimmed message and clears the textarea", async () => {
    const textarea = renderForm();

    fireEvent.change(textarea, { target: { value: "  Plan a week in Rome  " } });
    fireEvent.submit(getForm(textarea));

    await waitFor((): void => expect(sendMessage).toHaveBeenCalledTimes(1));

    const [payload] = sendMessage.mock.calls[0] as [{ text: string }];

    expect(payload.text).toBe("Plan a week in Rome");
    expect(textarea.value).toBe("");
  });

  it("sends the message when Enter is pressed", async () => {
    const textarea = renderForm();

    fireEvent.change(textarea, { target: { value: "Rome in May" } });
    fireEvent.keyDown(textarea, { key: "Enter" });

    await waitFor((): void => expect(sendMessage).toHaveBeenCalledTimes(1));

    const [payload] = sendMessage.mock.calls[0] as [{ text: string }];

    expect(payload.text).toBe("Rome in May");
    expect(textarea.value).toBe("");
  });

  it("sends the message when NumpadEnter is pressed", async () => {
    const textarea = renderForm();

    fireEvent.change(textarea, { target: { value: "Kyoto in April" } });
    fireEvent.keyDown(textarea, { key: "NumpadEnter" });

    await waitFor((): void => expect(sendMessage).toHaveBeenCalledTimes(1));
  });

  it("leaves Shift+Enter alone so it can insert a newline", () => {
    const textarea = renderForm();

    fireEvent.change(textarea, { target: { value: "Rome" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(sendMessage).not.toHaveBeenCalled();
    expect(textarea.value).toBe("Rome");
  });

  it("disables the input and the submit button while the agent is running", () => {
    const textarea = renderForm(true);

    expect(textarea).toBeDisabled();
    expect(screen.getByRole("button", { name: "Plan trip" })).toBeDisabled();
  });

  it("keeps the input and the submit button available while idle", () => {
    const textarea = renderForm();

    expect(textarea).toBeEnabled();
    expect(screen.getByRole("button", { name: "Plan trip" })).toBeEnabled();
  });
});