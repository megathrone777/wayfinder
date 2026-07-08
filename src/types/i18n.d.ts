import type messages from "@/dictionaries/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}

export {};
