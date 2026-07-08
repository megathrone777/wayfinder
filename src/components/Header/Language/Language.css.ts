import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style({
  position: "relative",
});

export const triggerClass = style(({ colors, devices }) => ({
  alignItems: "center",
  background: "none",
  border: "none",
  color: colors.white,
  columnGap: 6,
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  userSelect: "none",

  "@media": {
    [devices.pointerFine]: {
      display: "inline-flex",
    },

    [devices.pointerCoarse]: {
      display: "none",
    },
  },
}));

export const angleIconClass = styleVariants(
  {
    default: {
      transform: "rotate(0deg)",
    },

    rotated: {
      transform: "rotate(180deg)",
    },
  },

  (state, { colors, easing }) => [
    {
      color: colors.gray,
      height: 17,
      transformOrigin: "center",
      transition: `transform .25s ${easing}`,
    },

    state,
  ]
);

export const selectClass = style(({ colors, devices }) => ({
  appearance: "none",
  background: "none",
  border: "none",
  color: colors.white,
  fontSize: 15,
  fontWeight: 600,

  ":focus": {
    outline: "none",
  },

  "@media": {
    [devices.pointerFine]: {
      display: "none",
    },

    [devices.pointerCoarse]: {
      display: "inline-block",
    },
  },
}));

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

  (state, { colors, easing }) => [
    {
      backgroundColor: colors.grayDarkest,
      border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
      borderRadius: 14,
      boxShadow: `${rgba("0, 0, 0", 0.5)} 0 16px 44px`,
      display: "flex",
      flexDirection: "column",
      minWidth: 122,
      padding: 6,
      position: "absolute",
      right: 0,
      rowGap: 16,
      top: 30,
      transitionDuration: ".35s",
      transitionProperty: "opacity, transform, visibility",
      transitionTimingFunction: easing,
      width: "fit-content",
      zIndex: 8,
    },

    state,
  ]
);

export const listClass = style({
  alignItems: "stretch",
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
});

export const optionClass = styleVariants(
  ({ colors }) => ({
    active: {
      backgroundColor: colors.grayDarker,
      color: colors.white,
    },

    default: {
      backgroundColor: "transparent",
      color: colors.gray,
    },
  }),

  (state, { colors }) => [
    {
      alignItems: "center",
      border: "none",
      borderRadius: 8,
      columnGap: 10,
      display: "inline-flex",
      fontSize: 14,
      fontWeight: 600,
      height: 33,
      justifyContent: "space-between",
      paddingInline: 10,
      width: "100%",

      ":hover": {
        color: colors.whiteLighter,
      },
    },

    state,
  ]
);

export const iconClass = style(({ colors }) => ({
  color: colors.blue,
  height: 13,
  minWidth: 13,
  width: 13,
}));
