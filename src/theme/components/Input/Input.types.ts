import type { InputHTMLAttributes, DetailedHTMLProps } from "react";

export interface TProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  isError?: boolean;
  label?: string;
  restrictCyrillic?: boolean;
}
