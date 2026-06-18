import * as React from "react";
/**
 * Native select styled to the dark field with a chevron. Pass <option> children.
 * @startingPoint section="Forms" subtitle="Dropdown select" viewport="700x90"
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  children?: React.ReactNode;
}
export function Select(props: SelectProps): React.ReactElement;
