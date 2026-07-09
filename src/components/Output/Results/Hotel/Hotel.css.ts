import { rgba, style } from "@/theme";

export const contentClass = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  rowGap: 4,
});

export const imageHolderClass = style({
  border: `1px solid ${rgba("255, 255, 255", 0.12)}`,
  borderRadius: 12,
  height: 92,
  overflow: "hidden",
  width: 124,
});

export const imageClass = style({
  height: "100%",
  objectFit: "cover",
  width: "100%",
});

export const rowClass = style({
  alignItems: "center",
  columnGap: 16,
  display: "flex",
  justifyContent: "space-between",
});

export const nameClass = style({
  fontSize: 19,
  fontWeight: 600,
});

export const hintClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
}));

export const ratingClass = style(({ colors }) => ({
  alignItems: "center",
  color: colors.yellow,
  columnGap: 4,
  display: "inline-flex",
  fontWeight: 600,
}));

export const tagsClass = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  paddingTop: 7,
});

export const tagClass = style(({ colors }) => ({
  backgroundColor: colors.blackLighter,
  border: `1px solid ${rgba("255, 255, 255", 0.1)}`,
  borderRadius: 15,
  color: "rgb(196, 202, 210)",
  fontSize: 12,
  height: 27,
  lineHeight: "27px",
  paddingInline: 10,
  whiteSpace: "nowrap",
}));

export const footerClass = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const priceClass = style({
  fontSize: 22,
  fontWeight: 600,
});
