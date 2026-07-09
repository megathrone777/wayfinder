import { keyframes } from "@vanilla-extract/css";

import { rgba, style } from "@/theme";

const draw = keyframes({
  from: {
    strokeDashoffset: "var(--route-length)",
  },

  to: {
    strokeDashoffset: 0,
  },
});

export const captionClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
}));

export const plotClass = style(({ colors }) => ({
  backgroundColor: colors.black,
  border: `1px solid ${rgba("255, 255, 255", 0.1)}`,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
}));

export const svgClass = style({
  display: "block",
  height: "auto",
  width: "100%",
});

export const gridStrokeClass = style({
  fill: "none",
  stroke: rgba("255, 255, 255", 0.06),
  strokeWidth: 1,
});

export const routeLineClass = style(({ colors, easing }) => ({
  animation: `1.5s ${easing} 0s 1 normal both running ${draw}`,
  fill: "none",
  opacity: 0.9,
  stroke: colors.blue,
  strokeDasharray: "var(--route-length)",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 3,
}));

export const labelsClass = style(({ colors, fonts }) => ({
  fill: colors.whiteDarker,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 12,
}));

export const nodeClass = style(({ colors }) => ({
  fill: colors.black,
  stroke: colors.blue,
  strokeWidth: 2.5,
}));

export const nodePrimaryClass = style(({ colors }) => ({
  fill: colors.blue,
}));
