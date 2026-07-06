import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { ServiceRevealCard } from "@/components/blocks/ServiceRevealCard";
import { StepList } from "@/components/blocks/StepList";
import { VerificationReportArtifact } from "@/components/blocks/VerificationReportArtifact";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTABand } from "@/components/blocks/CTABand";
import { PhotoPlaceholder } from "@/components/blocks/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { RESIDENTIAL_FAQS } from "@/content/faqs";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.residential.title,
  description: SEO.residential.description,
  alternates: { canonical: "/residential" },
};

const SCHEDULE = [
  { title: "Deep clean first.", body: "We set the baseline before anything recurring begins." },
  { title: "Your schedule.", body: "Weekly or biweekly, the same crew whenever schedules allow." },
  { title: "Confirmed every visit.", body: "A photo report lands before we leave." },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="Your home, handled."
        subhead="Recurring cleaning, a consistent crew, and a photo report after every visit."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        showSla={false}
        aside={<PhotoPlaceholder label="RESIDENTIAL — warm, lived-in room" ratio="4 / 3" />}
      />

      {/* Empathy + consistency, compressed to two lines */}
      <Section bg="white">
        <p className="max-w-3xl font-display text-[1.75rem] leading-tight text-navy-900 md:text-[2.25rem]">
          You&rsquo;ve had a cleaner go downhill before. That&rsquo;s the problem we built
          against.
        </p>
        <p className="lede mt-5 max-w-2xl">
          The same crew whenever schedules allow — they&rsquo;ll know your home.
        </p>
      </Section>

      {/* Three service cards */}
      <Section bg="ivory">
        <SectionHeading eyebrow="What we do" title="Three ways in." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ServiceRevealCard
            title="Signature Clean"
            line="Weekly or biweekly upkeep by the same crew."
            items={[
              "Kitchen and baths reset every visit",
              "Floors, surfaces, and touchpoints",
              "Photo report before we leave",
            ]}
            tone="#efe7db"
          />
          <ServiceRevealCard
            title="Deep Clean"
            line="The reset that sets your baseline — first, or on demand."
            items={[
              "Top-to-bottom detail work",
              "Inside appliances on request",
              "Brings the home to standard",
            ]}
            tone="#e9e4d8"
          />
          <ServiceRevealCard
            title="Move-In / Out"
            line="A vacant-home clean, walkthrough-ready."
            items={[
              "Cabinets and drawers, in and out",
              "Appliances, baseboards, fixtures",
              "For owners, renters, and agents",
            ]}
            tone="#e6e9ea"
          />
        </div>
      </Section>

      {/* Mini schedule diagram + micro report card */}
      <Section bg="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="How it runs" title="Set once. Then it just happens." />
            <div className="mt-10">
              <StepList steps={SCHEDULE} variant="rows" />
            </div>
          </div>
          <Reveal className="lg:pt-4">
            <VerificationReportArtifact variant="compact" />
          </Reveal>
        </div>
      </Section>

      {/* 4 FAQs + guarantee + CTA */}
      <Section bg="ivory">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Good to know." />
          <div>
            <FAQAccordion items={RESIDENTIAL_FAQS.slice(0, 4)} />
            <p className="mt-8 text-[0.9375rem] text-navy-900">
              Anything missed, we re-clean within 24 hours.{" "}
              <span className="font-medium text-palm">Free.</span>
            </p>
          </div>
        </div>
      </Section>

      <CTABand heading="Start with a quote." sub="In writing, within 2 business hours." />

      <JsonLd data={faqSchema(RESIDENTIAL_FAQS.slice(0, 4))} />
    </>
  );
}
