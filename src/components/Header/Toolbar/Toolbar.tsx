"use client";
import React from "react";

import { useAgentStore } from "@/store";
import { Spot } from "@/ui";

import type { TProps } from "./Toolbar.types";

const Toolbar: React.FC<TProps> = ({ children }) => {
  const activity = useAgentStore(({ activity }) => activity);

  return (
    <>
      {activity !== "idle" && <Spot {...{ activity }} />}
      {children}
    </>
  );
};

export { Toolbar };
