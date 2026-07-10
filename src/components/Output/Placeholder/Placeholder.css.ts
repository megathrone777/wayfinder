import { rgba, style } from "@/theme";

export const wrapperClass = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "60dvh",
  rowGap: 16,
  textAlign: "center",
});

export const logoClass = style({
  alignItems: "center",
  border: `1px dashed ${rgba("255, 255, 255", 0.22)}`,
  borderRadius: 15,
  display: "flex",
  height: 62,
  justifyContent: "center",
  width: 62,
});

export const iconClass = style({
  border: `1px solid ${rgba("255, 255, 255", 0.36)}`,
  borderRadius: 3,
  height: 16,
  transform: "rotate(45deg)",
  width: 16,
});

export const titleClass = style(({ colors }) => ({
  color: colors.grayLightest,
  fontSize: 19,
}));

export const textClass = style(({ colors }) => ({
  color: colors.grayLighter,
  fontSize: 15,
  lineHeight: 1.5,
  maxWidth: 300,
}));
