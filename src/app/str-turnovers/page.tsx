import type { Metadata } from "next";
import { Clock, Tag, CalendarDays, Package, Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { StepList } from "@/components/blocks/StepList";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { VerificationReportArtifact } from "@/components/blocks/VerificationReportArtifact";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { PhotoPlaceholder } from "@/components/blocks/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { STR_FAQS } from "@/content/faqs";
import { SEO, POLICY } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.str.title,
  description: SEO.str.description,
  alternates: { canonical: "/str-turnovers" },
};

const FIVE_STAR = [
  {
    title: "Clean.",
    body: "To a published STR checklist, tuned to your unit during onboarding. The full checklist is on Our Standard — read it before you commit to anything.",
  },
  {
    title: "Stage.",
    body: "Beds squared, towels set, amenities placed. Your listing-photo look, restored — guests walk into exactly what they booked.",
  },
  {
    title: "Restock.",
    body: "Consumables checked and replenished against your standard list — paper goods, soap, coffee, whatever your unit stocks. Quantities logged so you always know where inventory stands.",
  },
  {
    title: "Report.",
    body: "A timestamped photo report, sent before check-in time. You see the unit guest-ready without driving over.",
  },
  {
    title: "Flag.",
    body: "Damage, missing inventory, signs of smoking or extra guests — photographed and reported the same day, while you can still act on it.",
  },
];

const HOST_PARTNER_BENEFITS = [
  "Dedicated crew assignments across your portfolio",
  "Priority scheduling for same-day turns",
  "Standardized per-unit pricing",
  "Unit-level reporting: photos, restock logs, damage flags",
  "One consolidated monthly invoice",
];

export default function StrTurnoversPage() {
  return (
    <>
      <PageHero
        eyebrow="STR Turnovers"
        title="Turnovers that protect your reviews."
        subhead="Cleaned, staged, restocked, and photo-confirmed before every check-in — by a company that hosts in Tampa too."
        primaryCta={{ label: "STR Turnover Quote", href: "/request-a-quote" }}
        aside={<PhotoPlaceholder label="STR — squared bed corners, straight-on, crisp grade" ratio="4 / 3" />}
      />

      {/* The math on a missed turnover */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="The cost of failure" title="The math on a missed turnover." />
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text md:text-lg">
            <p>
              A turnover that runs late or gets rushed costs more than a night's revenue.
              It's the refund, the relocation scramble, and the cleanliness review that sits
              on your listing for months — quietly lowering your occupancy and your nightly
              rate the whole time.
            </p>
            <p className="font-medium text-navy-900">
              Cheap cleaning isn't cheap. It just sends the invoice to your listing instead
              of your inbox.
            </p>
          </div>
        </div>
      </Section>

      {/* The Five-Star Turnover system */}
      <Section bg="ivory">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="The Five-Star Turnover system" title="Five steps, every turn." />
            <div className="mt-10">
              <StepList steps={FIVE_STAR} variant="rows" />
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <VerificationReportArtifact variant="hero" />
            </Reveal>
            <p className="mono-meta mt-4 text-center">
              Sample report — timestamped, sent before check-in.
            </p>
          </div>
        </div>
      </Section>

      {/* Built by Tampa hosts — the dark trust core (design §3) */}
      <Section bg="navy">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Built by Tampa hosts" title="Not designed on a whiteboard." align="center" />
          <p className="lede mt-6">
            Luxe Shine's owner operates short-term rentals in Tampa. We've eaten the cost of
            a bad turnover firsthand — the refund, the review, the scramble to fix it before
            the next guest. Five-Star Turnover wasn't designed on a whiteboard. It's the
            system we built to protect our own listings, opened up to other hosts.
          </p>
        </div>
      </Section>

      {/* Operational fit */}
      <Section bg="white">
        <SectionHeading eyebrow="Operational fit" title="Built around how hosting actually works." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ServiceCard title="Same-day turnovers" icon={Clock}>
            Available with a surcharge — same-day is our most valuable capability, and we
            staff for it. Book by {POLICY.sameDayCutoff} for same-day service.
          </ServiceCard>
          <ServiceCard title="Flat rate per unit type" icon={Tag}>
            Studio, 1BR, 2BR, 3BR+ — one number per unit, quoted up front. No hourly
            billing, no surprises at invoice.
          </ServiceCard>
          <ServiceCard title="Calendar-driven scheduling" icon={CalendarDays}>
            Send us your booking calendar feed (iCal or your PMS export) and turnovers
            schedule themselves. No text-message coordination at 11 PM.
          </ServiceCard>
          <ServiceCard title="Linens" icon={Package}>
            On-site laundering or a linen swap program, confirmed during your unit
            walkthrough.
          </ServiceCard>
        </div>
      </Section>

      {/* Host Partner Program */}
      <Section bg="ivory">
        <div className="rounded-card border border-line bg-white p-8 shadow-card md:p-12">
          <SectionHeading
            eyebrow="Host Partner Program"
            title="For co-hosts and managers with multiple units."
          />
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
            When you're running five or more doors, you don't need a cleaner — you need a
            vendor that behaves like infrastructure.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HOST_PARTNER_BENEFITS.map((b) => (
              <li key={b} className="flex gap-3 text-[0.9375rem] text-text">
                <Check size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-navy-700" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
            We cap Host Partner slots deliberately. Priority scheduling only means something
            if the calendar has room to honor it.
          </p>
          <div className="mt-7">
            <Button href="/request-a-quote">Ask about Host Partner availability</Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Operator questions." />
          <FAQAccordion items={STR_FAQS} />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        heading="Get a turnover quote."
        body="Unit count, unit types, platform. That's all we need to start — flat-rate quote within 2 business hours."
        primaryCta={{ label: "STR Turnover Quote", href: "/request-a-quote" }}
      />

      <JsonLd data={faqSchema(STR_FAQS)} />
    </>
  );
}
