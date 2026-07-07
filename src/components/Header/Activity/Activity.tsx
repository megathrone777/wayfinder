"use client";
import React from "react";

import { activityLabel } from "@/services";
import { useAgentStore } from "@/store";
import { Spot } from "@/ui";

import { wrapperClass } from "./Activity.css";

const Activity: React.FC = () => {
  const activity = useAgentStore(({ activity }) => activity);

  return (
    <div className={`${wrapperClass} ${activity}`}>
      <Spot {...{ activity }} />
      <span>{activityLabel[activity]}</span>
    </div>
  );
};

export { Activity };
