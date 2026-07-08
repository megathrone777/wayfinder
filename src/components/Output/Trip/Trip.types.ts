export interface TripSummary {
  costs: { flights: number; stay: number; total: number };
  days: { code: string; label: string }[];
  reference: string;
}
