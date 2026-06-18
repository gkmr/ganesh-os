import * as React from "react";
/**
 * Hover/focus tooltip — a small dark glassy bubble above or below its single trigger child.
 * @startingPoint section="Feedback" subtitle="Tooltip" viewport="700x120"
 */
export interface TooltipProps {
  /** Tooltip content. */
  content: React.ReactNode;
  /** Side relative to the trigger. @default "top" */
  side?: "top" | "bottom";
  /** The trigger element. */
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): React.ReactElement;
