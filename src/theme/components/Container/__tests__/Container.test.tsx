import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Container } from "../Container";

describe("Container", () => {
  it("renders its children", () => {
    render(
      <Container>
        <span>content</span>
      </Container>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("wraps children in a single div", () => {
    const { container } = render(
      <Container>
        <span>a</span>
      </Container>
    );

    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});
