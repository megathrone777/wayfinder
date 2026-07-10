import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });
const cssMock: string = "<rootDir>/jest.cssMock.ts";

const config: Config = {
  detectOpenHandles: true,
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/ui$": "<rootDir>/src/theme/components/index.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(uncrypto|@upstash/realtime|@upstash/redis|next-intl|use-intl)/)",
  ],
};

const mock = async (): Promise<Config> => {
  const finalConfig = await createJestConfig(config)();

  finalConfig.moduleNameMapper = {
    "\\.css\\.ts$": cssMock,
    "\\.css$": cssMock,
    ...finalConfig.moduleNameMapper,
  };

  return finalConfig;
};

export default mock;
