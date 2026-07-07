import React from "react";

import {
  cardClass,
  cardHeadingClass,
  priceClass,
  rowClass,
  legClass,
  mutedClass,
} from "./Results.css";

import type { TFlightCardProps } from "./Results.types";

// The mock API returns ISO timestamps; fall back to the raw value if it is not
// a parseable date so nothing renders as "Invalid Date".
const formatTime = (value: string): string => {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const FlightCard: React.FC<TFlightCardProps> = ({ flights, from, to }) => {
  const [recommended] = flights;

  if (!recommended) return null;

  const { airline, price, schedule } = recommended;

  return (
    <div className={cardClass}>
      <div className={rowClass}>
        <p className={cardHeadingClass}>Flight</p>

        <p className={priceClass}>
          {price.currency} {price.total}
          <span className={mutedClass}> / person</span>
        </p>
      </div>

      <div className={rowClass}>
        <div className={legClass}>
          <p>{formatTime(schedule.departure)}</p>
          <p className={mutedClass}>{from}</p>
        </div>

        <p className={mutedClass}>{schedule.duration}</p>

        <div className={legClass}>
          <p>{formatTime(schedule.arrival)}</p>
          <p className={mutedClass}>{to}</p>
        </div>
      </div>

      <p className={mutedClass}>
        {airline.name} · recommended of {flights.length} options
      </p>
    </div>
  );
};

export { FlightCard };
