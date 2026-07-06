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
  ({ colors }) => ({
    primary: {
      backgroundColor: colors.blue,
      boxShadow: `${rgba(colors.blue, 0.4)} 0 4px 18px`,
      color: colors.black,

      ":hover": {
        backgroundColor: colors.blueLighter,
      },
    },

    secondary: {
      backgroundColor: colors.green,
      color: colors.black,

      ":hover": {
        backgroundColor: colors.greenLighter,
      },
    },

    tertiary: {
      backgroundColor: colors.blackDarker,
      border: `1px solid ${rgba("255, 255, 255", 0.17)}`,
      color: colors.whiteDarker,

      ":hover": {
        backgroundColor: colors.blackLighter,
      },
    },
  }),

  (template) => [{}, template]
);

export const buttonClass = style(({ easing }) => ({
  alignItems: "center",
  display: "inline-flex",
  fontWeight: 600,
  justifyContent: "center",
  lineHeight: 1,
  outline: "none",
  textDecoration: "none",
  transition: `background-color 0.25s ${easing}`,
  userSelect: "none",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.7,
  },
}));

export const iconClass = style({
  color: "white",
  height: 16,
  minWidth: 16,
});
