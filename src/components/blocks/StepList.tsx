export type Step = { title: string; body: string };

/**
 * Numbered steps. "grid" uses large Fraunces numerals (narrative, e.g. How it works);
 * "rows" uses mono indices in a hairline-separated list (operational, e.g. the
 * Five-Star Turnover system).
 */
export function StepList({
  steps,
  variant = "grid",
}: {
  steps: Step[];
  variant?: "grid" | "rows";
}) {
  if (variant === "rows") {
    return (
      <ol className="divide-y divide-line border-t border-line">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-5 py-6 md:gap-8">
            <span className="mono-meta shrink-0 pt-1 text-navy-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="heading-3">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {steps.map((step, i) => (
        <li key={step.title} className="border-t border-line pt-6">
          <span className="block font-display text-[2.5rem] leading-none text-navy-900/30">
            {i + 1}
          </span>
          <h3 className="heading-3 mt-4">{step.title}</h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted md:text-base">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
