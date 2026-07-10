import type { TIconId } from "@/ui";

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  href?: __next_route_internal_types__.RouteImpl<string>;
  iconId?: null | TIconId;
  size?: "normal" | "small";
  template?: "primary" | "secondary" | "tertiary";
}
