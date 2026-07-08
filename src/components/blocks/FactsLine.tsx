import { FACTS } from "@/content/site";

/**
 * Facts, as a plain sentence (v2.2 §3 — no interpunct triad, no badges, no mono tell).
 * Content lives in FACTS (src/content/site.ts).
 */
export function FactsLine({
  className = "",
  tone = "muted",
}: {
  className?: string;
  tone?: "muted" | "on-dark";
}) {
  return (
    <p
      className={`text-[0.9375rem] leading-relaxed ${
        tone === "on-dark" ? "text-ivory/70" : "text-muted"
      } ${className}`.trim()}
    >
      {FACTS.join(". ")}.
    </p>
  );
}
