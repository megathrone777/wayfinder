import { style } from "@/theme";

export const wrapperClass = style({
  flexGrow: 1,
  maxWidth: "100%",
  overflowY: "auto",
  paddingInline: 16,
  scrollbarWidth: "none",
  width: "100%",
});

export const layoutClass = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 15,
});
