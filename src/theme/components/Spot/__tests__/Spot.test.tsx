import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";

import { Spot } from "../Spot";

describe("Spot", () => {
  it("renders a div carrying the activity as a class", () => {
    const { container } = render(<Spot activity="searching-flights" />);
    const spot = container.firstChild as HTMLElement;

    expect(spot).toBeInTheDocument();
    expect(spot).toHaveClass("searching-flights");
  });

  it("reflects the idle activity", () => {
    const { container } = render(<Spot activity="idle" />);

    expect(container.firstChild).toHaveClass("idle");
  });

  it("reflects the trip-confirmed activity", () => {
    const { container } = render(<Spot activity="trip-confirmed" />);

    expect(container.firstChild).toHaveClass("trip-confirmed");
  });
});
