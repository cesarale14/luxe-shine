/**
 * FAQ content, verbatim from the copy deck (page 1–5).
 *
 * Policy-default answers (reschedule window, linen model, restock billing) come from
 * POLICY in site.ts. The copy deck marked these [ADJUST]; they render cleanly here and
 * are tracked as launch blockers. Confirm real values before publishing.
 */
import { POLICY } from "./site";

export type Faq = { q: string; a: string };

export const HOME_FAQS: Faq[] = [
  {
    q: "Are you insured?",
    a: "Yes — insured and bonded. Certificate of insurance available on request, emailed the same day.",
  },
  {
    q: "Who will be in my home?",
    a: "A background-checked, trained crew. We assign the same crew to your property whenever schedules allow, because a crew that knows your home cleans it better.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Most clients aren't. We handle keys, codes, and access notes through a documented process set up at onboarding.",
  },
  {
    q: "Do you bring supplies?",
    a: "Yes — professional-grade supplies and equipment are included. If you prefer specific products used in your home, tell us in your quote request.",
  },
  {
    q: "What if something gets missed?",
    a: "Tell us within 24 hours. We come back and re-clean the item free. That's the Luxe Shine Guarantee, and the full terms are published on Our Standard.",
  },
  {
    q: "How fast will I hear back?",
    a: "Quotes within 2 business hours.",
  },
];

export const RESIDENTIAL_FAQS: Faq[] = [
  {
    q: "Do you clean homes with pets?",
    a: "Yes. Tell us about your pets in the quote request so the crew arrives prepared, and leave any handling instructions in your access notes.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes, professional-grade supplies and equipment are included. Prefer specific products or have allergy considerations? Note it in your quote request and we'll use yours or match them.",
  },
  {
    q: "What if I need to reschedule?",
    // [ADJUST] POLICY.rescheduleWindow — confirm the real free-reschedule window.
    a: `Give us ${POLICY.rescheduleWindow}' notice and we'll move your visit at no charge.`,
  },
  {
    q: "Do I need to be home during the clean?",
    a: "No. Most clients aren't. Access is handled through keys, codes, or smart locks with documented instructions.",
  },
  {
    q: "How does the guarantee work?",
    a: "Anything on the checklist missed, tell us within 24 hours — text a photo if it's easier. We return and re-clean the item free. Full terms on Our Standard.",
  },
  {
    q: "Why is the Deep Reset required?",
    a: "Because recurring cleans maintain a standard — they don't create one. The Deep Reset creates it. Skipping it is how quality drifts from day one, so we don't skip it.",
  },
];

export const STR_FAQS: Faq[] = [
  {
    q: "Do you handle linens?",
    // [ADJUST] POLICY.linenModel — confirm the real linen model at onboarding.
    a: `Yes — ${POLICY.linenModel}, set during onboarding.`,
  },
  {
    q: "How is restocking billed?",
    // [ADJUST] restock billing model — confirm before launch.
    a: "Consumables are replenished from your supply or purchased and billed at cost with the receipt logged in your report. Your call, set at onboarding.",
  },
  {
    q: "How do you access the unit?",
    a: "Lockbox or smart-lock codes, stored in our access system and never shared outside your assigned crew.",
  },
  {
    q: "What if a guest checks out late?",
    a: "The crew reports it immediately and we re-sequence. If the turnaround window collapses, you'll know in real time — not at check-in.",
  },
  {
    q: "Do you work from my booking calendar?",
    a: "Yes. An iCal feed or PMS calendar export is the cleanest way to run turnovers — cancellations and date changes flow through automatically.",
  },
  {
    q: "Is there a minimum number of units?",
    a: `No minimum for Five-Star Turnover. The Host Partner Program starts at ${POLICY.hostPartnerMinUnits} units.`,
  },
];

export const OUR_STANDARD_FAQS: Faq[] = [
  {
    q: "Can the checklist be customized for my home or unit?",
    a: "Yes. Your property's specific notes — the antique table that needs a certain cleaner, the guest-room quirk, your unit's staging spec — get appended to the standard checklist at onboarding and travel with every visit.",
  },
  {
    q: "Will you use my preferred products?",
    a: "Yes. Yours, or we'll match them.",
  },
  {
    q: "How do I request the insurance certificate?",
    a: "Ask by text or email. It goes out the same day.",
  },
  {
    q: "How do I make a guarantee claim?",
    a: "Text us within 24 hours of the clean — a photo helps but isn't required. We schedule the re-clean at the next available window. No forms.",
  },
];

export const QUOTE_FAQS: Faq[] = [
  {
    q: "Is the quote binding?",
    a: "The quote is honored as written for the scope you described. If the property differs materially from the description when we arrive, we'll re-confirm with you before any work starts — never after.",
  },
  {
    q: "Do you need to see the property first?",
    a: "Usually not. For deep cleans and move-outs, a few photos help us quote accurately — we'll ask if we need them.",
  },
  {
    q: "How soon can you start?",
    a: "Your quote includes our earliest available start date, so you're never guessing.",
  },
];
