import { keyframes } from "@vanilla-extract/css";

import { rgba, style } from "@/theme";

const pulse = keyframes({
  "0%": { boxShadow: `0 0 0 0 ${rgba("224, 165, 58", 0.4)}` },
  "70%": { boxShadow: `0 0 0 12px ${rgba("224, 165, 58", 0)}` },
  "100%": { boxShadow: `0 0 0 0 ${rgba("224, 165, 58", 0)}` },
});

export const wrapperClass = style(({ animations, colors }) => ({
  animation: `${animations.assemble} .4s ease both`,
  backgroundColor: rgba(colors.amber, 0.08),
  borderLeft: `4px solid ${colors.amber}`,
  borderRadius: 13,
  boxShadow: `
    0 0 0 1px ${rgba(colors.amber, 0.14)},
    0 8px 30px ${rgba(colors.amber, 0.1)}
  `,
  marginTop: 16,
  opacity: 0,
  padding: 16,
  transform: "translateY(12px) scale(.985)",
}));

export const headerClass = style({
  alignItems: "center",
  display: "flex",
  gap: 11,
  marginBottom: 11,
});

export const iconHolderClass = style(({ colors }) => ({
  alignItems: "center",
  animation: `${pulse} 1.8s ease-out infinite`,
  backgroundColor: colors.amber,
  borderRadius: "50%",
  color: colors.black,
  display: "flex",
  height: 26,
  justifyContent: "center",
  width: 26,
}));

export const iconClass = style({
  height: 16,
});

export const titleClass = style(({ colors }) => ({
  color: colors.amber,
  fontSize: 16,
  fontWeight: 600,
}));

export const contentClass = style(({ colors }) => ({
  color: colors.grayLight,
  fontSize: 15,
  lineHeight: 1.5,
  margin: "0 0 15px",
}));

export const footerClass = style({
  alignItems: "center",
  columnGap: 9,
  display: "flex",
});

export const buttonApproveClass = style(({ colors }) => ({
  backgroundColor: colors.amber,
  border: "none",
  borderRadius: 9,
  color: colors.black,
  fontSize: 15,
  fontWeight: 600,
  height: 41,
  paddingInline: 11,
}));

export const buttonRejectClass = style(({ colors }) => ({
  backgroundColor: "transparent",
  border: `1px solid ${rgba("255, 255, 255", 0.18)}`,
  borderRadius: 9,
  color: colors.whiteDarker,
  fontSize: 15,
  fontWeight: 600,
  height: 41,
  paddingInline: 11,
}));
