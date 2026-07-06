"use client";
import React, { useState } from "react";

import { Burger } from "@/ui";

import { layoutClass } from "./Menu.css";

import type { TProps } from "./Menu.types";

const Menu: React.FC<TProps> = ({ children }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleBurgerClick = (): void => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <Burger
        {...{ isOpened }}
        onClick={handleBurgerClick}
      />

      <div className={layoutClass[isOpened ? "isOpened" : "isClosed"]}>{children}</div>
    </>
  );
};

export { Menu };
