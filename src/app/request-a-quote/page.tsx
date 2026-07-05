import type { Metadata } from "next";
import { ShieldCheck, BadgeCheck, Camera, UserRound } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/blocks/PageHero";
import { StepList } from "@/components/blocks/StepList";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { QUOTE_FAQS } from "@/content/faqs";
import { SEO, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.quote.title,
  description: SEO.quote.description,
  alternates: { canonical: "/request-a-quote" },
};

const TRUST_COLUMN = [
  { icon: ShieldCheck, text: "Insured & bonded — certificate on request" },
  { icon: BadgeCheck, text: "24-hour re-clean guarantee, in writing" },
  { icon: Camera, text: "Photo report after every clean" },
  { icon: UserRound, text: "You'll deal with the owner, not a call center" },
];

const WHAT_HAPPENS_NEXT = [
  {
    title: "We review your request.",
    body: "If anything's unclear, you'll get one or two quick questions by text.",
  },
  {
    title: "Your quote arrives in writing.",
    // SITE.hoursDisplay is [ADJUST] — confirm real business hours before launch.
    body: `Flat-rate, within 2 business hours. Business hours: ${SITE.hoursDisplay}. Requests outside those hours are answered first thing the next business morning.`,
  },
  {
    title: "You pick a start date.",
    body: "Homes begin with the Deep Reset. Rentals begin with a documented unit walkthrough.",
  },
];

export default function RequestAQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Quotes in 2 business hours."
        subhead="Flat-rate and in writing, from the owner. Tell us about your home or your units below."
        showSla={false}
      />

      {/* Form + trust sidebar */}
      <Section bg="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div>
            <p className="mono-meta">You'll have a quote within 2 business hours.</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>

          <aside className="lg:pt-9">
            <div className="rounded-card border border-line bg-ivory p-7">
              <p className="eyebrow">Why Luxe Shine</p>
              <ul className="mt-5 space-y-4">
                {TRUST_COLUMN.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-[0.9375rem] leading-relaxed text-text">
                    <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-navy-700" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* What happens next + mini-FAQ */}
      <Section bg="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="What happens next" title="Three steps, no guessing." />
            <div className="mt-8">
              <StepList steps={WHAT_HAPPENS_NEXT} variant="rows" />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Before you send" title="Quick questions." />
            <div className="mt-8">
              <FAQAccordion items={QUOTE_FAQS} />
            </div>
          </div>
        </div>
      </Section>

      <JsonLd data={faqSchema(QUOTE_FAQS)} />
    </>
  );
}
