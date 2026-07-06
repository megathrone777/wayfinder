import { rgba, styleVariants } from "@/theme";

export const layoutClass = styleVariants(
  {
    isClosed: {},
    isOpened: {},
  },

  (state, { colors, devices }) => [
    {
      backgroundColor: colors.grayDarkest,
      border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
      borderRadius: 14,
      boxShadow: `${rgba("0, 0, 0", 0.5)} 0 16px 44px`,
      minWidth: 250,
      padding: 16,
      position: "absolute",
      right: 0,
      top: "100%",

      "@media": {
        [devices.tablet]: {
          display: "contents",
        },
      },
    },

    state,
  ]
);
