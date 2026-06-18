import * as React from "react";
/**
 * Centered modal over a blurred dark scrim. Closes on overlay click and Escape. Provide
 * body + footer actions as children. Use for confirmation gates (prune/drop).
 * @startingPoint section="Feedback" subtitle="Modal dialog" viewport="700x360"
 */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  /** Max width in px. @default 460 */
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Dialog(props: DialogProps): React.ReactElement | null;
