import React from "react";

import { Box } from "@/ui";

import {
  captionClass,
  gridStrokeClass,
  labelsClass,
  nodeClass,
  nodePrimaryClass,
  plotClass,
  routeLineClass,
  svgClass,
} from "./RouteCanvas.css";

export interface TRouteStop {
  label: string;
  labelDx?: number;
  labelDy?: number;
  x: number;
  y: number;
}

const height: number = 300;
const width: number = 600;

const buildRoute = (stops: TRouteStop[], closed: boolean): { d: string; length: number } => {
  const [first, ...rest] = stops;

  if (!first) return { d: "", length: 0 };

  const d = `M${first.x} ${first.y} ${rest
    .map((stop) => `L${stop.x} ${stop.y}`)
    .join(" ")}${closed ? " Z" : ""}`;
  let length = 0;
  let previous = first;

  for (const stop of rest) {
    length += Math.hypot(stop.x - previous.x, stop.y - previous.y);
    previous = stop;
  }

  if (closed && rest.length > 0) {
    length += Math.hypot(first.x - previous.x, first.y - previous.y);
  }

  return { d, length: Math.ceil(length) + 4 };
};

const RouteCanvas: React.FC = async () => {
  const response = await fetch(`${process.env.PUBLIC_URL}/mock/route.json`);
  const stops = (await response.json()) as TRouteStop[];
  const { d, length } = buildRoute(stops, true);
  const gridId: string = "route-grid";

  return (
    <Box
      header={
        <span className={captionClass}>
          Locked <strong>·</strong> 4 stops
        </span>
      }
      title="Route"
    >
      <div className={plotClass}>
        <svg
          className={svgClass}
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <pattern
              height={30}
              id={gridId}
              patternUnits="userSpaceOnUse"
              width={30}
            >
              <path
                className={gridStrokeClass}
                d="M30 0H0V30"
              />
            </pattern>
          </defs>

          <rect
            {...{ height, width }}
            fill={`url(#${gridId})`}
          />

          <path
            {...{ d }}
            className={routeLineClass}
            style={{ "--route-length": length } as React.CSSProperties}
          />

          <g className={labelsClass}>
            {stops.map((stop, index) => (
              <g key={stop.label}>
                <circle
                  className={index === 0 ? nodePrimaryClass : nodeClass}
                  cx={stop.x}
                  cy={stop.y}
                  r={index === 0 ? 7 : 6}
                />
                <text
                  x={stop.x + (stop.labelDx ?? 12)}
                  y={stop.y + (stop.labelDy ?? 4)}
                >
                  {stop.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Box>
  );
};

export { RouteCanvas };
