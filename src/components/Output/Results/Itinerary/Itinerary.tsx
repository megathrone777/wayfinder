import React from "react";

import { Box } from "@/ui";

import {
  badgeClass,
  badgeLabelClass,
  badgeNumberClass,
  bodyClass,
  captionClass,
  dayClass,
  listClass,
  stopsClass,
  titleClass,
} from "./Itinerary.css";

import type { TProps } from "./Itinerary.types";

const Itinerary: React.FC<TProps> = ({ caption, days }) => (
  <Box
    header={<p className={captionClass}>{caption ?? `${days.length} days · balanced pacing`}</p>}
    title="Itinerary"
  >
    <div className={listClass}>
      {days.map<React.ReactElement>(({ day, stops, title }: TItineraryDay) => (
        <div
          className={dayClass}
          key={`itinerary-day-${day}`}
        >
          <span className={badgeClass}>
            <span className={badgeLabelClass}>DAY</span>
            <span className={badgeNumberClass}>{day}</span>
          </span>

          <span className={bodyClass}>
            <span className={titleClass}>{title}</span>
            <span className={stopsClass}>{stops.join(" · ")}</span>
          </span>
        </div>
      ))}
    </div>
  </Box>
);

export { Itinerary };
