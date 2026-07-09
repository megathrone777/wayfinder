declare global {
  type TLayoutView = "agent" | "output";

  interface TActionResult {
    message: string;
    type: "error" | "success";
  }

  interface TBooking {
    bookedAt: string;
    clientEmail?: string;
    confirmed: boolean;
    currency?: string;
    itinerarySummary: string;
    totalPrice: number;
  }

  interface TCompany {
    email: string;
    phone: string;
    webAddress: string;
  }

  interface TFlight {
    airline: {
      code: string;
      name: string;
      region: string;
    };
    cityFrom: string;
    cityTo: string;
    price: {
      currency: string;
      total: number;
    };
    schedule: {
      arrival: string;
      departure: string;
      duration: string;
    };
  }

  interface TItineraryDay {
    day: number;
    stops: string[];
    title: string;
  }

  interface THotel {
    amenities: string[];
    breakfastIncluded: boolean;
    city: string;
    currency: string;
    distanceKm: number;
    id: string;
    name: string;
    nightlyUsd: number;
    rating: number;
    refundable: boolean;
    reviews: number;
    tags: string[];
    thumbnailUrl: string;
    type: string;
    walkMinutes: number;
  }
}

export {};
