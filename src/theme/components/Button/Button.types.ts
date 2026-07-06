import type { TIconId } from "@/ui";

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import type { LinkProps } from "next/link";

export interface TProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  href?: LinkProps<string>["href"];
  iconId?: null | TIconId;
  size?: "normal" | "small";
  template?: "primary" | "secondary" | "tertiary";
}
