import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "../Button";

describe("Button", () => {
  it("renders a button element by default", () => {
    render(<Button>Book</Button>);

    const button = screen.getByRole("button", { name: "Book" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders a link when an href is provided", () => {
    render(<Button href="/">Trips</Button>);

    const link = screen.getByRole("link", { name: "Trips" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });

  it("renders an icon when iconId is provided", () => {
    const { container } = render(<Button iconId="mail">Email</Button>);

    expect(container.querySelector("use")).toHaveAttribute("href", "/sprite.svg#mailIcon");
  });

  it("passes through type and value on the native button", () => {
    render(
      <Button
        type="submit"
        value="output"
      >
        Submit
      </Button>
    );

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toHaveAttribute?.("type", "submit");
    expect(button).toHaveAttribute("value", "output");
  });
});
