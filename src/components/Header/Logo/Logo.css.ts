import { rgba, style } from "@/theme";

export const wrapperClass = style({});

export const linkClass = style({
  alignItems: "center",
  columnGap: 13,
  display: "inline-flex",
});

export const layoutClass = style(({ colors }) => ({
  backgroundColor: colors.blue,
  borderRadius: 4,
  boxShadow: `${rgba(colors.blue, 0.55)} 0 0 16px`,
  display: "block",
  height: 19,
  transform: "rotate(45deg)",
  width: 19,
}));

export const labelClass = style(({ colors }) => ({
  color: colors.white,
  fontSize: 18,
  fontWeight: 600,
}));
