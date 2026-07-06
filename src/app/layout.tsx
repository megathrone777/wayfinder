import React from "react";

import { Header } from "@/components";
import { themeClass } from "@/theme";
import "@/theme/global";

import { fontJetBrainsMono, fontSpaceGrotesk } from "./fonts";

import { layoutClass } from "./layout.css";

const RootLayout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <html
    className={`${fontJetBrainsMono.variable} ${fontSpaceGrotesk.variable} ${themeClass}`}
    lang="en"
  >
    <body>
      <Header />
      <div className={layoutClass}>{children}</div>
    </body>
  </html>
);

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;
