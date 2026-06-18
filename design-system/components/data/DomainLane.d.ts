import * as React from "react";

/**
 * The signature four-domains row: a labelled, color-coded flowing progress track
 * with a mono count. Use a stack of four (work / health / people / growth) to show
 * balance; `quiet` dims a starved lane.
 *
 * @startingPoint section="Data" subtitle="Color-coded life-domain progress lane" viewport="700x120"
 */
export interface DomainLaneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lane name, e.g. "Work / company". */
  name: string;
  /** Small sub-label under the name. */
  sub?: string;
  /** Domain color. @default "work" */
  domain?: "work" | "health" | "people" | "growth" | "brand" | string;
  /** Right-side count, e.g. "48 today". */
  count?: React.ReactNode;
  /** Dim the lane to show neglect. @default false */
  quiet?: boolean;
  /** Animate the flowing fill. @default true */
  flow?: boolean;
  /** Animation start delay in seconds. @default 0 */
  delay?: number;
}

export function DomainLane(props: DomainLaneProps): React.ReactElement;
