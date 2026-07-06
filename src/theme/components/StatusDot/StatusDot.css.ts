import { keyframes } from "@vanilla-extract/css";

import { styleVariants } from "@/theme";

const pulse = keyframes({
  "0%, 100%": {
    opacity: 1,
  },

  "50%": {
    opacity: 0.3,
  },
});

export const wrapperClass = styleVariants(
  ({ colors }) => ({
    confirmed: {
      backgroundColor: colors.green,
    },

    idle: {
      backgroundColor: colors.whiteDarkest,
    },

    processing: {
      backgroundColor: colors.blue,
    },

    waiting: {
      animation: `${pulse} 1.1s ease-in-out infinite`,
      backgroundColor: colors.amber,
    },
  }),

  (status) => [
    {
      borderRadius: "50%",
      height: 9,
      minWidth: 9,
      overflow: "hidden",
      width: 9,
    },

    status,
  ]
);
