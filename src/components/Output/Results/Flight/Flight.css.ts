import { rgba, style } from "@/theme";

export const contentClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 14,
});

export const priceClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
}));

export const priceValueClass = style(({ colors }) => ({
  color: colors.white,
  fontSize: 28,
  fontWeight: 600,
}));

export const rowClass = style({
  alignItems: "center",
  columnGap: 14,
  display: "flex",
  justifyContent: "space-between",
});

export const colClass = style({
  alignItems: "center",
  display: "flex",
  flexGrow: 1,
});

export const cityClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 12,
}));

export const durationClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 12,
  paddingInline: 6,
}));

export const connectorClass = style({
  backgroundColor: `${rgba("255, 255, 255", 0.16)}`,
  flex: 1,
  height: 2,
  position: "relative",
});

export const airlineClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
}));
