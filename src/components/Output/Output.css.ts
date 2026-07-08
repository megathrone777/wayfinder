import { calc } from "@vanilla-extract/css-utils";

import { styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
  {
    agent: {
      display: "none",
    },

    output: {
      display: "block",
    },
  },

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

        [devices.tablet]: {
          flexGrow: 1,
        },
      },
    },

    view,
  ]
);
