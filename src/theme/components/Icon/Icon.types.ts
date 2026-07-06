export type TIconId = "angle" | "checkmark" | "exclamation" | "moveRight" | "refresh" | "return";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconId;
}
