import { rgba, style } from "@/theme";

export const wrapperClass = style({
  borderBlock: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  height: 62,
  minHeight: 62,
});

export const layoutClass = style({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "space-between",
});

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
}));
