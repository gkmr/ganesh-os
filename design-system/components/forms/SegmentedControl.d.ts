import * as React from "react";

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
}

/**
 * A pill row of 2-4 mutually exclusive options; the active one gets the violet
 * gradient. Matches the landing nav/tab pill motif. Use for tier/domain/view switches.
 *
 * @startingPoint section="Forms" subtitle="Segmented control" viewport="700x90"
 */
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Options as strings or {value,label}. */
  options: (string | SegmentOption)[];
  /** Selected value. */
  value?: string;
  /** Called with the new value. */
  onChange?: (value: string) => void;
  /** Size. @default "md" */
  size?: "sm" | "md";
}

export function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
