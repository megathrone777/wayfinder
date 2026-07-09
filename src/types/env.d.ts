declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string;
      EMAIL_ADDRESS: string;
      EMAIL_APP_PASSWORD: string;
      EMAIL_SMTP_HOST: string;
      EMAIL_SMTP_PORT: string;
      FLIGHTS_API_URL: string;
      PUBLIC_URL: string;
    }
  }
}

export {};
