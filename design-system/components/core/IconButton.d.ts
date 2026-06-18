import * as React from "react";

/**
 * Icon-only square or round control for toolbars and message rows. Pass a unicode
 * glyph (▶ → ↓ ✕) as children and always supply `label` for accessibility.
 *
 * @startingPoint section="Core" subtitle="Icon-only button (ghost / solid / soft)" viewport="700x110"
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "ghost" */
  variant?: "ghost" | "solid" | "soft";
  /** Size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a circle. @default false */
  round?: boolean;
  /** Accessible label (also the title tooltip). */
  label?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): React.ReactElement;
