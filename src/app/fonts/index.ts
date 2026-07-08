import localFont from "next/font/local";

const fontOnest = localFont({
  display: "block",
  src: [
    {
      path: "./Onest-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./Onest-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./Onest-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-onest",
});

const fontJetBrainsMono = localFont({
  display: "block",
  src: [
    {
      path: "./JetBrainsMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-jetbrains-mono",
});

export { fontJetBrainsMono, fontOnest };
