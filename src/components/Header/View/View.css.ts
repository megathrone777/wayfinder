import { keyframes } from "@vanilla-extract/css";

import { rgba, style, styleVariants } from "@/theme";

const glow = keyframes({
  "0%, 100%": {
    boxShadow: `inset 0 0 0 1px ${rgba("79, 140, 255", 0)}`,
  },

  "50%": {
    boxShadow: `inset 0 0 0 1px ${rgba("79, 140, 255", 0.55)}`,
  },
});

export const wrapperClass = style({
  borderTop: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  paddingBlock: 8,
});

export const layoutClass = style({
  alignItems: "center",
  columnGap: 4,
  display: "flex",
});

export const buttonClass = styleVariants(
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

  (state) => [
    {
      alignItems: "center",
      border: "none",
      borderRadius: 9,
      columnGap: 8,
      display: "inline-flex",
      flexGrow: 1,
      fontSize: 14,
      fontWeight: 600,
      height: 38,
      justifyContent: "center",
      paddingInline: 10,
    },

    state,
  ]
);

export const buttonGlowClass = style({
  animation: `1.6s ease-in-out 0s infinite normal none running ${glow}`,
});

export const amountClass = style(({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.blue,
  borderRadius: "100%",
  color: colors.black,
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 600,
  height: 19,
  justifyContent: "center",
  lineHeight: 1,
  minWidth: 19,
  overflow: "hidden",
  width: 19,
}));
