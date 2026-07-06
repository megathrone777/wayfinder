declare global {
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
