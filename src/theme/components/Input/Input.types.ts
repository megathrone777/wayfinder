import type { TIconId } from "@/ui";

import type { InputHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  iconId?: TIconId;
  isError?: boolean;
  label?: string;
  restrictCyrillic?: boolean;
}
