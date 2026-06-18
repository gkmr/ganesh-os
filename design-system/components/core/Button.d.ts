import * as React from "react";

/**
 * Pill-shaped button. Primary uses the violet brand gradient and glows on hover;
 * ghost is a transparent hairline-bordered variant.
 *
 * @startingPoint section="Core" subtitle="Primary / ghost / soft pill buttons" viewport="700x140"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "ghost" | "soft";
  /** Size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a different element, e.g. "a" for links. @default "button" */
  as?: "button" | "a";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): React.ReactElement;
