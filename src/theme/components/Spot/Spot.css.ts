import { style } from "@/theme";

export const wrapperClass = style(({ animations, colors }) => ({
  borderRadius: "50%",
  height: 9,
  minWidth: 9,
  overflow: "hidden",
  width: 9,

  "&.booking, &.building-itinerary, &.searching-flights, &.searching-stays": {
    animation: `${animations.pulse} 1.1s ease-in-out infinite`,
    backgroundColor: colors.blue,
  },

  "&.idle": {
    backgroundColor: colors.whiteDarkest,
  },

  "&.trip-confirmed": {
    backgroundColor: colors.green,
  },

  "&.trip-rejected": {
    backgroundColor: colors.redLighter,
  },

  "&.waiting": {
    animation: `${animations.pulse} 1.1s ease-in-out infinite`,
    backgroundColor: colors.amber,
  },
}));
