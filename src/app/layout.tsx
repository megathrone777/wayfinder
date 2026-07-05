import React from "react";

import { themeClass } from "@/theme";
import "@/theme/global";

import { fontJetBrainsMono, fontSpaceGrotesk } from "./fonts";

const RootLayout: React.FC<LayoutProps<"/">> = ({ children }) => (
  <html
    className={`${fontJetBrainsMono.variable} ${fontSpaceGrotesk.variable} ${themeClass}`}
    lang="en"
  >
    <body>{children}</body>
  </html>
);

export { metadata } from "./metadata";
export { viewport } from "./viewport";
export default RootLayout;
