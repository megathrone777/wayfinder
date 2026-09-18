declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_ADDRESS: string;
      EMAIL_APP_PASSWORD: string;
      EMAIL_SMTP_HOST: string;
      EMAIL_SMTP_PORT: string;
      GEMINI_API_KEY: string;
      GEMINI_MODEL: string;
      PUBLIC_URL: string;
    }
  }
}

export {};
