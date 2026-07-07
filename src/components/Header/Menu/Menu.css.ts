import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style({
  alignItems: "center",
  columnGap: 12,
  display: "flex",
  position: "relative",
});

export const layoutClass = styleVariants(
  {
    isClosed: {
      opacity: 0,
      transform: "translate3d(0, -6px, 0)",
      visibility: "hidden",
    },

    isOpened: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      visibility: "visible",
    },
  },

  (state, { colors, devices, easing }) => [
    {
      backgroundColor: colors.grayDarkest,
      border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
      borderRadius: 14,
      boxShadow: `${rgba("0, 0, 0", 0.5)} 0 16px 44px`,
      display: "flex",
      flexDirection: "column",
      minWidth: 250,
      padding: 16,
      position: "absolute",
      right: 0,
      rowGap: 16,
      top: 62,
      transitionDuration: ".35s",
      transitionProperty: "opacity, transform, visibility",
      transitionTimingFunction: easing,
      zIndex: 8,

      "@media": {
        [devices.tablet]: {
          display: "contents",
        },
      },
    },

    state,
  ]
);
