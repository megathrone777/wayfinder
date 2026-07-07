import { rgba, style } from "@/theme";

export const wrapperClass = style({
  display: "flex",
  flexDirection: "column",
  paddingBottom: 20,
  rowGap: 10,
});

export const listClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 9,
});

export const buttonClass = style(({ colors }) => ({
  backgroundColor: colors.blackDarkest,
  border: `1px solid ${rgba("255, 255, 255", 0.16)}`,
  borderRadius: 22,
  color: colors.whiteDarker,
  fontSize: 14,
  lineHeight: "normal",
  padding: "9px 15px",
  textAlign: "left",
}));

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.grayLighter,
  font: `12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  textTransform: "uppercase",
}));
