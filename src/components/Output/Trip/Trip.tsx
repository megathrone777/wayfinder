import React from "react";

import { Icon } from "@/ui";

import { Actions } from "./Actions";

import {
  wrapperClass,
  badgeClass,
  dayCodeClass,
  dayLabelClass,
  dayClass,
  daysClass,
  footerClass,
  headerClass,
  iconClass,
  referenceClass,
  titleClass,
} from "./Trip.css";

import type { TripSummary } from "./Trip.types";

const Trip: React.FC = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/mock/trip.json`);
  const summary = (await response.json()) as TripSummary;

  if (summary && !!Object.keys(summary).length) {
    const { days, reference } = summary;

    return (
      <div className={wrapperClass}>
        <div className={headerClass}>
          <p className={titleClass}>
            <span className={badgeClass}>
              <Icon
                className={iconClass}
                id="checkmark"
              />
            </span>

            <span>Trip confirmed</span>
          </p>

          <p className={referenceClass}>{reference}</p>
        </div>

        <div className={daysClass}>
          {days.map<React.ReactElement>(({ code, label }) => (
            <span
              className={dayClass}
              key={`trip-day-${code}`}
            >
              <span className={dayCodeClass}>{code}</span>
              <span className={dayLabelClass}>{label}</span>
            </span>
          ))}
        </div>

        <div className={footerClass}>
          <Actions />
        </div>
      </div>
    );
  }

  return null;
};

export { Trip };
