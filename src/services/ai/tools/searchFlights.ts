import { tool, type Tool } from "ai";
import { z } from "zod/v4";

interface TInput {
  cityFrom: string;
  cityTo: string;
}

type TOutput = TFlight & TInput;

const searchFlights: Tool<TInput, TOutput[]> = tool({
  description: "Search available flights between two cities",
  execute: async ({ cityFrom, cityTo }) => {
    const response = await fetch(process.env.FLIGHTS_API_URL);
    const data = (await response.json()) as TFlight[];

    return data.map((flight: TFlight): TOutput => ({ ...flight, cityFrom, cityTo }));
  },
  inputSchema: z.object({
    cityFrom: z.string().describe("Origin city or airport"),
    cityTo: z.string().describe("Destination city or airport"),
  }),
});

export { searchFlights };
