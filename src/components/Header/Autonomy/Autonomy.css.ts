import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 8,

  "@media": {
    [devices.desktop]: {
      alignItems: "center",
      columnGap: 11,
      flexDirection: "row",
    },
  },
}));

export const titleClass = style(({ colors, devices, fonts }) => ({
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 11,
  letterSpacing: 1,
  lineHeight: 1,
  textTransform: "uppercase",

  "@media": {
    [devices.desktop]: {
      fontSize: 14,
    },
  },
}));

export const listClass = style(({ devices }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: 5,

  "@media": {
    [devices.desktop]: {
      columnGap: 4,
      flexDirection: "row",
    },
  },
}));

export const buttonClass = styleVariants(
  ({ colors }) => ({
    active: {
      backgroundColor: colors.grayDarker,
      borderColor: rgba(colors.blue, 0.55),
      color: colors.whiteLighter,

      ":hover": {
        borderColor: colors.blueLighter,
      },
    },

    default: {
      backgroundColor: colors.grayDarkest,
      borderColor: rgba("255, 255, 255", 0.1),

      ":hover": {
        backgroundColor: colors.grayDarker,
        borderColor: rgba(colors.blue, 0.55),
        color: colors.whiteLighter,
      },
    },
  }),

  (variant, { colors, easing }) => [
    {
      borderRadius: 9,
      borderStyle: "solid",
      borderWidth: 1,
      color: colors.gray,
      fontSize: 14,
      fontWeight: 600,
      height: 40,
      paddingInline: 13,
      textAlign: "left",
      transitionDuration: ".15s",
      transitionProperty: "background-color, border-color, color",
      transitionTimingFunction: easing,
      whiteSpace: "nowrap",
      width: "100%",
    },

    variant,
  ]
);
