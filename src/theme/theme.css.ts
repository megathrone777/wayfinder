import { createTheme } from "@vanilla-extract/css";

import { animations, colors, fonts } from "./variables";

const [themeClass, vars] = createTheme({
  animations,
  colors,
  easing: "cubic-bezier(0.79, 0.14, 0.15, 0.86)",
  fonts,
  safeAreas: {
    insetBottom: "env(safe-area-inset-bottom)",
    insetTop: "env(safe-area-inset-top)",
  },
});

export { themeClass, vars };
