import * as React from "react";

export interface DecisionRow {
  /** Stable repliable handle, e.g. "J01". */
  handle: string;
  /** Source list, e.g. "Pipeline". */
  list?: string;
  /** Item title. */
  title: React.ReactNode;
  /** Due label; "overdue" tints red. */
  due?: string;
  /** Short routing tag, e.g. "act", "warm", "call". */
  tag?: string;
  /** The decision: keep / done / push <when> / drop / list <name> / p1-3. Blank = pending edit. */
  decision?: string;
  /** Applied and stamped, so it never re-fires. */
  applied?: boolean;
}

/**
 * The two-way decision canvas (pattern #3): triage writes the rows, the human edits
 * only the DECISION cell, the processor applies and stamps each. A blank decision cell
 * renders as an editable placeholder; an applied row is checked and tinted.
 *
 * @startingPoint section="Messaging" subtitle="Two-way decision canvas table" viewport="700x300"
 */
export interface DecisionCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tier title, e.g. "T1 — apply now". */
  title?: React.ReactNode;
  rows?: DecisionRow[];
}

export function DecisionCanvas(props: DecisionCanvasProps): React.ReactElement;
