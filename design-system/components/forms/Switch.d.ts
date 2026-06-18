import * as React from "react";
/**
 * Pill toggle with a violet track when on. Use for binary settings (auto-park on/off).
 * @startingPoint section="Forms" subtitle="Switch toggle" viewport="700x80"
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  disabled?: boolean;
}
export function Switch(props: SwitchProps): React.ReactElement;
