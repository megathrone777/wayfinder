declare global {
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

  type TLayoutView = "agent" | "output";
}

export {};
