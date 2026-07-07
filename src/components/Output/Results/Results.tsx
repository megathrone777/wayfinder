"use client";
import React from "react";

import { useAgentStore } from "@/store";

import { FlightCard } from "./FlightCard";
import { StayCard } from "./StayCard";

import { wrapperClass } from "./Results.css";

type TPart = TAgentUIMessage["parts"][number];

const collectParts = (messages: TAgentUIMessage[]): TPart[] =>
  messages.filter(({ role }) => role === "assistant").flatMap(({ parts }) => parts);

const findOutput = <T extends TPart["type"]>(
  parts: TPart[],
  type: T
): Extract<TPart, { state: "output-available"; type: T }> | undefined =>
  [...parts]
    .reverse()
    .find(
      (part): part is Extract<TPart, { state: "output-available"; type: T }> =>
        part.type === type && "state" in part && part.state === "output-available"
    );

const Results: React.FC = () => {
  const messages = useAgentStore(({ messages }) => messages);
  const parts = collectParts(messages);
  const flights = findOutput(parts, "tool-searchFlights");
  const hotels = findOutput(parts, "tool-searchHotels");

  if (!flights && !hotels) return null;

  return (
    <div className={wrapperClass}>
      {flights && (
        <FlightCard
          flights={flights.output}
          from={flights.input.cityFrom}
          to={flights.input.cityTo}
        />
      )}

      {hotels && <StayCard hotels={hotels.output} />}
    </div>
  );
};

export { Results };
