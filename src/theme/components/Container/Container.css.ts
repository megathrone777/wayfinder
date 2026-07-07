import { style } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  height: "100%",
  paddingInline: 16,
  width: "100%",

  "@media": {
    [devices.tablet]: {
      paddingInline: 20,
    },
  },
}));
