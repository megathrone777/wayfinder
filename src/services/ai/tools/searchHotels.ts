import { tool, type Tool } from "ai";
import { z } from "zod/v4";

interface TInput {
  city: string;
}

type TOutput = THotel[];

const searchHotels: Tool<TInput, TOutput> = tool({
  description: "Search hotels in a city within a budget band",
  execute: async ({ city }) => {
    const response = await fetch("/data/hotels.json");
    const hotels = (await response.json()) as THotel[];

    return [...hotels.map<THotel>((hotel: THotel) => ({ ...hotel, city }))];
  },
  inputSchema: z.object({
    city: z.string(),
  }),
});

export { searchHotels };
