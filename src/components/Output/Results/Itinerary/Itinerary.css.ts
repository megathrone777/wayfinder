import { rgba, style } from "@/theme";

export const captionClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 14,
}));

export const listClass = style({
  display: "flex",
  flexDirection: "column",
});

export const dayClass = style({
  alignItems: "center",
  columnGap: 14,
  display: "flex",
  paddingBlock: 12,
  selectors: {
    "& + &": {
      borderTop: `1px solid ${rgba("255, 255, 255", 0.08)}`,
    },
  },
});

export const badgeClass = style(({ colors, fonts }) => ({
  alignItems: "center",
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 10,
  color: colors.whiteDarker,
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  fontFamily: fonts.jetBrainsMono,
  height: 42,
  justifyContent: "center",
  lineHeight: 1,
  rowGap: 3,
  width: 42,
}));

export const badgeLabelClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 8,
  letterSpacing: 1,
}));

export const badgeNumberClass = style({
  fontSize: 16,
  fontWeight: 600,
});

export const bodyClass = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  rowGap: 3,
});

export const titleClass = style(({ colors }) => ({
  color: colors.white,
  fontSize: 15,
  fontWeight: 600,
}));

export const stopsClass = style(({ colors }) => ({
  color: colors.gray,
  fontSize: 13,
}));
