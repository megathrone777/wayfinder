import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Placeholder } from "../Placeholder";

describe("Placeholder", () => {
  it("renders the empty-state heading", () => {
    render(<Placeholder />);
    expect(screen.getByRole("heading", { name: /itinerary assembles here/i })).toBeInTheDocument();
  });

  it("renders the explanatory copy", () => {
    render(<Placeholder />);
    expect(screen.getByText(/render live as the agent works/i)).toBeInTheDocument();
  });
});
