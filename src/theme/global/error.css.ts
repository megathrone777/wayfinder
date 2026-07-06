import { globalStyle } from "@/theme";

globalStyle(".error", ({ devices }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  padding: "35px 10px",
  rowGap: 30,
  width: "100%",

  "@media": {
    [devices.desktopLg]: {
      marginInline: "auto",
      maxWidth: 1300,
      rowGap: 38,
    },

    [devices.desktopXl]: {
      maxWidth: 1400,
    },
  },
}));

globalStyle(".error__title", ({ devices }) => ({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: 1.2,
  textAlign: "center",

  "@media": {
    [devices.desktop]: {
      fontSize: 36,
    },

    [devices.desktopLg]: {
      fontSize: 42,
    },
  },
}));
