import * as React from "react";

/**
 * A big tabular-nums number over a muted label — the brand's way of stating
 * load-bearing metrics. Use boxed for stat grids, unboxed for inline metric rows.
 *
 * @startingPoint section="Data" subtitle="Headline metric tile" viewport="700x140"
 */
export interface StatTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number / headline value, e.g. "99 → 0". */
  value: React.ReactNode;
  /** Caption beneath the value. */
  label: React.ReactNode;
  /** Number size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Wrap in a card surface. @default true */
  boxed?: boolean;
}

export function StatTile(props: StatTileProps): React.ReactElement;
