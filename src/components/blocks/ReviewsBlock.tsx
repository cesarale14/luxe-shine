import { REVIEWS } from "@/content/site";
import { VerifiedStar } from "@/components/ui/VerifiedStar";

/**
 * Proof block. Renders real reviews when they exist; otherwise an HONEST placeholder —
 * never a seeded/fake testimonial (strategy §15: "absence is honest; fabrication is fatal").
 *
 * TODO(launch): add 3 real client reviews to REVIEWS in src/content/site.ts
 *   (verbatim quote, first name, neighborhood). Do not launch the proof block empty.
 */
export function ReviewsBlock() {
  if (REVIEWS.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-line bg-white p-8 text-center md:p-10">
        <VerifiedStar size={22} tone="palm" className="mx-auto" />
        <p className="mt-4 text-[1.0625rem] font-medium text-navy-900">
          Reviews, when they&rsquo;re real.
        </p>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          We publish verbatim client reviews with a first name and neighborhood — never
          seeded ratings or invented counts. Real quotes will appear here as they come in.
        </p>
        <p className="mono-meta mt-5 text-muted/80">
          {/* Visible dev placeholder — see TODO in ReviewsBlock / site.ts */}
          [ AWAITING 3 REAL REVIEWS ]
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {REVIEWS.slice(0, 3).map((r) => (
        <figure key={r.quote} className="rounded-card border border-line bg-white p-7 shadow-card">
          <VerifiedStar size={18} tone="palm" />
          <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-text">
            &ldquo;{r.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 mono-meta text-navy-700">
            {r.firstName} · {r.neighborhood}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
