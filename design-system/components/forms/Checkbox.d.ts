import * as React from "react";
/**
 * Custom dark checkbox with a violet fill when on. Pass an inline `label`.
 * @startingPoint section="Forms" subtitle="Checkbox" viewport="700x80"
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  disabled?: boolean;
}
export function Checkbox(props: CheckboxProps): React.ReactElement;
