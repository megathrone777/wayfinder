export type TIconId =
  | "angle"
  | "checkmark"
  | "close"
  | "download"
  | "exclamation"
  | "mail"
  | "moveRight"
  | "refresh"
  | "return";

export interface TProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  id: TIconId;
}
