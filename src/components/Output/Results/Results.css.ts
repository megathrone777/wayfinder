import { calc } from "@vanilla-extract/css-utils";

import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
  ({ devices }) => ({
    agent: {
      display: "none",

      "@media": {
        [devices.desktop]: {
          display: "flex",
        },
      },
    },

    output: {
      display: "flex",
    },
  }),

  (view, { colors, devices }) => [
    {
      backgroundColor: colors.black,
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      width: "100%",

      "@media": {
        [devices.desktop]: {
          borderLeft: `1px solid ${rgba("255, 255, 255", 0.12)}`,
        },
      },
    },

    view,
  ]
);

export const headerClass = style(({ devices }) => ({
  borderBlock: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  borderLeft: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  display: "none",
  height: 62,
  minHeight: 62,

  "@media": {
    [devices.desktop]: {
      alignItems: "center",
      display: "flex",
      paddingLeft: 12,
    },
  },
}));

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

export const contentClass = style(({ devices, safeAreas }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  overflowY: "auto",
  padding: 16,
  rowGap: 18,
  scrollbarWidth: "none",

  "@media": {
    [devices.pointerCoarse]: {
      paddingBottom: `${calc("16px").add(safeAreas.insetBottom)}`,
    },
  },
}));
