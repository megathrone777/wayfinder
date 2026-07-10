import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import { Icon } from "../Icon";

describe("Icon", () => {
  it("renders an svg with the id's viewBox", () => {
    const { container } = render(<Icon id="checkmark" />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("points the use element at the sprite for the given id", () => {
    const { container } = render(<Icon id="mail" />);

    expect(container.querySelector("use")).toHaveAttribute("href", "/sprite.svg#mailIcon");
  });

  it("applies a provided className", () => {
    const { container } = render(
      <Icon
        className="my-icon"
        id="close"
      />
    );

    expect(container.querySelector("svg")).toHaveClass("my-icon");
  });

  it("uses the correct viewBox for the exclamation icon", () => {
    const { container } = render(<Icon id="exclamation" />);

    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 128 512");
  });
});
