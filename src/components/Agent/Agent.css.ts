import { calc } from "@vanilla-extract/css-utils";

import { styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
  ({ devices }) => ({
    agent: {
      display: "flex",
    },

    output: {
      display: "none",

      "@media": {
        [devices.desktop]: {
          display: "flex",
        },
      },
    },
  }),

  (view, { colors, devices, safeAreas }) => [
    {
      backgroundColor: colors.blackDarker,
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      paddingBottom: 16,
      width: "100%",

      "@media": {
        [devices.pointerCoarse]: {
          paddingBottom: `${calc("16px").add(safeAreas.insetBottom)}`,
        },

        [devices.desktop]: {
          flexBasis: 470,
          flexShrink: 0,
        },
      },
    },

    view,
  ]
);

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
