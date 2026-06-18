import * as React from "react";
/**
 * A single transient notice with a tone-tinted accent and auto-dismiss. Use for
 * "decision applied", "auto-parked 63 items", eval results. Position it yourself.
 * @startingPoint section="Feedback" subtitle="Toast notice" viewport="700x140"
 */
export interface ToastProps {
  /** Tone. @default "info" */
  tone?: "info" | "success" | "warn" | "error";
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Auto-dismiss ms (0 = sticky). @default 4000 */
  duration?: number;
  /** Called on auto-dismiss or ✕. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): React.ReactElement;
