import { keyframes } from "@vanilla-extract/css";

import { rgba, style } from "@/theme";

const shimmer = keyframes({
  from: { backgroundPosition: "-160px 0" },
  to: { backgroundPosition: "220px 0" },
});

// Placeholder hooks — styling is intentionally left to you. Each list item
// carries a `data-status` attribute ("done" | "active" | "waiting" | "queued"
// | "error") so you can drive the dot/connector/chip colours from CSS.
export const wrapperClass = style({});

export const headingClass = style({});

export const listClass = style({});

export const itemClass = style({});

export const markerClass = style({});

export const bodyClass = style({});

export const titleClass = style({});

export const detailClass = style({});

export const statusClass = style({});

export const progressClass = style(({ colors }) => ({
  animation: `${shimmer} 1.1s linear infinite`,
  background: `
    linear-gradient(
      90deg,
      ${rgba(colors.blue, 0.1)},
      ${rgba(colors.blue, 0.6)},
      ${rgba(colors.blue, 0.1)}
    )
  `,
  backgroundSize: "180px 100%",
  borderRadius: 3,
  height: 4,
  marginTop: 11,
}));
