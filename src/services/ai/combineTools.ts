import { bookTrip, searchFlights, searchHotels } from "./tools";

const combineTools = (autonomyMode: TAgentAutonomyMode) => {
  const needsConfirm = (isBooking: boolean) => {
    if (autonomyMode === "ask-always") return true;
    if (autonomyMode === "ask-before-booking") return isBooking;

    return false;
  };

  return {
    bookTrip,
    searchFlights,
    searchHotels,
  };
};

export { combineTools };
