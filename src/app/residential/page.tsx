import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { StepList } from "@/components/blocks/StepList";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { PhotoPlaceholder } from "@/components/blocks/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { RESIDENTIAL_FAQS } from "@/content/faqs";
import { RESIDENTIAL_BRIEF, RESIDENTIAL_BRIEF_ADDONS } from "@/content/checklists";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.residential.title,
  description: SEO.residential.description,
  alternates: { canonical: "/residential" },
};

const RECURRING_MODEL = [
  {
    title: "The Deep Reset — your onboarding clean.",
    body: "Every recurring relationship starts with the Deep Reset: a top-to-bottom deep clean that brings your home to our published standard. It's mandatory for a reason — recurring visits maintain a baseline, and the Deep Reset is what sets it.",
  },
  {
    title: "Signature Clean — your standing schedule.",
    body: "Weekly or biweekly. Same crew whenever schedules allow. Same checklist, every visit, no drift.",
  },
  {
    title: "The photo report.",
    body: "Before the crew leaves, your home is photographed against the checklist. The report hits your inbox the same visit — you'll know the work was done to standard without walking a single room.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="Your home, handled."
        subhead="Recurring cleaning on your schedule — with a consistent crew, a published checklist, and a photo report after every visit."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
        aside={<PhotoPlaceholder label="RESIDENTIAL — calm, lived-in room, morning light" ratio="4 / 3" />}
      />

      {/* The drift problem */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="The drift problem" title="You've probably done this before." />
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text md:text-lg">
            <p>
              Most people who call us have already hired a cleaner. It usually goes the same
              way — excellent for a month, then a little late, then a little rushed, until
              you're doing walk-throughs after every visit and wondering when you became the
              quality-control department.
            </p>
            <p>
              That drift isn't a personnel problem. It's a systems problem. Luxe Shine is
              built to prevent it: a consistent crew, a written checklist, photo verification
              after every visit, and a guarantee that puts fixing misses on us — not on you.
            </p>
            <p>
              If you've been searching for a maid service in Tampa, this works differently.
              We're a property care partner. The difference is everything above.
            </p>
          </div>
        </div>
      </Section>

      {/* How the recurring model works */}
      <Section bg="ivory">
        <SectionHeading eyebrow="How the recurring model works" title="Baseline first. Then maintenance." />
        <Reveal className="mt-12">
          <StepList steps={RECURRING_MODEL} />
        </Reveal>
      </Section>

      {/* What's included */}
      <Section bg="white">
        <SectionHeading
          eyebrow="What's included"
          title="The checklist, in brief."
          lead="A sample of what happens every visit — the complete room-by-room standard is published in full on Our Standard."
        />
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {RESIDENTIAL_BRIEF.map((r) => (
            <div key={r.room} className="border-t border-line pt-5">
              <p className="text-[0.9375rem] leading-relaxed text-text md:text-base">
                <span className="font-medium text-navy-900">{r.room}</span> — {r.summary}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[0.9375rem] text-muted">
          <span className="font-medium text-navy-900">Add-ons:</span> {RESIDENTIAL_BRIEF_ADDONS}
        </p>
        <div className="mt-7">
          <Button href="/our-standard" variant="secondary">
            Read the full checklist
          </Button>
        </div>
      </Section>

      {/* Move-Ready Clean */}
      <Section bg="ivory">
        <div className="rounded-card border border-line bg-white p-8 shadow-card md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow="Move-Ready Clean" title="Moving in or out." />
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
                The Move-Ready Clean is a vacant-home deep clean built to walkthrough
                standard — cabinets and drawers inside and out, appliances, baseboards,
                fixtures, floors. For homeowners handing over keys, renters closing out a
                lease, and the agents who represent them.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Button href="/request-a-quote">Request a Move-Ready Quote</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Your crew + pricing posture */}
      <Section bg="white">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="border-t border-line pt-6">
            <SectionHeading eyebrow="Your crew" title="Who's in your home." />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Every crew member is background-checked before they ever enter a client
              property, and trained on the Luxe Shine checklist before they work
              unsupervised. We assign the same crew to your home whenever schedules allow.
              And you'll always have a direct line to the owner — no call center, no ticket
              numbers.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <SectionHeading eyebrow="Pricing" title="Straightforward pricing." />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Flat-rate quotes tailored to your home — size, condition, and cadence. No
              hourly billing, no meter running. Your quote arrives in writing within 2
              business hours.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="ivory">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <FAQAccordion items={RESIDENTIAL_FAQS} />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        heading="Start with the Deep Reset."
        body="Request a quote now. It arrives in writing within 2 business hours, and your standing schedule starts from there."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
      />

      <JsonLd data={faqSchema(RESIDENTIAL_FAQS)} />
    </>
  );
}
