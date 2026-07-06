import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { QuoteCard } from "@/components/quote/QuoteCard";
import { PathPanels } from "@/components/blocks/PathPanels";
import { VerificationReportArtifact } from "@/components/blocks/VerificationReportArtifact";
import { ReviewsBlock } from "@/components/blocks/ReviewsBlock";
import { FactsLine } from "@/components/blocks/FactsLine";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero: typographic + embedded QuoteCard (no image dependency) */}
      <section className="border-b border-line bg-ivory">
        <Container>
          <div className="grid items-center gap-8 py-10 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-16 lg:py-0">
            <div>
              <Eyebrow>Tampa, FL</Eyebrow>
              <h1 className="display-1 mt-5">Hotel-standard clean. Tampa homes and rentals.</h1>
              <p className="lede mt-5 max-w-md">
                Premium cleaning and short-term rental turnovers.
              </p>
            </div>
            <div id="quote-card" className="scroll-mt-24">
              <QuoteCard sourcePage="home" />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Path split */}
      <Section bg="white">
        <PathPanels />
      </Section>

      {/* 3 — Proof: reviews + report card artifact + facts line */}
      <Section bg="ivory">
        <SectionHeading eyebrow="Proof" title="Standing evidence." />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ReviewsBlock />
          <Reveal>
            <VerificationReportArtifact variant="hero" />
          </Reveal>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-line pt-10 text-center">
          <FactsLine />
          <p className="text-[0.9375rem] text-navy-900">
            Anything missed, we re-clean within 24 hours.{" "}
            <span className="font-medium text-palm">Free.</span>
          </p>
        </div>
      </Section>

      {/* 4 — CTA band (button anchors to the hero card) */}
      <CTABand
        heading="Get your quote."
        sub="Flat-rate · in writing · within 2 business hours."
        cta={{ label: "Request a Quote", href: "#quote-card" }}
      />
    </>
  );
}
