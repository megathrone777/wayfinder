import { style } from "@/theme";

export const layoutClass = style(({ devices }) => ({
  "@media": {
    [devices.tablet]: {
      display: "flex",
    },
  },
}));
