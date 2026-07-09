import { rgba, style } from "@/theme";

export const wrapperClass = style({
  display: "flex",
  flexDirection: "column",
  padding: "4px 16px 0",
  rowGap: 10,
});

export const listClass = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 9,
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

  ":hover": {
    backgroundColor: rgba(colors.blackDarkest, 0.7),
    color: colors.white,
  },
}));

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.grayLighter,
  font: `12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  textTransform: "uppercase",
}));
