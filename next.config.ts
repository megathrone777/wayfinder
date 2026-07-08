import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: {
    mode: "auto",
  },
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
});

const config: NextConfig = {
  allowedDevOrigins: ["192.168.0.227", "192.168.0.154"],
  images: {
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
  },
  outputFileTracingIncludes: {
    "**/*": ["./src/services/mailer/template/**/*.pug"],
  },
  reactStrictMode: false,
  redirects: () => [
    {
      destination: "https://:domain/:path*",
      has: [{ type: "host", value: "www\\.(?<domain>.+)" }],
      permanent: true,
      source: "/:path*",
    },
  ],
  serverExternalPackages: ["pug", "nodemailer"],
  typedRoutes: true,
};

export default withNextIntl(withVanillaExtract(config));
