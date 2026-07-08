import { calc } from "@vanilla-extract/css-utils";

import { styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
  {
    agent: {
      display: "none",
    },

    output: {
      display: "flex",
    },
  },

  (view, { colors, devices, safeAreas }) => [
    {
      backgroundColor: colors.blackDarker,
      flexDirection: "column",
      height: "100%",
      overflowY: "auto",
      padding: 16,
      rowGap: 18,
      scrollbarWidth: "none",
      width: "100%",

      "@media": {
        [devices.pointerCoarse]: {
          paddingBottom: `${calc("16px").add(safeAreas.insetBottom)}`,
        },

        [devices.tablet]: {
          flexGrow: 1,
        },
      },
    },

    view,
  ]
);
