import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Logo } from "../Logo";

describe("Logo", () => {
  it("renders the Wayfinder wordmark", () => {
    render(<Logo />);
    expect(screen.getByText("Wayfinder")).toBeInTheDocument();
  });

  it("links to the home page in the header template", () => {
    render(<Logo template="header" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("does not render a link in the chat template", () => {
    render(<Logo template="chat" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Wayfinder")).toBeInTheDocument();
  });

  it("defaults to the header (linked) template", () => {
    render(<Logo />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
