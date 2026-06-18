import * as React from "react";

export interface DayPlanTop {
  /** Domain for the slot color/label. */
  domain: "work" | "health" | "people" | "growth";
  /** The item text. */
  text: React.ReactNode;
}

/**
 * The morning plan: one MIT, a cross-domain top-3 (one slot per domain), and the
 * tiered backlog budget (today / this week / later / to prune). Mirrors the live
 * morning brief and enforces the today-budget cap visually.
 *
 * @startingPoint section="Messaging" subtitle="Morning brief: MIT + top-3 + budget" viewport="700x320"
 */
export interface DayPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Date/time label. @default "Tue · 7:42" */
  date?: React.ReactNode;
  /** The most important thing. */
  mit?: React.ReactNode;
  /** Top-3 ranked items, one per domain. */
  top?: DayPlanTop[];
  /** Backlog counts. */
  tiers?: { today?: number; week?: number; later?: number; prune?: number };
}

export function DayPlan(props: DayPlanProps): React.ReactElement;
