# Luxe Shine Website Project

## Business

Luxe Shine is a premium residential and short-term rental cleaning company serving Tampa, FL.

The customer-facing brand is **Luxe Shine**.

The legal entity is Luxe Shine Solutions LLC, but do not use "Solutions LLC" in major
headlines, navigation, hero sections, CTAs, or premium brand copy. Use the public brand
name: **Luxe Shine**. (It appears only in the footer legal line.)

## Positioning

Public one-liner: **Hotel-standard cleaning for Tampa homes and rentals.**

Luxe Shine is Tampa's operator-grade cleaning company for premium homes and short-term
rentals. It does not sell generic cleaning — it sells reliability, photo-verified results,
published standards, and the confidence that the client doesn't have to think about
cleaning. The brand is a **property care partner**, not a basic maid service.

## Services

Signature Clean · The Deep Reset (mandatory onboarding clean) · Move-Ready Clean ·
Five-Star Turnover · Host Partner Program · The Luxe Shine Guarantee (24-hour re-clean).

## Pages (launch set — do not add more)

Home · Residential · STR Turnovers · Our Standard · Request a Quote.
Nav: Residential · STR Turnovers · Our Standard · Request a Quote. Logo links Home.

## CTA rules

Primary CTA is always **"Request a Quote."** Secondary is **"STR Turnover Quote."**
Never "Get Started / Book Now / Contact Us / Schedule Now." Quote-based, not instant-book.

## Design (enforced in code)

Premium, calm, modern, warm-but-disciplined, high whitespace. Navy/ivory/sand palette,
palm green ONLY for verified/guarantee moments. Wordmark header (the full-color logo is
kept out of the UI — see `docs/luxe-shine/luxe-shine-design-direction.md` §0).

Avoid: cheap maid-service look, stock-photo energy, lime green / royal-blue UI, gradients,
sparkles/bubbles/spray-bottles/gloves/squeegee icons, exclamation points, "affordable",
"we treat your home like our own", fake claims/counters/reviews/ratings, animated counters,
testimonial carousels, entry popups, countdown timers, unmanned chat bubbles.

## Honesty rules (non-negotiable)

Never invent reviews, ratings, counts, years in business, awards, certifications, or
before/after photos. Missing real content is marked with a **visible placeholder + TODO**,
never fabricated. See `LAUNCH_BLOCKERS` and `isPlaceholder()` in `src/content/site.ts`.

---

## Technical

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react icons.
- **Fonts:** Fraunces (display) + IBM Plex Mono (metadata) via `next/font/google`;
  General Sans (body) via Fontshare `<link>`. Wired in `src/app/layout.tsx`.
- **Design tokens:** source of truth in `src/app/globals.css` (`:root`), mirrored in
  `tailwind.config.ts`. Typographic classes: `.display-1/2`, `.heading-3`, `.eyebrow`,
  `.lede`, `.mono-meta`.
- **Content is centralized** in `src/content/` — `site.ts` (NAP, nav, policies,
  placeholders, SEO strings), `faqs.ts`, `checklists.ts`. Edit copy there, not in pages.
- **Real artifacts or nothing (v2.2):** never reconstruct an operational document (report
  card, verification receipt) in the UI with sample data — a mocked report is fabricated
  evidence. Proof = real reviews, gated on `>= 2` real entries, else the section is omitted.
- **Quote form:** `components/quote/QuoteForm.tsx` — conditional home/STR branches, client
  validation, honeypot, success state, **placeholder submit handler (no backend yet)**.

### Commands

```bash
npm run dev        # local dev
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run build      # production build — run on Vercel
```

### Before production — search the codebase for `TODO(launch)` and `[ADJUST]`

Key blockers: real phone/email/owner name · quote-form backend + **instant owner
notification tested end-to-end before the 2-business-hour SLA is published** (else change
SLA copy to "same business day") · 3 real reviews · real photography · confirmed policies
(reschedule window, same-day STR cutoff, linen model) · reviewed legal footer.

Source-of-truth docs live in `docs/luxe-shine/`.
