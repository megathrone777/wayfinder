import type React from "react";

export interface TProps {
  children: React.ReactNode;
}

export interface TFlightCardProps {
  flights: TFlight[];
  from: string;
  to: string;
}

export interface TStayCardProps {
  hotels: THotel[];
}
