import React, { useMemo } from "react";

/**
 * RouteCanvas — the "Route" block from the Wayfinder cockpit canvas.
 *
 * Renders a schematic route: a grid backdrop, a stroked polyline connecting
 * the stops, and a labelled node per stop. When `drawn` flips to true the
 * route line animates in via an SVG stroke-dashoffset transition.
 *
 * The coordinate space is the fixed 600×300 viewBox — give each stop an
 * (x, y) in that space. The SVG scales fluidly to its container width.
 */

export interface RouteStop {
  /** Stable key + label text shown next to the node. */
  label: string;
  /** X position in the 600×300 viewBox. */
  x: number;
  /** Y position in the 600×300 viewBox. */
  y: number;
  /** Label offset from the node (defaults to +12 / +4 — right of the dot). */
  labelDx?: number;
  labelDy?: number;
}

export interface RouteCanvasProps {
  stops: RouteStop[];
  /** Right-aligned status caption, e.g. "4 stops · draft" or "Locked · 4 stops". */
  routeLabel?: string;
  /** When true, the route line is fully drawn; when false it's hidden and draws in on change. */
  drawn?: boolean;
  /** Close the polyline back to the first stop (loop). Default true. */
  closed?: boolean;
  /** Accent color for the line + primary node. Default the Wayfinder blue. */
  accent?: string;
  /** Disable the draw-in animation. */
  reduceMotion?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VIEW_W = 600;
const VIEW_H = 300;
const SURFACE = "#10141a";

const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 16,
  background: "#12161c",
  padding: 20,
};

const header: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
};

const eyebrow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: ".14em",
  textTransform: "uppercase",
};

const captionStyle: React.CSSProperties = {
  fontSize: 13.5,
  color: "#98a0aa",
};

const plot: React.CSSProperties = {
  position: "relative",
  borderRadius: 12,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,.1)",
  background: SURFACE,
};

/** Build the "M x y L x y …" path and its total length (for dash animation). */
const useRoutePath = (stops: RouteStop[], closed: boolean) => {
  return useMemo(() => {
    if (stops.length === 0) return { d: "", length: 0 };
    const pts = stops.map((s) => `${s.x} ${s.y}`);
    const d = `M${pts[0]} ${pts
      .slice(1)
      .map((p) => `L${p}`)
      .join(" ")}${closed ? " Z" : ""}`;

    // Approximate perimeter length so dasharray/offset fully hides the line.
    let length = 0;

    for (let i = 1; i < stops.length; i++) {
      length += Math.hypot(stops[i].x - stops[i - 1].x, stops[i].y - stops[i - 1].y);
    }

    if (closed && stops.length > 1) {
      length += Math.hypot(
        stops[0].x - stops[stops.length - 1].x,
        stops[0].y - stops[stops.length - 1].y
      );
    }

    return { d, length: Math.ceil(length) + 4 };
  }, [stops, closed]);
};

export const RouteCanvas: React.FC<RouteCanvasProps> = ({
  stops,
  routeLabel = "",
  drawn = true,
  closed = true,
  accent = "#4f8cff",
  reduceMotion = false,
  className,
  style,
}) => {
  const { d, length } = useRoutePath(stops, closed);
  const gridId = useMemo(() => `route-grid-${Math.random().toString(36).slice(2, 8)}`, []);

  return (
    <div
      className={className}
      style={{ ...card, ...style }}
    >
      <div style={header}>
        <span style={{ ...eyebrow, color: accent }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent }} />
          Route
        </span>

        {routeLabel ? <span style={captionStyle}>{routeLabel}</span> : null}
      </div>

      <div style={plot}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          style={{ width: "100%", display: "block" }}
        >
          <defs>
            <pattern
              id={gridId}
              width={30}
              height={30}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0H0V30"
                fill="none"
                stroke="rgba(255,255,255,.06)"
                strokeWidth={1}
              />
            </pattern>
          </defs>

          <rect
            width={VIEW_W}
            height={VIEW_H}
            fill={`url(#${gridId})`}
          />

          {/* route line — draws in via dashoffset when `drawn` toggles */}
          <path
            d={d}
            fill="none"
            stroke={accent}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
            strokeDasharray={length}
            style={{
              strokeDashoffset: drawn ? 0 : length,
              transition: reduceMotion ? "none" : "stroke-dashoffset 1.5s ease",
            }}
          />

          {/* stop nodes + labels */}
          <g
            fontFamily="'JetBrains Mono', monospace"
            fontSize={12}
            fill="#d6dbe2"
          >
            {stops.map((s, i) => {
              const primary = i === 0;
              return (
                <g key={s.label}>
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={primary ? 7 : 6}
                    fill={primary ? accent : SURFACE}
                    stroke={primary ? undefined : accent}
                    strokeWidth={primary ? undefined : 2.5}
                  />
                  <text
                    x={s.x + (s.labelDx ?? 12)}
                    y={s.y + (s.labelDy ?? 4)}
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RouteCanvas;

/* ---------------------------------------------------------------------------
 * Example — the Lisbon route from the cockpit:
 *
 * const LISBON_STOPS: RouteStop[] = [
 *   { label: "Lisbon",  x: 300, y: 148 },
 *   { label: "Belém",   x: 212, y: 190 },
 *   { label: "Cascais", x: 112, y: 202, labelDx: -56, labelDy: 20 },
 *   { label: "Sintra",  x: 152, y: 86 },
 * ];
 *
 * <RouteCanvas
 *   stops={LISBON_STOPS}
 *   routeLabel={finalized ? "Locked · 4 stops" : "4 stops · draft"}
 *   drawn={finalized}
 * />
 * ------------------------------------------------------------------------- */
