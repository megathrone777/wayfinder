import React from "react";

import { useAgentStore } from "@/store";

import { FlightCard } from "./FlightCard";
import { StayCard } from "./StayCard";

import { wrapperClass } from "./Results.css";

const collectParts = (messages: TAgentUIMessage[]): TAgentPart[] =>
  messages.filter(({ role }) => role === "assistant").flatMap(({ parts }) => parts);

const findOutput = <T extends TAgentPart["type"]>(
  parts: TAgentPart[],
  type: T
): Extract<TAgentPart, { state: "output-available"; type: T }> | undefined =>
  [...parts]
    .reverse()
    .find(
      (part): part is Extract<TAgentPart, { state: "output-available"; type: T }> =>
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
