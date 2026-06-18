import * as React from "react";

/**
 * A plain iMessage/SMS bubble — incoming (dark, left) or outgoing (violet, right),
 * with an optional lead status emoji and timestamp. Plain text only, per house style.
 *
 * @startingPoint section="Messaging" subtitle="iMessage / SMS bubble" viewport="700x160"
 */
export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Who sent it. @default "them" */
  from?: "them" | "me";
  /** Optional leading status emoji (🗓 🌙 💬). */
  emoji?: string;
  /** Timestamp shown under the bubble. */
  time?: string;
  children?: React.ReactNode;
}

export function MessageBubble(props: MessageBubbleProps): React.ReactElement;
