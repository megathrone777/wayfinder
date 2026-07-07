import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  display: "none",

  "@media": {
    [devices.tablet]: {
      display: "block",
      flexGrow: 1,
    },
  },
}));
