export type TIconId = "angle" | "checkmark" | "exclamation" | "return";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconId;
}
