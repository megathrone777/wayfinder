import type { ToolApprovalStatus } from "ai";
import type { tools } from "../tools";

type TApprovalConfig = Partial<Record<keyof typeof tools, ToolApprovalStatus>>;

const getApproval = (autonomyMode: TAgentAutonomyMode): TApprovalConfig => {
  if (autonomyMode === "auto") return {};

  if (autonomyMode === "ask-before-booking") {
    return { bookTrip: "user-approval" };
  }

  return {
    bookTrip: "user-approval",
    searchFlights: "user-approval",
    searchHotels: "user-approval",
  };
};

export { getApproval };
