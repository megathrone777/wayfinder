import { rgba, style } from "@/theme";

export const wrapperClass = style({
  paddingInline: 16,
});

export const formClass = style(({ colors }) => ({
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${rgba("255, 255, 255", 0.16)}`,
  borderRadius: 14,
  boxShadow: `${rgba("0, 0, 0", 0.35)} 0 8px 34px`,
  overflow: "hidden",
  padding: "2px 16px 16px",
}));

export const textareaClass = style(({ colors }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: colors.white,
  fieldSizing: "content",
  fontSize: 17,
  letterSpacing: 1,
  minHeight: "2lh",
  padding: "14px 2px",
  resize: "none",
  width: "100%",

  "::placeholder": {
    color: colors.grayLighter,
    letterSpacing: 1,
  },
}));

export const footerClass = style({
  alignItems: "end",
  display: "flex",
  justifyContent: "space-between",
});

export const hintClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  color: colors.grayLighter,
  columnGap: 6,
  display: "inline-flex",
  fontFamily: fonts.jetBrainsMono,
  fontSize: 13,
  whiteSpace: "nowrap",
}));

export const hintIconClass = style({
  color: "inherit",
  height: 15,
  transform: "translateY(1px)",
});
