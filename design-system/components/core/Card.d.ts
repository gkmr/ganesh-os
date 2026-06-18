import * as React from "react";

/**
 * The default Ganesh OS surface — dark card with hairline border, large radius and
 * soft shadow. Optional domain-colored accent edge and an interactive hover lift + glow.
 *
 * @startingPoint section="Core" subtitle="Surface card with domain accent + hover glow" viewport="700x200"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Domain or any CSS color for the accent edge. */
  accent?: "work" | "health" | "people" | "growth" | "brand" | string;
  /** Which edge the accent sits on. @default "top" */
  accentSide?: "top" | "left";
  /** Enable hover lift + violet glow. @default false */
  interactive?: boolean;
  /** Use the subtle top-down surface gradient instead of flat. @default false */
  gradientSurface?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): React.ReactElement;

export interface CardEyebrowProps {
  accent?: "work" | "health" | "people" | "growth" | "brand" | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CardEyebrow(props: CardEyebrowProps): React.ReactElement;

export interface CardOwnerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CardOwner(props: CardOwnerProps): React.ReactElement;
