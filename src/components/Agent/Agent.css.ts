import { calc } from "@vanilla-extract/css-utils";

import { style, styleVariants } from "@/theme";

export const wrapperClass = style(({ colors, devices, safeAreas }) => ({
  backgroundColor: colors.blackDarker,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  paddingBottom: 16,
  width: "100%",

  "@media": {
    [devices.pointerCoarse]: {
      paddingBottom: `${calc("16px").add(safeAreas.insetBottom)}`,
    },

    [devices.tablet]: {
      flexBasis: 470,
      flexShrink: 0,
    },
  },
}));

export const contentClass = styleVariants(
  {
    default: {
      overflow: "hidden",
    },

    scrollable: {
      overflowY: "auto",
      scrollbarWidth: "none",
    },
  },

  (scrollable) => [
    {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      rowGap: 22,
      width: "100%",
    },

    scrollable,
  ]
);
