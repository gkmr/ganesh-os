import * as React from "react";
/**
 * Dark text field with a hairline border and violet focus ring. Optional mono prefix
 * and an invalid (red) state.
 * @startingPoint section="Forms" subtitle="Text input" viewport="700x90"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Red invalid border. @default false */
  invalid?: boolean;
  /** Mono prefix shown inside the field, e.g. "@" or "https://". */
  prefix?: React.ReactNode;
}
export function Input(props: InputProps): React.ReactElement;
