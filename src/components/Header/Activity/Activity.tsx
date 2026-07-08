"use client";
import React from "react";
import { useTranslations } from "next-intl";

import { useAgentStore } from "@/store";
import { Spot } from "@/ui";

import { wrapperClass } from "./Activity.css";

const Activity: React.FC = () => {
  const activity = useAgentStore(({ activity }) => activity);
  const t = useTranslations("Activity");

  return (
    <div className={`${wrapperClass} ${activity}`}>
      <Spot {...{ activity }} />
      <span>{t(activity)}</span>
    </div>
  );
};

export { Activity };
