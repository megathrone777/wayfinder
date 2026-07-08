import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { Header } from "@/components";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fontJetBrainsMono, fontOnest } from "./fonts";

import { wrapperClass, layoutClass } from "./layout.css";

const RootLayout = async ({ children }: LayoutProps<"/">): Promise<React.ReactElement> => {
  const locale = await getLocale();

  return (
    <html
      className={`${fontJetBrainsMono.variable} ${fontOnest.variable} ${themeClass}`}
      lang={locale}
    >
      <body>
        <NextIntlClientProvider>
          <div className={wrapperClass}>
            <Header />
            <div className={layoutClass}>{children}</div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;
