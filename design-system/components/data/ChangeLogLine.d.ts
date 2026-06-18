import * as React from "react";

/**
 * One row of the append-only audit log: timestamp · owning agent · field written ·
 * verdict. Stack them to show the change-log spine; `blocked` renders the red
 * cross-lane / failed-eval state.
 *
 * @startingPoint section="Data" subtitle="Audit change-log row" viewport="700x110"
 */
export interface ChangeLogLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timestamp, e.g. "06:04". */
  time: string;
  /** Owning agent, e.g. "morning-sweep". */
  agent: string;
  /** Field written, e.g. "due_date(M51)". */
  field: string;
  /** Right-side verdict. @default "OK" */
  verdict?: string;
  /** Optional trailing comment. */
  note?: string;
  /** Red failed / cross-lane state. @default false */
  blocked?: boolean;
}

export function ChangeLogLine(props: ChangeLogLineProps): React.ReactElement;
