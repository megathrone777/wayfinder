import { rgba, style } from "@/theme";

export const wrapperClass = style(({ animations, colors, easing }) => ({
  animation: `0.55s ${easing} 0s 1 normal both running ${animations.assemble}`,
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 16,
  flexShrink: 0,
  overflow: "hidden",
  padding: 20,
}));

export const headerClass = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 16,
});

export const titleClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.blue,
  columnGap: 8,
  display: "inline-flex",
  font: `12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

export const dotClass = style(({ colors }) => ({
  backgroundColor: colors.blue,
  borderRadius: "50%",
  display: "block",
  height: 7,
  minWidth: 7,
  overflow: "hidden",
  width: 7,
}));

export const footerClass = style({
  alignItems: "center",
  borderTop: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  display: "flex",
  justifyContent: "space-between",
  marginTop: 16,
  paddingTop: 17,
});
