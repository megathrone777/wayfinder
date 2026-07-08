import { style } from "@/theme";

export const wrapperClass = style({
  display: "flex",
  flexDirection: "column",
  paddingBlock: "24px 20px",
  rowGap: 16,
});

export const headingClass = style(({ colors, fonts }) => ({
  color: colors.grayLighter,
  font: `12px ${fonts.jetBrainsMono}`,
  letterSpacing: 1,
  textTransform: "uppercase",
}));

export const listClass = style({
  display: "flex",
  flexDirection: "column",
});
