import { rgba, style } from "@/theme";

export const layoutClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 5,
});

export const formClass = style({
  alignItems: "center",
  columnGap: 8,
  display: "flex",
  flex: 1,
});

export const fieldClass = style({
  alignItems: "center",
  display: "flex",
  flex: 1,
  position: "relative",
});

export const fieldIconClass = style(({ colors }) => ({
  color: colors.gray,
  height: 15,
  left: 12,
  minWidth: 15,
  pointerEvents: "none",
  position: "absolute",
  width: 15,
}));

export const inputClass = style(({ colors, fonts }) => ({
  backgroundColor: colors.blackDarker,
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 8,
  color: colors.white,
  font: `14px ${fonts.jetBrainsMono}`,
  height: 33,
  outline: "none",
  paddingInline: "34px 12px",
  selectors: {
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
      {
        caretColor: "white",
        transition: "background-color 9999s ease-out",
        WebkitBoxShadow: `0 0 0 1000px ${colors.blackDarker} inset`,
        WebkitTextFillColor: "white",
      },
  },
  width: "100%",

  "::placeholder": {
    color: colors.gray,
  },

  ":focus": {
    borderColor: rgba(colors.green, 0.5),
  },
}));

export const statusClass = style(({ colors, fonts }) => ({
  color: colors.gray,
  font: `13px ${fonts.jetBrainsMono}`,
  marginRight: "auto",
}));

export const errorClass = style(({ colors, fonts }) => ({
  color: colors.redLighter,
  font: `12px ${fonts.jetBrainsMono}`,
  marginRight: "auto",
}));
