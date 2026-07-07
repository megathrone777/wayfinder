import { rgba, style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  alignItems: "center",
  borderRadius: 9,
  borderStyle: "solid",
  borderWidth: 1,
  columnGap: 9,
  display: "flex",
  fontSize: 14,
  fontWeight: 600,
  height: 38,
  lineHeight: 1,
  minHeight: 38,
  paddingInline: 13,
  whiteSpace: "nowrap",
  width: "100%",

  "&.booking, &.building-itinerary, &.searching-flights, &.searching-stays": {
    backgroundColor: rgba(colors.blue, 0.12),
    borderColor: rgba(colors.blue, 0.35),
    color: colors.blue,
  },

  "&.idle": {
    backgroundColor: colors.grayDarkest,
    borderColor: rgba("255, 255, 255", 0.1),
    color: colors.gray,
  },

  "&.trip-confirmed": {
    backgroundColor: rgba(colors.green, 0.12),
    borderColor: rgba(colors.green, 0.35),
    color: colors.green,
  },

  "&.trip-rejected": {
    backgroundColor: rgba(colors.redLighter, 0.12),
    borderColor: rgba(colors.redLighter, 0.35),
    color: colors.redLighter,
  },

  "&.waiting": {
    backgroundColor: rgba(colors.amber, 0.12),
    borderColor: rgba(colors.amber, 0.35),
    color: colors.amber,
  },
}));
