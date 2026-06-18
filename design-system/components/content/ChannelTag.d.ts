import * as React from "react";

/**
 * The bracket source tag that leads every outbound agent line ([gmail], [slack],
 * [imessage] …). Mono, lowercase, tinted per channel.
 *
 * @startingPoint section="Content" subtitle="Channel bracket tag" viewport="700x90"
 */
export interface ChannelTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Channel name (case-insensitive). @default "imessage" */
  channel?: "gmail" | "email" | "slack" | "imessage" | "sms" | "whatsapp" | "voice" | "intake" | string;
}

export function ChannelTag(props: ChannelTagProps): React.ReactElement;
