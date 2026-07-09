import type React from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  footer?: React.ReactNode;
  header?: React.ReactNode;
  title: string;
}
