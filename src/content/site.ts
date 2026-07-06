/**
 * Centralized site content and business data.
 *
 * PLACEHOLDER POLICY (per the implementation pack + strategy §15):
 *   Values wrapped in [BRACKETS] are launch blockers — real data must replace them
 *   before publishing. Nothing here is invented as fake proof. See LAUNCH_BLOCKERS
 *   below and the isPlaceholder() helper used by components to render honestly.
 */

export const SITE = {
  brand: "Luxe Shine",
  legalName: "Luxe Shine Solutions LLC", // never shown in headlines/nav/hero/CTAs
  tagline: "Hotel-standard cleaning for Tampa homes and rentals.",
  region: "Tampa, FL",
  addressLocality: "Tampa",
  addressRegion: "FL",

  // TODO(launch): replace every [PLACEHOLDER] before publishing.
  phone: {
    display: "[ADD PHONE]", // TODO(launch): real phone number
    href: null as string | null, // e.g. "tel:+18135550100" — enables click-to-call
  },
  email: "[ADD EMAIL]", // TODO(launch): real inbox that is monitored within the SLA
  ownerFirstName: "[OWNER FIRST NAME]", // TODO(launch): used in the post-submit confirmation

  // Business hours drive the quote SLA copy. [ADJUST] to real operating hours.
  hoursDisplay: "Monday–Saturday, 8 AM–6 PM", // [ADJUST]

  url: "https://luxeshinesolutionsllc.com", // canonical production domain
  gbpUrl: null as string | null, // TODO(launch): Google Business Profile review link
} as const;

/**
 * SLA / backend safety.
 * The pack is explicit: do NOT treat the 2-business-hour promise as production-safe
 * until form submissions create an instant owner notification, tested end-to-end.
 * The form currently uses a placeholder submit handler (no backend), so:
 *   - OWNER_NOTIFICATION_IMPLEMENTED stays false
 *   - copy still reads "within 2 business hours" (per the pack), but everywhere it
 *     appears there is a TODO to downgrade to "same business day" if the notification
 *     pipeline is not live at launch.
 */
export const OWNER_NOTIFICATION_IMPLEMENTED = false;
export const SLA_MICROCOPY = "Quotes within 2 business hours.";
// TODO(launch): if OWNER_NOTIFICATION_IMPLEMENTED is false at go-live, change every
// SLA line to "Quotes the same business day." Never publish a promise you can't keep.

export const NAV: { label: string; href: string; cta?: boolean }[] = [
  { label: "Residential", href: "/residential" },
  { label: "STR Turnovers", href: "/str-turnovers" },
  { label: "Our Standard", href: "/our-standard" },
  { label: "Request a Quote", href: "/request-a-quote", cta: true },
];

export const TRUST_SIGNALS = [
  "Insured & bonded",
  "Background-checked crews",
  "Photo-verified results",
  "24-hour re-clean guarantee",
] as const;

export const SERVICE_AREAS = [
  "South Tampa",
  "Hyde Park",
  "Palma Ceia",
  "Davis Islands",
  "Harbour Island",
  "Channelside",
  "Downtown Tampa",
  "Seminole Heights",
  "Westchase",
] as const;

export const SERVICES = [
  { name: "Signature Clean", blurb: "Recurring weekly or biweekly residential maintenance." },
  { name: "The Deep Reset", blurb: "Deep clean and the mandatory onboarding clean for new recurring clients." },
  { name: "Move-Ready Clean", blurb: "Move-in and move-out cleaning for vacant homes." },
  { name: "Five-Star Turnover", blurb: "STR turnover: clean, stage, restock, photo report, and flags." },
  { name: "Host Partner Program", blurb: "For co-hosts and managers running multiple units." },
  { name: "The Luxe Shine Guarantee", blurb: "Anything missed, re-cleaned within 24 hours." },
] as const;

/**
 * Policy defaults chosen in the copy deck. Each is marked [ADJUST] — confirm the
 * real operational value before launch, or the guarantee/SLA copy creates disputes.
 * Rendered cleanly on-page; tracked as launch blockers below.
 */
export const POLICY = {
  rescheduleWindow: "48 hours", // [ADJUST] real free-reschedule window
  sameDayCutoff: "10:00 AM", // [ADJUST] real same-day STR booking cutoff
  linenModel: "on-site laundering or a linen swap program", // [ADJUST] real linen model
  guaranteeClaimWindow: "24 hours",
  reCleanWindow: "one business day", // [ADJUST] real re-clean scheduling reality
  hostPartnerMinUnits: 5,
} as const;

/** Real reviews only. Empty until collected — never seed fake testimonials (§15). */
export const REVIEWS: { quote: string; firstName: string; neighborhood: string }[] = [
  // TODO(launch): add 3 real client reviews, quoted verbatim, first name + neighborhood.
  // Ask current clients now; do not launch the proof block with fabricated quotes.
];

export const SEO = {
  home: {
    title: "House Cleaning & Airbnb Turnovers in Tampa | Luxe Shine",
    description:
      "Photo-verified cleaning for Tampa homes and short-term rentals. Insured, background-checked crews. Written 24-hour guarantee. Quotes within 2 business hours.",
  },
  residential: {
    title: "Recurring House Cleaning & Deep Cleaning in Tampa | Luxe Shine",
    description:
      "Premium recurring house cleaning in Tampa — same trained crew whenever schedules allow, published checklist, photo report after every visit. Deep cleans and move-out cleans available.",
  },
  str: {
    title: "Airbnb & Vacation Rental Turnover Cleaning in Tampa | Luxe Shine",
    description:
      "Short-term rental turnover cleaning in Tampa — cleaned, staged, restocked, and photo-confirmed before every check-in. Damage flags included. Built by Tampa hosts.",
  },
  ourStandard: {
    title: "Our Cleaning Standard, Checklists & Guarantee | Luxe Shine Tampa",
    description:
      "The published Luxe Shine checklists, our photo-verification process, written guarantee terms, insurance, and crew standards. Read exactly how we work before you request a quote.",
  },
  quote: {
    title: "Request a Cleaning Quote in Tampa | Luxe Shine",
    description:
      "Flat-rate cleaning quotes for Tampa homes and short-term rentals — in writing, within 2 business hours. No hourly billing.",
  },
} as const;

/** True when a value is still an unfilled placeholder. Components use this to
 *  avoid rendering broken links / fake data before real values land. */
export const isPlaceholder = (v: string | null | undefined): boolean =>
  !v || v.includes("[");

/** Surfaced in the build summary + docs. Not rendered to visitors. */
export const LAUNCH_BLOCKERS = [
  "Real phone number (enables header + mobile click-to-call)",
  "Real email address (monitored within the SLA)",
  "Owner first name (post-submit confirmation)",
  "Google Business Profile link (canonical domain is set: luxeshinesolutionsllc.com)",
  "Quote form backend + instant owner SMS/email notification, tested end-to-end",
  "2-hour SLA operationally safe (else downgrade copy to 'same business day')",
  "3 real client reviews (verbatim, first name + neighborhood)",
  "Real work photography (hero, before/after, finished rooms, anonymized photo report)",
  "Insurance/bonding + background-check language confirmed",
  "Policy defaults confirmed: reschedule window, same-day STR cutoff, linen model, re-clean window",
  "Legal footer wording reviewed",
] as const;
