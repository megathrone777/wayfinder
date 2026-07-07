"use client";
import { useCallback, useRef } from "react";

const threshold = 80;

interface TStickToBottom {
  setContainer: (node: HTMLDivElement | null) => void;
  setContent: (node: HTMLDivElement | null) => void;
}

const useStickToBottom = (): TStickToBottom => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<null | ResizeObserver>(null);
  const pinnedRef = useRef<boolean>(true);

  const scrollToBottom = useCallback((): void => {
    const container = containerRef.current;

    if (container && pinnedRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback((): void => {
    const container = containerRef.current;

    if (!container) return;
    const distance = container.scrollHeight - container.scrollTop - container.clientHeight;

    pinnedRef.current = distance <= threshold;
  }, []);

  const setContainer = useCallback(
    (node: HTMLDivElement | null): void => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
      containerRef.current = node;
      node?.addEventListener("scroll", handleScroll, { passive: true });
    },
    [handleScroll]
  );

  const setContent = useCallback(
    (node: HTMLDivElement | null): void => {
      observerRef.current?.disconnect();

      if (!node) return;

      observerRef.current = new ResizeObserver(scrollToBottom);
      observerRef.current.observe(node);
      scrollToBottom();
    },
    [scrollToBottom]
  );

  return { setContainer, setContent };
};

export { useStickToBottom };
