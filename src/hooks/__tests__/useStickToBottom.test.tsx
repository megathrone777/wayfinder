import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, renderHook } from "@testing-library/react";

import { useStickToBottom } from "../useStickToBottom";

type ResizeCallback = () => void;

let resizeCallback: null | ResizeCallback = null;
const observe = jest.fn();
const disconnect = jest.fn();

class MockResizeObserver {
  constructor(cb: ResizeCallback) {
    resizeCallback = cb;
  }

  observe = observe;
  disconnect = disconnect;
  unobserve = jest.fn();
}

const makeContainer = (
  scrollHeight: number,
  clientHeight: number,
  scrollTop = 0
): HTMLDivElement => {
  const node = document.createElement("div");

  Object.defineProperty(node, "scrollHeight", { configurable: true, value: scrollHeight });
  Object.defineProperty(node, "clientHeight", { configurable: true, value: clientHeight });
  node.scrollTop = scrollTop;

  return node;
};

describe("useStickToBottom", () => {
  beforeEach(() => {
    resizeCallback = null;
    observe.mockClear();
    disconnect.mockClear();
    global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns setContainer and setContent callbacks", () => {
    const { result } = renderHook(() => useStickToBottom());

    expect(typeof result.current.setContainer).toBe("function");
    expect(typeof result.current.setContent).toBe("function");
  });

  it("observes the content node and scrolls the container to the bottom", () => {
    const { result } = renderHook(() => useStickToBottom());
    const container = makeContainer(1000, 400);

    result.current.setContainer(container);
    result.current.setContent(document.createElement("div"));
    expect(observe).toHaveBeenCalledTimes(1);
    expect(container.scrollTop).toBe(1000);
  });

  it("keeps pinned to the bottom when content grows", () => {
    const { result } = renderHook(() => useStickToBottom());
    const container = makeContainer(500, 400);

    result.current.setContainer(container);
    result.current.setContent(document.createElement("div"));
    Object.defineProperty(container, "scrollHeight", { configurable: true, value: 1200 });
    resizeCallback?.();
    expect(container.scrollTop).toBe(1200);
  });

  it("stops auto-scrolling once the user scrolls away past the threshold", () => {
    const { result } = renderHook(() => useStickToBottom());
    const container = makeContainer(1000, 400, 0);

    result.current.setContainer(container);
    result.current.setContent(document.createElement("div"));
    container.scrollTop = 0;
    fireEvent.scroll(container);
    Object.defineProperty(container, "scrollHeight", { configurable: true, value: 2000 });
    resizeCallback?.();
    expect(container.scrollTop).toBe(0);
  });

  it("re-pins when the user scrolls back within the threshold", () => {
    const { result } = renderHook(() => useStickToBottom());
    const container = makeContainer(1000, 400, 590);

    result.current.setContainer(container);
    result.current.setContent(document.createElement("div"));
    container.scrollTop = 590;
    fireEvent.scroll(container);
    Object.defineProperty(container, "scrollHeight", { configurable: true, value: 1500 });
    resizeCallback?.();
    expect(container.scrollTop).toBe(1500);
  });

  it("disconnects the previous observer when content changes", () => {
    const { result } = renderHook(() => useStickToBottom());

    result.current.setContent(document.createElement("div"));
    result.current.setContent(document.createElement("div"));
    expect(disconnect).toHaveBeenCalled();
  });
});
