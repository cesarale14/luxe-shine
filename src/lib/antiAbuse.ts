/**
 * Client-side anti-abuse gate for the quote card/form (v2.1 §QuoteCard).
 * A submission is treated as a bot if the honeypot field is filled OR it arrives
 * sooner than a human could plausibly complete the fields (<2s after render).
 *
 * NOTE: this is defense-in-depth only. Server-side rate limiting still required.
 * TODO(launch): add per-IP rate limiting on the real submit endpoint.
 */
export const MIN_SUBMIT_MS = 2000;

export function isLikelyBot(opts: { honeypot: string; elapsedMs: number }): boolean {
  return opts.honeypot.trim() !== "" || opts.elapsedMs < MIN_SUBMIT_MS;
}
