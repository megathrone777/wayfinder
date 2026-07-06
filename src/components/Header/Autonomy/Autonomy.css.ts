import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 8,
});

export const titleClass = style(({ colors, devices, fonts }) => ({
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",

  "@media": {
    [devices.tablet]: {
      fontSize: 14,
    },
  },
}));

export const listClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 5,
});

export const buttonClass = styleVariants(
  ({ colors }) => ({
    active: {
      backgroundColor: colors.grayDarker,
      borderColor: rgba(colors.blue, 0.55),
      color: colors.whiteLighter,
    },

    default: {
      borderColor: rgba("255, 255, 255", 0.1),
    },
  }),

  (variant, { colors }) => [
    {
      backgroundColor: "transparent",
      borderRadius: 9,
      borderStyle: "solid",
      borderWidth: 1,
      color: colors.gray,
      fontSize: 14,
      fontWeight: 600,
      padding: "10px 13px",
      textAlign: "left",
      whiteSpace: "nowrap",
      width: "100%",
    },

    variant,
  ]
);
