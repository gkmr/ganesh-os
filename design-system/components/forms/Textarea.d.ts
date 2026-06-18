import * as React from "react";
/**
 * Multiline text field matching Input (hairline border, violet focus ring, vertical resize).
 * @startingPoint section="Forms" subtitle="Multiline textarea" viewport="700x140"
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export function Textarea(props: TextareaProps): React.ReactElement;
