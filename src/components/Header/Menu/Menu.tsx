"use client";
import React, { useRef, useState } from "react";

import { useClickOutside } from "@/hooks";
import { useAgentStore } from "@/store";
import { Burger, Spot } from "@/ui";

import { wrapperClass, layoutClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activity = useAgentStore(({ activity }) => activity);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleBurgerClick = (): void => {
    setIsOpened(!isOpened);
  };

  useClickOutside(wrapperRef, (): void => {
    setIsOpened(false);
  });

  return (
    <div
      className={wrapperClass}
      ref={wrapperRef}
    >
      <Spot {...{ activity }} />

      <Burger
        {...{ isOpened }}
        onClick={handleBurgerClick}
      />

      <div className={layoutClass[isOpened ? "isOpened" : "isClosed"]}>{children}</div>
    </div>
  );
};

export { Menu };
