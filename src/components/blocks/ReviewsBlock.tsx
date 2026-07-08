import { REVIEWS } from "@/content/site";
import { VerifiedStar } from "@/components/ui/VerifiedStar";

/**
 * Real reviews only (v2.2 — "real artifacts or nothing"). Renders nothing below 2 real
 * entries; an absent section is honest, a seeded/placeholder testimonial is not. The
 * homepage proof section is gated on the same >= 2 rule, so there is no empty state.
 *
 * TODO(launch): add real client reviews to REVIEWS in src/content/site.ts
 *   (verbatim quote, first name, neighborhood).
 */
export function ReviewsBlock() {
  if (REVIEWS.length < 2) return null;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {REVIEWS.slice(0, 3).map((r) => (
        <figure key={r.quote} className="rounded-card border border-line bg-white p-7 shadow-card">
          <VerifiedStar size={18} tone="palm" />
          <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-text">
            &ldquo;{r.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 mono-meta text-navy-700">
            {r.firstName} — {r.neighborhood}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
