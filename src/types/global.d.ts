declare global {
  interface TActionResult {
    message: string;
    type: "error" | "success";
  }

  interface TBooking {
    clientEmail: string;
    currency: string;
    id: string;
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
}

export {};
