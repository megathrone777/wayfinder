import type { Metadata } from "next";

const description: string = "Mission control for an AI travel agent.";
const imageUrl: string = "/images/og_img.png";
const publicUrl: string = process.env.PUBLIC_URL;
const title: string = "Wayfinder";

const metadata: Metadata = {
  description,
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
      url: "/favicon-96x96.png",
    },
  ],
  metadataBase: new URL(publicUrl),
  openGraph: {
    description,
    images: `${publicUrl}${imageUrl}`,
    siteName: title,
    title,
    type: "website",
    url: publicUrl,
  },
  title,
  twitter: {
    card: "summary_large_image",
    description,
    images: imageUrl,
  },
};

export { metadata };
