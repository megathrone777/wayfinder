import React from "react";

import { Header } from "@/components";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fontJetBrainsMono, fontSpaceGrotesk } from "./fonts";

import { wrapperClass, layoutClass } from "./layout.css";

const RootLayout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <html
    className={`${fontJetBrainsMono.variable} ${fontSpaceGrotesk.variable} ${themeClass}`}
    lang="en"
  >
    <body>
      <div className={wrapperClass}>
        <Header />
        <div className={layoutClass}>{children}</div>
      </div>
    </body>
  </html>
);

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;
