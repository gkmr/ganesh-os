import * as React from "react";

/**
 * The schematic-diagram surface: near-black inset, hairline border, rounded,
 * horizontal scroll for wide art. Frame a real in-palette SVG/PNG diagram inside it
 * (architecture.svg, hero.svg, system-flow). Do not hand-draw new icons here.
 *
 * @startingPoint section="Diagrams" subtitle="Schematic diagram frame" viewport="700x320"
 */
export interface DiagramFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono uppercase label above the diagram. */
  title?: React.ReactNode;
  /** Caption below the frame. */
  caption?: React.ReactNode;
  /** The diagram: an <img> or inline <svg>. */
  children?: React.ReactNode;
}

export function DiagramFrame(props: DiagramFrameProps): React.ReactElement;
