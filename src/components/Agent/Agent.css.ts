import { style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  width: "100%",

  "@media": {
    [devices.tablet]: {
      flexBasis: 470,
      flexShrink: 0,
    },
  },
}));

export const contentClass = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
  width: "100%",
});
