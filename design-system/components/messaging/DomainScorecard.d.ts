import * as React from "react";

export interface ScorecardDomain {
  domain: "work" | "health" | "people" | "growth";
  /** Short label, e.g. "Protein". */
  label: React.ReactNode;
  /** Readout value, e.g. "66 / 180 g". */
  value: React.ReactNode;
  /** Met target? Tints the value green. */
  ok?: boolean;
}

/**
 * The nightly scorecard: an MIT-met headline with a grade chip, wins, what slipped,
 * a per-domain readout, and tomorrow's first move. A reset day is named kindly, as
 * data, never as failure.
 *
 * @startingPoint section="Messaging" subtitle="End-of-day scorecard with grade" viewport="700x340"
 */
export interface DomainScorecardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Date label. @default "That night" */
  date?: React.ReactNode;
  /** Grade. @default "strong" */
  grade?: "exceeded" | "strong" | "solid" | "partial" | "reset";
  /** One-line summary, e.g. "MIT met. Top 3 ≈ 2.5 of 3. 23 things done." */
  headline?: React.ReactNode;
  wins?: React.ReactNode[];
  slipped?: React.ReactNode[];
  domains?: ScorecardDomain[];
  /** Tomorrow's first move. */
  tomorrow?: React.ReactNode;
}

export function DomainScorecard(props: DomainScorecardProps): React.ReactElement;
