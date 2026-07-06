import { styleVariants } from "@/theme";

export const buttonClass = styleVariants(
  {
    default: "rotate(0deg)",
    isOpened: "rotate(-45deg)",
  },

  (transform) => [
    {
      alignItems: "start",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      height: 40,
      justifyContent: "space-between",
      padding: 4,
      transformOrigin: "center",
      transition: "transform 330ms ease-out",
      width: 40,
    },

    { transform },
  ]
);

export const lineClass = styleVariants(
  {
    left: {
      alignSelf: "auto",
      isOpened: false,
      justifySelf: "start",
      transform: "none",
      transformOrigin: "right",
      width: "50%",
    },

    leftOpened: {
      alignSelf: "auto",
      isOpened: true,
      justifySelf: "start",
      transform: "rotate(-90deg) translateX(3px)",
      transformOrigin: "right",
      width: "50%",
    },

    middle: {
      alignSelf: "center",
      isOpened: false,
      justifySelf: "auto",
      transform: "none",
      transformOrigin: "unset",
      width: "100%",
    },

    middleOpened: {
      alignSelf: "center",
      isOpened: true,
      justifySelf: "auto",
      transform: "none",
      transformOrigin: "unset",
      width: "100%",
    },

    right: {
      alignSelf: "end",
      isOpened: false,
      justifySelf: "end",
      transform: "none",
      transformOrigin: "left",
      width: "50%",
    },

    rightOpened: {
      alignSelf: "end",
      isOpened: true,
      justifySelf: "end",
      transform: "rotate(-90deg) translateX(-3px)",
      transformOrigin: "left",
      width: "50%",
    },
  },

  (
    { alignSelf, isOpened, justifySelf, transform, transformOrigin, width },
    { colors, easing }
  ) => ({
    alignSelf,
    backgroundColor: isOpened ? colors.blue : colors.white,
    borderRadius: 5,
    height: 4,
    justifySelf,
    transform,
    transformOrigin,
    transition: `transform 330ms ${easing}`,
    width,
  })
);
