import React from "react";

import { Box } from "@/ui";

import {
  airlineClass,
  cityClass,
  colClass,
  connectorClass,
  contentClass,
  durationClass,
  priceClass,
  priceValueClass,
  rowClass,
} from "./Flight.css";

import type { TProps } from "./Flight.types";

const formatTime = (value: string): string => {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Flight: React.FC<TProps> = ({ airline, cityFrom, cityTo, flightsTotal, price, schedule }) => (
  <Box
    footer={
      <p className={airlineClass}>
        {airline.name} <strong>·</strong> recommended of {flightsTotal} options
      </p>
    }
    header={
      <p className={priceClass}>
        <span className={priceValueClass}>${price.total}</span>
        <span> / person</span>
      </p>
    }
    title="Flight"
  >
    <div className={contentClass}>
      <div className={rowClass}>
        <div>
          <p>{formatTime(schedule.departure)}</p>
          <p className={cityClass}>{cityFrom}</p>
        </div>

        <div className={colClass}>
          <div className={connectorClass} />
          <p className={durationClass}>{schedule.duration}</p>
          <div className={connectorClass} />
        </div>

        <div>
          <p>{formatTime(schedule.departure)}</p>
          <p className={cityClass}>{cityTo}</p>
        </div>
      </div>
    </div>
  </Box>
);

export { Flight };
