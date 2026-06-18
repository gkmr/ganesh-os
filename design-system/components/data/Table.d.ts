import * as React from "react";

export interface TableColumn {
  /** Row-object key for this column. */
  key: string;
  /** Header label. */
  header: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number | string;
  /** Render the cell in mono + tabular-nums. */
  mono?: boolean;
  /** Custom cell renderer. */
  render?: (value: any, row: any) => React.ReactNode;
}

/**
 * Hairline-separated dark table with a mono uppercase header and row hover. Backs the
 * agent catalog, fence table, and any tabular data.
 *
 * @startingPoint section="Data" subtitle="Data table" viewport="700x220"
 */
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  rows: Record<string, any>[];
}

export function Table(props: TableProps): React.ReactElement;
