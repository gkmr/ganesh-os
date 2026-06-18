import * as React from "react";

export interface DigestItem {
  /** Repliable handle id, e.g. "E1". */
  handle: string;
  /** The action line. */
  text: React.ReactNode;
  /** Optional decision verb shown after the handle. */
  decision?: string;
}

/**
 * One channel's digest in house style: bracket tag + one-line summary with counts and
 * "N need you", action items first (each with a handle), FYIs compressed, filtered noise
 * on one line. Mirrors the live SMS/email digest format.
 *
 * @startingPoint section="Messaging" subtitle="House-style channel digest" viewport="700x320"
 */
export interface DigestBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source channel for the bracket tag. @default "gmail" */
  channel?: string;
  /** Line-1 summary with counts, e.g. "7 unread that matter, 2 need you." */
  summary: React.ReactNode;
  /** Action items, rendered first. */
  items?: DigestItem[];
  /** Compressed FYI lines. */
  fyis?: React.ReactNode[];
  /** Trailing filtered-noise line. */
  noise?: React.ReactNode;
}

export function DigestBlock(props: DigestBlockProps): React.ReactElement;
