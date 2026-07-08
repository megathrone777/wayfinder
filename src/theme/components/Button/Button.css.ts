import { rgba, style, styleVariants } from "@/theme";

export const buttonSizeClass = styleVariants(
  {
    normal: {
      borderRadius: 10,
      columnGap: 6,
      fontSize: 15,
      height: 42,
      paddingInline: 18,
    },

    small: {
      borderRadius: 8,
      columnGap: 5,
      fontSize: 14,
      height: 33,
      paddingInline: 13,
    },
  },

  (size) => size
);

export const buttonTemplateClass = styleVariants(
  ({ colors, devices }) => ({
    primary: {
      backgroundColor: colors.blue,
      border: "1px solid transparent",
      boxShadow: `${rgba(colors.blue, 0.4)} 0 4px 18px`,
      color: colors.black,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            backgroundColor: colors.blueLighter,
          },
        },
      },
    },

    secondary: {
      backgroundColor: colors.green,
      border: "1px solid transparent",
      color: colors.black,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            backgroundColor: colors.greenLighter,
          },
        },
      },
    },

    tertiary: {
      backgroundColor: colors.blackDarker,
      border: `1px solid ${rgba("255, 255, 255", 0.17)}`,
      color: colors.whiteDarker,

      "@media": {
        [devices.pointerFine]: {
          ":hover": {
            backgroundColor: colors.blackLighter,
          },
        },
      },
    },
  }),

  (template) => template
);

export const buttonClass = style(({ easing }) => ({
  alignItems: "center",
  display: "inline-flex",
  fontWeight: 600,
  justifyContent: "center",
  outline: "none",
  textDecoration: "none",
  transition: `background-color 0.25s ${easing}`,
  userSelect: "none",
  whiteSpace: "nowrap",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.7,
  },
}));

export const iconClass = style({
  color: "inherit",
  height: 15,
  minWidth: 15,
});
