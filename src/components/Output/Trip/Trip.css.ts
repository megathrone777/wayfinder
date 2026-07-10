import { calc } from "@vanilla-extract/css-utils";

import { rgba, style } from "@/theme";

export const wrapperClass = style(({ animations, colors, easing }) => ({
  animation: `0.55s ${easing} 0s 1 normal both running ${animations.assemble}`,
  background: `
    linear-gradient(
      ${rgba(colors.green, 0.08)},
      ${rgba(colors.green, 0)} 40%
    ),
    ${colors.grayDarkest}
  `,
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 16,
  boxShadow: `inset 0 0 0 1px ${rgba(colors.green, 0.08)}`,
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
  color: colors.green,
  columnGap: 8,
  display: "inline-flex",
  font: `600 12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

export const badgeClass = style(({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.green,
  borderRadius: "50%",
  color: colors.black,
  display: "flex",
  flexShrink: 0,
  height: 30,
  justifyContent: "center",
  padding: 7,
  width: 30,
}));

export const iconClass = style({
  height: 15,
});

export const referenceClass = style(({ colors, fonts }) => ({
  color: colors.gray,
  font: `12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  marginLeft: "auto",
}));

export const daysClass = style({
  columnGap: 8,
  display: "flex",
  paddingBottom: 16,
});

export const dayClass = style(({ colors }) => ({
  alignItems: "center",
  backgroundColor: rgba("255, 255, 255", 0.03),
  border: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  borderRadius: 10,
  color: colors.whiteDarker,
  display: "flex",
  flexDirection: "column",
  paddingBlock: 10,
  rowGap: 5,
  width: `${calc("100%")
    .subtract(`${8 * 5}px`)
    .divide(6)}`,
}));

export const dayCodeClass = style(({ colors, fonts }) => ({
  color: colors.gray,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 11,
  letterSpacing: 1,
}));

export const dayLabelClass = style({
  fontSize: 12,
  fontWeight: 500,
});

export const footerClass = style({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "flex-end",
});
