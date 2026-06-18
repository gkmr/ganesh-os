import * as React from "react";

/**
 * Small marker: a cyan "kicker" eyebrow pill (optionally with a live pulse dot),
 * a mono uppercase "tag" chip, or a square status chip. Tones cover brand / status.
 *
 * @startingPoint section="Core" subtitle="Kicker, tag and status badges" viewport="700x120"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Shape/typography. @default "kicker" */
  variant?: "kicker" | "tag" | "square";
  /** Color tone. @default "brand" */
  tone?: "brand" | "violet" | "pass" | "fail" | "neutral";
  /** Show an animated pulse dot before the label. @default false */
  pulse?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): React.ReactElement;
