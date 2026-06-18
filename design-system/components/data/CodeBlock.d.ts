import * as React from "react";

/**
 * The recurring "neon terminal" surface — near-black body, macOS traffic-light bar,
 * mono type. Compose pre content from the exported syntax spans (Cg/Cc/Ck/Cs/Cr/Cy).
 *
 * @startingPoint section="Data" subtitle="Neon terminal / code surface" viewport="700x220"
 */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title text shown after the traffic-light dots. */
  title?: React.ReactNode;
  /** Pre-formatted content (strings + syntax spans). */
  children?: React.ReactNode;
}

export function CodeBlock(props: CodeBlockProps): React.ReactElement;

/** Neon green — strings / OK. */
export function Cg(props: { children?: React.ReactNode }): React.ReactElement;
/** Comment grey. */
export function Cc(props: { children?: React.ReactNode }): React.ReactElement;
/** Violet keyword. */
export function Ck(props: { children?: React.ReactNode }): React.ReactElement;
/** Cyan string. */
export function Cs(props: { children?: React.ReactNode }): React.ReactElement;
/** Red error. */
export function Cr(props: { children?: React.ReactNode }): React.ReactElement;
/** Amber warning. */
export function Cy(props: { children?: React.ReactNode }): React.ReactElement;
