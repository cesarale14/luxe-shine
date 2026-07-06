import { FACTS } from "@/content/site";

/** Typeset facts line — once per page, no badges (v2 §16). */
export function FactsLine({
  className = "",
  tone = "muted",
}: {
  className?: string;
  tone?: "muted" | "on-dark";
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 mono-meta ${
        tone === "on-dark" ? "text-ivory/60" : ""
      } ${className}`.trim()}
    >
      {FACTS.map((f, i) => (
        <li key={f} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden="true" className="text-line-hover">
              ·
            </span>
          )}
          {f}
        </li>
      ))}
    </ul>
  );
}
