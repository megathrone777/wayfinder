"use client";
import React from "react";

import { useAgentStore } from "@/store";
import { Spot } from "@/ui";

import { activityClass } from "./Toolbar.css";

import type { TProps } from "./Toolbar.types";

const Toolbar: React.FC<TProps> = ({ children }) => {
  const activity = useAgentStore(({ activity }) => activity);

  return (
    <>
      {activity !== "idle" && (
        <div className={activityClass}>
          <Spot {...{ activity }} />
        </div>
      )}

      {children}
    </>
  );
};

export { Toolbar };
