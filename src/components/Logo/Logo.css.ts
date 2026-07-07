import { rgba, style, styleVariants } from "@/theme";

export const wrapperClass = style({});

export const contentClass = style({
  alignItems: "center",
  columnGap: 13,
  display: "inline-flex",
});

export const layoutClass = style(({ colors }) => ({
  backgroundColor: colors.blue,
  borderRadius: 4,
  boxShadow: `${rgba(colors.blue, 0.55)} 0 0 16px`,
  display: "block",
  height: 19,
  transform: "rotate(45deg)",
  width: 19,
}));

export const labelClass = styleVariants(
  {
    chat: {
      fontSize: 15,
    },

    header: {
      fontSize: 18,
    },
  },

  (template, { colors }) => [
    {
      color: colors.white,
      fontWeight: 600,
    },

    template,
  ]
);
