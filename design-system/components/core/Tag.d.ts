import * as React from "react";

/**
 * Small labelled chip that categorizes content (a life-domain, a list name).
 * Optional leading domain dot and a remove ✕. Distinct from Badge, which marks status.
 *
 * @startingPoint section="Core" subtitle="Labelled chip with optional domain dot" viewport="700x100"
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show a leading dot in this domain/color. */
  domain?: "work" | "health" | "people" | "growth" | "brand" | string;
  /** Show a remove ✕ and call this on click. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Size. @default "md" */
  size?: "sm" | "md";
  children?: React.ReactNode;
}

export function Tag(props: TagProps): React.ReactElement;
