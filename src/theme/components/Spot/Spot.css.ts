import { keyframes } from "@vanilla-extract/css";

import { style } from "@/theme";

const pulse = keyframes({
  "0%, 100%": {
    opacity: 1,
  },

  "50%": {
    opacity: 0.3,
  },
});

export const wrapperClass = style(({ colors }) => ({
  borderRadius: "50%",
  height: 9,
  minWidth: 9,
  overflow: "hidden",
  width: 9,

  "&.booking, &.building-itinerary, &.searching-flights, &.searching-stays": {
    animation: `${pulse} 1.1s ease-in-out infinite`,
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
    animation: `${pulse} 1.1s ease-in-out infinite`,
    backgroundColor: colors.amber,
  },
}));
