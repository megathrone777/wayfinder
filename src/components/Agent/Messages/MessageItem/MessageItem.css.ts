import { globalStyle, rgba, style, styleVariants } from "@/theme";

export const wrapperClass = styleVariants(
  {
    assistant: {
      display: "flex",
      flexDirection: "column",
      rowGap: 20,
    },

    system: {},

    user: {
      display: "flex",
      justifyContent: "flex-end",
      marginLeft: "auto",
      maxWidth: "88%",
    },
  },

  (role, { animations }) => [
    {
      animation: `0.45s ease 0s 1 normal both running ${animations.assemble}`,
      opacity: 0,
      transform: "translateY(12px) scale(.985)",
    },

    role,
  ]
);

export const partClass = styleVariants(
  ({ colors }) => ({
    assistant: {
      display: "flex",
      flexDirection: "column",
      rowGap: 12,
    },

    system: {},

    user: {
      backgroundColor: colors.blue,
      borderRadius: "15px 15px 5px",
      color: colors.black,
      display: "inline-block",
      padding: "13px 16px",
    },
  }),

  (role) => [
    {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.5,
    },

    role,
  ]
);

export const headingClass = style({
  alignItems: "center",
  columnGap: 9,
  display: "flex",
});

export const markdownClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 10,
});

export const roleClass = style(({ colors, fonts }) => ({
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 5,
  color: colors.whiteDarkest,
  fontFamily: fonts.jetBrainsMono,
  fontSize: 11,
  letterSpacing: 1,
  padding: "2px 7px",
  textTransform: "uppercase",
}));

globalStyle(`${markdownClass} p`, {
  margin: 0,
});

globalStyle(`${markdownClass} ul, ${markdownClass} ol`, {
  display: "flex",
  flexDirection: "column",
  margin: 0,
  paddingLeft: 22,
  rowGap: 6,
});

globalStyle(`${markdownClass} li`, {
  paddingLeft: 4,
});

globalStyle(`${markdownClass} li::marker`, ({ colors }) => ({
  color: colors.blue,
  fontWeight: 600,
}));

globalStyle(`${markdownClass} ul`, {
  listStyleType: "disc",
});

globalStyle(`${markdownClass} ol`, {
  listStyleType: "decimal",
});

globalStyle(`${markdownClass} strong`, {
  fontWeight: 700,
});

globalStyle(`${markdownClass} em`, {
  fontStyle: "italic",
});

globalStyle(`${markdownClass} a`, {
  textDecoration: "underline",
  textUnderlineOffset: 2,
});

globalStyle(`${markdownClass} :where(h1, h2, h3, h4)`, {
  fontSize: 17,
  fontWeight: 700,
  margin: 0,
});

globalStyle(`${markdownClass} code`, {
  backgroundColor: rgba("255, 255, 255", 0.08),
  borderRadius: 4,
  fontSize: 14,
  padding: "1px 5px",
});
