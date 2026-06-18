import * as React from "react";

/**
 * The stable namespaced item handle (W#/M#/K#/V#/E#/I#/P#/PR#/J#) that makes an
 * item repliable and ties it to the daily manifest. The namespace prefix sets the
 * tint automatically. Optionally show a trailing decision verb.
 *
 * @startingPoint section="Content" subtitle="Repliable item handle" viewport="700x90"
 */
export interface HandleProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Handle id, e.g. "M51", "V3", "PR2", "J12a". @default "M51" */
  id?: string;
  /** Trailing decision verb, e.g. "done", "push Thu", "p1". */
  decision?: string;
}

export function Handle(props: HandleProps): React.ReactElement;
