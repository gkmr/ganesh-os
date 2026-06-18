import * as React from "react";

export interface TabItem {
  value: string;
  label: React.ReactNode;
}

/**
 * Controlled underline tab strip (active tab gets a violet underline). Renders the
 * strip only; you render the active panel below it.
 *
 * @startingPoint section="Navigation" subtitle="Tab strip" viewport="700x100"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: (string | TabItem)[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Tabs(props: TabsProps): React.ReactElement;
