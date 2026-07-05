declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOB_READ_WRITE_TOKEN: string;

      PUBLIC_URL: string;
    }
  }
}

export {};
