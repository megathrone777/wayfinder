import { keyframes } from "@vanilla-extract/css";

import { rgba, style, styleVariants } from "@/theme";

const shimmer = keyframes({
  from: { backgroundPosition: "-160px 0" },
  to: { backgroundPosition: "220px 0" },
});

export const wrapperClass = style({
  alignItems: "stretch",
  columnGap: 14,
  display: "flex",
});

export const railClass = style({
  alignItems: "center",
  display: "flex",
  flex: "none",
  flexDirection: "column",
  width: 26,
});

export const connectorClass = styleVariants(
  ({ colors }) => ({
    default: {},

    isLast: {
      display: "none",
    },

    isPast: {
      backgroundColor: rgba(colors.blue, 0.45),
    },
  }),

  (state) => [
    {
      backgroundColor: rgba("255, 255, 255", 0.12),
      flex: 1,
      minHeight: 14,
      width: 2,
    },

    state,
  ]
);

export const spotClass = styleVariants(
  ({ animations, colors }) => ({
    active: {
      animation: `${animations.pulse} 1.1s ease-in-out infinite`,
      backgroundColor: colors.blue,
      borderColor: "transparent",
    },

    done: {
      backgroundColor: colors.green,
      borderColor: "transparent",
    },

    error: {
      backgroundColor: colors.redLighter,
      borderColor: "transparent",
    },

    queued: {
      backgroundColor: "transparent",
      borderColor: colors.gray,
    },

    waiting: {
      animation: `${animations.pulse} 1.1s ease-in-out infinite`,
      backgroundColor: colors.amber,
      borderColor: "transparent",
    },
  }),

  (status, { colors }) => [
    {
      alignItems: "center",
      borderRadius: "50%",
      borderStyle: "solid",
      borderWidth: 2,
      color: colors.black,
      display: "flex",
      flex: "none",
      height: 24,
      justifyContent: "center",
      overflow: "hidden",
      width: 24,
    },

    status,
  ]
);

export const headerClass = style({
  alignItems: "baseline",
  columnGap: 8,
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const contentClass = style({
  flex: 1,
  minWidth: 0,
  paddingBottom: 18,
});

export const titleClass = styleVariants(
  ({ colors }) => ({
    default: {
      color: colors.whiteLighter,
    },

    queued: {
      color: colors.gray,
    },
  }),

  (status) => [
    {
      fontSize: 16,
      fontWeight: 600,
    },

    status,
  ]
);

export const detailClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
  lineHeight: 1.45,
  marginTop: 4,
}));

export const progressClass = style(({ colors }) => ({
  animation: `${shimmer} 1.1s linear infinite`,
  background: `
    linear-gradient(
      90deg,
      ${rgba(colors.blue, 0.1)},
      ${rgba(colors.blue, 0.6)},
      ${rgba(colors.blue, 0.1)}
    )
  `,
  backgroundSize: "180px 100%",
  borderRadius: 3,
  height: 4,
  marginTop: 11,
}));

export const statusClass = styleVariants(
  ({ colors }) => ({
    active: {
      color: colors.blue,
    },

    done: {
      color: colors.green,
    },

    error: {
      color: colors.redLighter,
    },

    queued: {
      color: colors.gray,
    },

    waiting: {
      color: colors.amber,
    },
  }),

  (status) => [
    {
      flex: "none",
      fontSize: 12,
      letterSpacing: 1,
      textTransform: "uppercase",
    },

    status,
  ]
);

export const iconClass = style({
  height: 12,
  transform: "translateY(1px)",
});
