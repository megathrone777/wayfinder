import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";

import { Route, type TRouteStop } from "../Route";

const stops: TRouteStop[] = [
  { label: "Lisbon", x: 300, y: 148 },
  { label: "Belém", x: 212, y: 190 },
  { label: "Cascais", labelDx: -56, labelDy: 20, x: 112, y: 202 },
  { label: "Sintra", x: 152, y: 86 },
];

const renderRoute = async (response: TRouteStop[] = stops): Promise<HTMLElement> => {
  jest
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(response)) as unknown as globalThis.Response);

  const { container } = render(await Route({}));

  return container;
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Route", () => {
  it("fetches the route stops from the mock endpoint", async () => {
    await renderRoute();
    expect(globalThis.fetch).toHaveBeenCalledWith(`${process.env.PUBLIC_URL}/mock/route.json`);
  });

  it("renders the caption and the plot", async () => {
    const container = await renderRoute();

    expect(container).toHaveTextContent(/locked/i);
    expect(container).toHaveTextContent(/4 stops/i);

    const plot = container.querySelector("svg")?.parentElement;

    expect(plot?.tagName).toBe("DIV");
    expect(plot?.childElementCount).toBe(1);
  });

  it("draws the closed route through every stop", async () => {
    const container = await renderRoute();

    expect(container.querySelector("svg path")?.getAttribute("d")).toBe(
      "M300 148 L212 190 L112 202 L152 86 Z"
    );
  });

  it("labels every stop", async () => {
    const container = await renderRoute();

    expect(
      [...container.querySelectorAll("svg text")].map(({ textContent }) => textContent)
    ).toEqual(["Lisbon", "Belém", "Cascais", "Sintra"]);
  });
});
