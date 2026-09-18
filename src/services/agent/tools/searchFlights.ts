import { tool } from "ai";
import { z } from "zod/v4";

type TFlightPoolOption = Pick<TFlight, "airline" | "price" | "schedule">;

const flightsLimit: number = 4;

const searchFlights = tool({
  description:
    "Search available flights between two cities. Returns a random selection of options from the flight pool.",

  execute: async ({ cityFrom, cityTo }): Promise<TFlight[]> => {
    const response = await fetch(`${process.env.PUBLIC_URL}/mock/flights.json`);
    const pool = (await response.json()) as TFlightPoolOption[];
    const count = Math.min(flightsLimit, pool.length);
    const selection = [...pool].sort((): number => Math.random() - 0.5).slice(0, count);

    return selection.map<TFlight>(
      ({ airline, price, schedule }: TFlightPoolOption): TFlight => ({
        airline,
        cityFrom,
        cityTo,
        price,
        schedule,
      })
    );
  },

  inputSchema: z.object({
    cityFrom: z.string().describe("Origin city or airport"),
    cityTo: z.string().describe("Destination city or airport"),
  }),
});

export { searchFlights };
