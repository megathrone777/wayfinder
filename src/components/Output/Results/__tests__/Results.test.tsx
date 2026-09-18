import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";

import { getOutput as mockGetOutput } from "@/services/agent/utils/getOutput";
import { useAgentStore } from "@/store/agentStore/useAgentStore";
import { useLayoutStore } from "@/store/layoutStore/useLayoutStore";

import { Results } from "../Results";

// the `jest.mock` call is bare on purpose: the swc jest transform only hoists the global
// `jest` identifier above the imports, so importing `jest` from "@jest/globals" would
// register the mock after `Results` has already been required
jest.mock("@/services", () => ({ agent: { getOutput: mockGetOutput } }));

type ResizeCallback = () => void;

let resizeCallback: null | ResizeCallback = null;

class MockResizeObserver {
  constructor(callback: ResizeCallback) {
    resizeCallback = callback;
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

const flight: TFlight = {
  airline: { code: "TP", name: "TAP Air Portugal", region: "EU" },
  cityFrom: "Prague",
  cityTo: "Rome",
  price: { currency: "USD", total: 214 },
  schedule: { arrival: "10:05", departure: "07:20", duration: "2h 45m" },
};

const days: TItineraryDay[] = [
  { day: 1, stops: ["Colosseum", "Trastevere"], title: "Ancient Rome" },
];

const hotel: THotel = {
  amenities: ["wifi"],
  breakfastIncluded: true,
  city: "Rome",
  currency: "USD",
  distanceKm: 1.2,
  id: "hotel-1",
  name: "Hotel Trastevere",
  nightlyUsd: 120,
  rating: 4.6,
  refundable: true,
  reviews: 420,
  tags: ["central"],
  thumbnailUrl: "https://example.com/hotel-1.jpg",
  type: "Boutique",
  walkMinutes: 8,
};

const toolPart = (type: string, output: unknown): Record<string, unknown> => ({
  output,
  state: "output-available",
  type,
});

const setMessages = (parts: Record<string, unknown>[]): void =>
  useAgentStore.setState({
    messages: [
      {
        id: "assistant",
        parts,
        role: "assistant",
      } as unknown as TAgentUIMessage,
    ],
  });

const renderResults = (): HTMLElement =>
  render(<Results placeholder={<p>Nothing yet</p>}>{null}</Results>).container;

// the layout is resolved structurally - wrapper > header + scroll container, and the
// scroll container holds the single observed content node - so no class names are needed
const getScrollContainer = (container: HTMLElement): HTMLElement =>
  container.firstElementChild?.children[1] as HTMLElement;

const getContent = (container: HTMLElement): HTMLElement =>
  getScrollContainer(container).firstElementChild as HTMLElement;

const grow = (node: HTMLElement, scrollHeight: number, clientHeight: number): void => {
  Object.defineProperty(node, "scrollHeight", { configurable: true, value: scrollHeight });
  Object.defineProperty(node, "clientHeight", { configurable: true, value: clientHeight });
};

const agentInitial = useAgentStore.getState();
const layoutInitial = useLayoutStore.getState();

describe("Results", () => {
  beforeEach(() => {
    resizeCallback = null;
    global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
    useAgentStore.setState(agentInitial, true);
    useLayoutStore.setState(layoutInitial, true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the placeholder while no tool output is available", () => {
    renderResults();

    expect(screen.getByText("Nothing yet")).toBeInTheDocument();
    expect(screen.queryByText("Flight")).not.toBeInTheDocument();
  });

  it("renders the flight, itinerary and hotel blocks once the tools respond", () => {
    setMessages([
      toolPart("tool-searchFlights", [flight]),
      toolPart("tool-assembleItinerary", days),
      toolPart("tool-searchHotels", [hotel]),
    ]);
    renderResults();

    expect(screen.getByText("Flight")).toBeInTheDocument();
    expect(screen.getByText(/TAP Air Portugal/)).toBeInTheDocument();

    expect(screen.getByText("Itinerary")).toBeInTheDocument();
    expect(screen.getByText("Ancient Rome")).toBeInTheDocument();

    expect(screen.getByText("Stay")).toBeInTheDocument();
    expect(screen.getByText("Hotel Trastevere")).toBeInTheDocument();

    expect(screen.queryByText("Nothing yet")).not.toBeInTheDocument();
  });

  it("keeps every block inside the single observed content node", () => {
    setMessages([
      toolPart("tool-searchFlights", [flight]),
      toolPart("tool-assembleItinerary", days),
      toolPart("tool-searchHotels", [hotel]),
    ]);
    const container = renderResults();
    const content = getContent(container);

    expect(getScrollContainer(container).childElementCount).toBe(1);
    expect(content).toHaveTextContent("TAP Air Portugal");
    expect(content).toHaveTextContent("Ancient Rome");
    expect(content).toHaveTextContent("Hotel Trastevere");
  });

  it("keeps the placeholder inside the observed content node", () => {
    const container = renderResults();
    const content = getContent(container);

    expect(content).toHaveTextContent("Nothing yet");
    expect(getScrollContainer(container).childElementCount).toBe(1);
  });

  it("keeps the output pinned to the bottom while blocks keep arriving", () => {
    setMessages([toolPart("tool-searchFlights", [flight])]);
    const container = renderResults();
    const scroll = getScrollContainer(container);

    grow(scroll, 900, 500);
    resizeCallback?.();
    expect(scroll.scrollTop).toBe(900);

    grow(scroll, 1600, 500);
    resizeCallback?.();
    expect(scroll.scrollTop).toBe(1600);
  });

  it("stops pinning once the user scrolls away from the bottom", () => {
    setMessages([toolPart("tool-searchFlights", [flight])]);
    const container = renderResults();
    const scroll = getScrollContainer(container);

    grow(scroll, 900, 500);
    resizeCallback?.();

    scroll.scrollTop = 0;
    fireEvent.scroll(scroll);

    grow(scroll, 2000, 500);
    resizeCallback?.();
    expect(scroll.scrollTop).toBe(0);
  });
});
