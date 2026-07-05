import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { TrustStrip } from "@/components/blocks/TrustStrip";
import { PathCard } from "@/components/blocks/PathCard";
import { StepList } from "@/components/blocks/StepList";
import { ChecklistTable } from "@/components/blocks/ChecklistTable";
import { ReviewsBlock } from "@/components/blocks/ReviewsBlock";
import { VerificationReportArtifact } from "@/components/blocks/VerificationReportArtifact";
import { ServiceAreaBlock } from "@/components/blocks/ServiceAreaBlock";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { PhotoPlaceholder } from "@/components/blocks/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { HOME_FAQS } from "@/content/faqs";
import { RESIDENTIAL_CHECKLIST } from "@/content/checklists";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: { canonical: "/" },
};

const HOW_IT_WORKS = [
  {
    title: "Request a quote.",
    body: "Tell us about your home or your units. You'll have a flat-rate quote, in writing, within 2 business hours.",
  },
  {
    title: "We set the baseline.",
    body: "Homes begin with the Deep Reset — a top-to-bottom onboarding clean that brings everything to our published standard. Rentals begin with a documented walkthrough of your unit, so every turnover runs to your listing's exact spec.",
  },
  {
    title: "Your standing schedule.",
    body: "Your crew, your cadence, your checklist. A photo report after every visit, and a written guarantee behind every clean.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        title="Hotel-standard cleaning for Tampa homes and rentals."
        subhead="Insured, background-checked crews. Photo-verified results after every visit. A written 24-hour guarantee."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "STR Turnover Quote", href: "/request-a-quote" }}
        aside={
          <PhotoPlaceholder
            label="HERO — finished Tampa room, natural light"
            ratio="4 / 3"
          />
        }
      />

      {/* Trust strip — single row, hairline band (design §5) */}
      <div className="border-b border-line bg-ivory">
        <Container>
          <div className="py-6">
            <TrustStrip />
          </div>
        </Container>
      </div>

      {/* Dual-path selector */}
      <Section bg="white">
        <SectionHeading eyebrow="Choose your path" title="Two kinds of properties. One standard." />
        <Reveal className="mt-10 grid gap-6 md:grid-cols-2">
          <PathCard
            eyebrow="For Your Home"
            title="The last time you think about cleaning."
            body="Recurring cleaning with a trained crew, a published checklist, and a photo report after every visit."
            href="/residential"
            ctaLabel="Explore Residential"
          />
          <PathCard
            eyebrow="For Your Rental"
            title="Built by Tampa hosts."
            body="Turnovers cleaned, staged, restocked, and photo-confirmed before every check-in — built by people who host in Tampa themselves."
            href="/str-turnovers"
            ctaLabel="Explore STR Turnovers"
          />
        </Reveal>
      </Section>

      {/* How it works */}
      <Section bg="ivory">
        <SectionHeading eyebrow="How it works" title="Three steps to never thinking about this again." />
        <Reveal className="mt-12">
          <StepList steps={HOW_IT_WORKS} />
        </Reveal>
      </Section>

      {/* The Standard preview */}
      <Section bg="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our Standard" title="We publish our checklist." />
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Most cleaning companies keep their scope vague. Ours is written down, item by
              item — what gets done in every room, on every visit. Read it before you ever
              request a quote, and hold us to it after.
            </p>
            <div className="mt-7">
              <Button href="/our-standard" variant="secondary">
                Read the Luxe Shine Standard
              </Button>
            </div>
          </div>
          <div className="rounded-card border border-line bg-ivory p-7 md:p-8">
            <p className="mono-meta">CHECKLIST EXCERPT · KITCHEN</p>
            <div className="mt-5">
              <ChecklistTable groups={[RESIDENTIAL_CHECKLIST[0]]} columns={1} />
            </div>
          </div>
        </div>
      </Section>

      {/* Proof: reviews + the report artifact at hero scale */}
      <Section bg="ivory">
        <SectionHeading title="What clients say" />
        <div className="mt-10">
          <ReviewsBlock />
        </div>

        <div className="mt-16 grid items-center gap-12 border-t border-line pt-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Photo-verified"
              title="The report that follows every clean"
            />
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
              This is what lands in your inbox after each visit — every room, photographed
              and timestamped.
            </p>
          </div>
          <Reveal>
            <VerificationReportArtifact variant="hero" />
          </Reveal>
        </div>
      </Section>

      {/* We host in Tampa too — the one dark section (design §3) */}
      <Section bg="navy">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="We host in Tampa too"
            title="The system we built to protect our own reviews."
            align="center"
          />
          <p className="lede mt-6">
            Luxe Shine is run by people who operate their own Tampa short-term rentals. We
            know what a missed turnover actually costs — the refunded night, the scramble,
            the review that follows a listing for months. Five-Star Turnover is the system
            we built to protect our own reviews. Now it protects yours.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/request-a-quote" size="hero" variant="on-dark">
              STR Turnover Quote
            </Button>
          </div>
        </div>
      </Section>

      {/* Where we work */}
      <ServiceAreaBlock bg="ivory" />

      {/* FAQ */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <FAQAccordion items={HOME_FAQS} />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        heading="Get your quote."
        body="Tell us about your home or your rental. A flat-rate quote, in writing, within 2 business hours."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "STR Turnover Quote", href: "/request-a-quote" }}
      />

      <JsonLd data={faqSchema(HOME_FAQS)} />
    </>
  );
}
