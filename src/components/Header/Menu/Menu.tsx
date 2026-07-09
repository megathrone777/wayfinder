"use client";
import React, { useRef, useState } from "react";

import { useClickOutside } from "@/hooks";
import { Burger } from "@/ui";

import { wrapperClass, burgerClass, layoutClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
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
      <Burger
        {...{ isOpened }}
        className={burgerClass}
        onClick={handleBurgerClick}
      />

      <div className={layoutClass[isOpened ? "isOpened" : "isClosed"]}>{children}</div>
    </div>
  );
};

export { Menu };
