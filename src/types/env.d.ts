declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_SMTP_ADDRESS: string;
      EMAIL_SMTP_HOST: string;
      EMAIL_SMTP_PASSWORD: string;
      EMAIL_SMTP_PORT: string;
      GEMINI_API_KEY: string;
      GEMINI_MODEL: string;
      PUBLIC_URL: string;
    }
  }
}

export {};
