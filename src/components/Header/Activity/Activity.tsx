"use client";
import React from "react";

import { useAgentStore } from "@/store";
import { Spot } from "@/ui";

import { wrapperClass } from "./Activity.css";

const activityLabel: Record<TAgentActivity, string> = {
  booking: "Booking...",
  "building-itinerary": "Building itinerary...",
  idle: "Idle",
  "searching-flights": "Searching flights...",
  "searching-stays": "Searching stays...",
  "trip-confirmed": "Trip confirmed",
  "trip-rejected": "Booking declined",
  waiting: "Waiting for you",
};

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
