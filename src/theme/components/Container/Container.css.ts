import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  height: "100%",
  paddingInline: 12,
  width: "100%",

  "@media": {
    [devices.desktopLg]: {
      marginInline: "auto",
      maxWidth: 1300,
    },

    [devices.desktopXl]: {
      maxWidth: 1400,
    },
  },
}));
