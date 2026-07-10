"use client";
import React from "react";
import { useShallow } from "zustand/react/shallow";

import { agent } from "@/services";
import { useAgentStore, useLayoutStore } from "@/store";

import { Flight } from "./Flight";
import { Hotel } from "./Hotel";
import { Itinerary } from "./Itinerary";

import { wrapperClass, headerClass, hintClass, contentClass } from "./Results.css";

import type { TProps } from "./Results.types";

const Results: React.FC<TProps> = ({ children, placeholder }) => {
  const { activity, messages } = useAgentStore(
    useShallow(({ activity, messages }) => ({
      activity,
      messages,
    }))
  );
  const layoutView = useLayoutStore(({ view }) => view);
  const itinerary = agent.getOutput(messages, "tool-assembleItinerary");
  const flights = agent.getOutput(messages, "tool-searchFlights");
  const hotels = agent.getOutput(messages, "tool-searchHotels");

  const renderFlight = (): null | React.ReactElement => {
    if (!flights) return null;
    const [recommendedFlight] = flights.output;

    if (recommendedFlight) {
      return (
        <Flight
          {...recommendedFlight}
          flightsTotal={flights.output.length}
        />
      );
    }

    return null;
  };

  const renderItinerary = (): null | React.ReactElement => {
    if (!itinerary) return null;
    const itineraryDays: TItineraryDay[] = itinerary.output;

    if (itineraryDays && !!itineraryDays.length) {
      return <Itinerary days={itineraryDays} />;
    }

    return null;
  };

  const renderHotel = (): null | React.ReactElement => {
    if (!hotels) return null;
    const [recommendedHotel] = hotels.output;
    const nightsTotal: number = itinerary?.output.length ?? 0;

    if (recommendedHotel) {
      return (
        <Hotel
          {...recommendedHotel}
          {...{ nightsTotal }}
        />
      );
    }

    return null;
  };

  return (
    <div className={wrapperClass[layoutView]}>
      <div className={headerClass}>
        <p className={hintClass}>Output</p>
      </div>

      <div className={contentClass}>
        {flights || itinerary || hotels ? (
          <>
            {renderFlight()}
            {renderItinerary()}
            {renderHotel()}
          </>
        ) : (
          placeholder
        )}

        {activity === "trip-confirmed" && children}
      </div>
    </div>
  );
};

export { Results };
