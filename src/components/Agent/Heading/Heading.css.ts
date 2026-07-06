import { rgba, style } from "@/theme";

export const wrapperClass = style({
  borderBlock: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  height: 66,
});

export const layoutClass = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
}));
