import { style, styleVariants } from "@/theme";

export const wrapperClass = style({
  display: "grid",
});

export const layoutClass = style(({ colors }) => ({
  alignItems: "center",
  borderBottom: `2px solid ${colors.red}`,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "start",
}));

export const labelClass = style({
  cursor: "pointer",
  fontWeight: 600,
  justifySelf: "start",
  lineHeight: "normal",
  userSelect: "none",
});

export const inputClass = styleVariants(
  ({ colors }) => ({
    default: {
      color: "black",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: "black",
          },
      },

      "::placeholder": {
        color: colors.gray,
      },
    },

    error: {
      color: "black",
      selectors: {
        "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
          {
            caretColor: "black",
            transition: "background-color 9999s ease-out",
            WebkitBoxShadow: "0 0 0 1000px white inset",
            WebkitTextFillColor: colors.red,
          },
      },

      "::placeholder": {
        color: colors.red,
      },
    },
  }),

  (template) => [
    {
      appearance: "none",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: 0,
      fontFamily: "inherit",
      fontSize: 16,
      fontWeight: 500,
      height: "100%",
      width: "100%",

      ":disabled": {
        cursor: "not-allowed",
        opacity: 0.7,
      },

      ":focus": {
        outline: "none",

        "::placeholder": {
          color: "transparent",
        },
      },

      ":read-only": {
        cursor: "not-allowed",
        opacity: 0.7,
      },
    },

    template,
  ]
);

export const iconHolderClass = style({
  alignItems: "center",
  display: "grid",
  justifyContent: "center",
  minWidth: 30,
  width: 30,
});

export const iconClass = style(({ colors }) => ({
  color: colors.red,
  minWidth: 18,
  width: 18,
}));

export const errorIconClass = style(({ colors }) => ({
  color: colors.red,
  display: "block",
  height: 20,
  marginLeft: 4,
  minWidth: 20,
  selectors: {
    [`${wrapperClass}:focus-within &`]: {
      display: "none",
    },
  },
  width: 20,
}));
