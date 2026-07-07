import { tool } from "ai";
import { z } from "zod/v4";

const searchHotels = tool({
  description: "Search hotels in a city within a budget band",

  execute: async ({ city }) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/hotels.json`);
    const hotels = (await response.json()) as THotel[];

    return hotels.map<THotel>((hotel: THotel): THotel => ({ ...hotel, city }));
  },

  inputSchema: z.object({
    city: z.string(),
  }),
});

export { searchHotels };
