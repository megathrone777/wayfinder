import { style } from "@/theme";

export const wrapperClass = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const layoutClass = style(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",

  "@media": {
    [devices.desktop]: {
      flexDirection: "row",
    },
  },
}));
