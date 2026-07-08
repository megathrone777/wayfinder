"use client";
import React from "react";

import { agent } from "@/services";
import { useAgentStore, useLayoutStore } from "@/store";

import { Flight } from "./Flight";
import { Itinerary } from "./Itinerary";

import { wrapperClass } from "./Results.css";

import type { TProps } from "./Results.types";

const Results: React.FC<TProps> = ({ children }) => {
  const messages = useAgentStore(({ messages }) => messages);
  const layoutView = useLayoutStore(({ view }) => view);
  const itinerary = agent.getOutput(messages, "tool-assembleItinerary");
  const flights = agent.getOutput(messages, "tool-searchFlights");
  // const hotels = findOutput(parts, "tool-searchHotels");

  // if (!itinerary && !flights && !hotels) return null;
  if (!itinerary) return null;
  if (!flights) return null;
  const [recommendedFlight] = flights.output;

  return (
    <div className={wrapperClass[layoutView]}>
      {recommendedFlight && (
        <Flight
          {...recommendedFlight}
          flightsTotal={flights.output.length}
        />
      )}

      {itinerary && <Itinerary days={itinerary.output} />}

      {/* {hotels && <StayCard hotels={hotels.output} />} */}
      {children}
    </div>
  );
};

export { Results };
