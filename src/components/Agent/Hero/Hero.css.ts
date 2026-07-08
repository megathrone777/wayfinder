import { style } from "@/theme";

export const wrapperClass = style({
  padding: "24px 16px 8px",
});

export const hintClass = style(({ colors, fonts }) => ({
  color: colors.blue,
  font: `12px ${fonts.jetBrainsMono}`,
  marginBottom: 16,
  textTransform: "uppercase",
}));

export const titleClass = style({
  fontSize: 36,
  fontWeight: 600,
  lineHeight: 1.12,
  marginBottom: 12,
});

export const textClass = style(({ colors }) => ({
  color: colors.grayLightest,
  lineHeight: 1.55,
  maxWidth: 400,
}));
