import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { Burger } from "../Burger";

describe("Burger", () => {
  it("renders a button with three lines", () => {
    const { container } = render(<Burger isOpened={false} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();

    render(
      <Burger
        isOpened={false}
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies a provided className", () => {
    render(
      <Burger
        className="extra-class"
        isOpened={false}
      />
    );

    expect(screen.getByRole("button").className).toContain("extra-class");
  });

  it("has a button type of button", () => {
    render(<Burger isOpened />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
