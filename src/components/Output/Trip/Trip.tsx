import React from "react";

import { Button, Icon } from "@/ui";

import {
  wrapperClass,
  actionsClass,
  badgeClass,
  costsClass,
  dayCodeClass,
  dayLabelClass,
  dayClass,
  daysClass,
  footerClass,
  headerClass,
  referenceClass,
  titleClass,
  totalClass,
} from "./Trip.css";

import type { TripSummary } from "./Trip.types";

const Trip: React.FC = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/mock/trip.json`);
  const summary = (await response.json()) as TripSummary;

  if (summary && !!Object.keys(summary).length) {
    const { costs, days, reference } = summary;

    return (
      <div className={wrapperClass}>
        <div className={headerClass}>
          <p className={titleClass}>
            <span className={badgeClass}>
              <Icon id="checkmark" />
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
          <p className={costsClass}>
            Flights ${costs.flights} <strong>·</strong> Stay ${costs.stay.toLocaleString()}{" "}
            <strong>·</strong>{" "}
            <span className={totalClass}>Total ${costs.total.toLocaleString()}</span>
          </p>

          <div className={actionsClass}>
            <Button
              size="normal"
              template="tertiary"
            >
              Add to calendar
            </Button>

            <Button
              size="normal"
              template="secondary"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export { Trip };
