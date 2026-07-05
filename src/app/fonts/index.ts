import localFont from "next/font/local";

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

const fontSpaceGrotesk = localFont({
  display: "block",
  src: [
    {
      path: "./SpaceGrotesk-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./SpaceGrotesk-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./SpaceGrotesk-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-space-grotesk",
});

export { fontJetBrainsMono, fontSpaceGrotesk };
