import { rgba, style } from "@/theme";

export const wrapperClass = style(({ animations, colors, easing }) => ({
  animation: `0.55s ${easing} 0s 1 normal both running ${animations.assemble}`,
  backgroundColor: colors.grayDarkest,
  border: `1px solid ${rgba("255, 255, 255", 0.14)}`,
  borderRadius: 16,
  overflow: "hidden",
  padding: 20,
}));
