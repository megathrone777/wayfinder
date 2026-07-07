import { keyframes } from "@vanilla-extract/css";

const animations = {
  assemble: keyframes({
    from: {
      opacity: 0,
      transform: "translateY(12px) scale(.985)",
    },

    to: {
      opacity: 1,
      transform: "none",
    },
  }),

  fadeIn: keyframes({
    from: {
      opacity: 0,
      pointerEvents: "none",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
    },
  }),

  fadeInDown: keyframes({
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, -6px, 0)",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, 0, 0)",
    },
  }),

  fadeInUp: keyframes({
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, 0, 0)",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, -6px, 0)",
    },
  }),

  fadeOut: keyframes({
    "0%": { opacity: 1 },
    "80%": { opacity: 1 },
    "100%": { opacity: 0, visibility: "hidden" },
  }),
};

export { animations };
