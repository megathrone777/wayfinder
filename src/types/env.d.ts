declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string;
      EMAIL_ADDRESS: string;
      EMAIL_APP_PASSWORD: string;
      FLIGHTS_API_URL: string;
      PUBLIC_URL: string;
    }
  }
}

export {};
