import { style } from "@/theme";

export const activityClass = style(({ devices }) => ({
  display: "inline-flex",

  "@media": {
    [devices.desktop]: {
      display: "none",
    },
  },
}));
