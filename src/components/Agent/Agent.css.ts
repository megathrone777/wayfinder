import { style } from "@/theme";

export const wrapperClass = style(({ colors, devices }) => ({
  backgroundColor: colors.blackDarker,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",

  "@media": {
    [devices.tablet]: {
      flexBasis: 470,
      flexShrink: 0,
    },
  },
}));

export const layoutClass = style({
  flexGrow: 1,
  overflow: "hidden",
  width: "100%",
});

export const contentClass = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  paddingTop: 24,
});
