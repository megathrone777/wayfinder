import type React from "react";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface TProps extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label: React.ReactNode | string;
  template?: "normal" | "small";
}
