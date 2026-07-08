import { globalStyle, rgba } from "@/theme";

globalStyle("::-webkit-scrollbar", {
  height: 11,
  width: 11,
});

globalStyle("::-webkit-scrollbar-track", {
  borderRadius: 10,
});

globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: rgba("255, 255, 255", 0.16),
  borderRadius: 6,
});

globalStyle("::-webkit-scrollbar-thumb:hover", {
  backgroundColor: rgba("255, 255, 255", 0.4),
});

globalStyle("html, body", {
  height: "100%",
  width: "100%",
});

globalStyle("body", ({ colors, fonts }) => ({
  backgroundColor: colors.black,
  color: colors.white,
  font: `16px ${fonts.onest}`,
  letterSpacing: 1,
  minWidth: 340,
  MozOsxFontSmoothing: "grayscale",
  WebkitFontSmoothing: "antialiased",
}));

globalStyle("button", {
  cursor: "pointer",
  letterSpacing: 1,
});

globalStyle("a:focus, button:focus, input:focus, textarea:focus", {
  outline: "none",
});

globalStyle("svg", {
  height: "100%",
  width: "100%",
});

globalStyle("img", {
  maxWidth: "100%",
  verticalAlign: "middle",
});

globalStyle("pre", {
  font: "inherit",
  lineHeight: "inherit",
});

globalStyle("object", {
  display: "none",
});

globalStyle("b, strong", {
  fontWeight: 600,
});
