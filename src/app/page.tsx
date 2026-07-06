import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HeroAfterWipe } from "@/components/blocks/HeroAfterWipe";
import { PathPanels } from "@/components/blocks/PathPanels";
import { HowItWorks } from "@/components/blocks/HowItWorks";
import { ReviewsBlock } from "@/components/blocks/ReviewsBlock";
import { FactsLine } from "@/components/blocks/FactsLine";
import { CTABand } from "@/components/blocks/CTABand";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero: after-wipe visual + minimal text */}
      <section className="border-b border-line bg-white">
        <Container>
          <div className="grid items-center gap-10 py-14 lg:min-h-[86vh] lg:grid-cols-2 lg:gap-16 lg:py-0">
            <div>
              <Eyebrow>Tampa, FL</Eyebrow>
              <h1 className="display-1 mt-5">Hotel-standard clean. Tampa homes and rentals.</h1>
              <p className="lede mt-6">Premium cleaning and short-term rental turnovers.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/quote" size="hero">
                  Request a Quote
                </Button>
                <Button href="/quote" size="hero" variant="secondary">
                  STR Turnover Quote
                </Button>
              </div>
              <p className="mono-meta mt-5">Quotes in 2 business hours.</p>
            </div>
            <div className="lg:pl-4">
              <HeroAfterWipe />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Path split */}
      <Section bg="ivory">
        <PathPanels />
      </Section>

      {/* 3 — How it works (report card assembles) */}
      <HowItWorks />

      {/* 4 — Proof: sparse reviews + facts line + guarantee */}
      <Section bg="ivory">
        <ReviewsBlock />
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-line pt-10 text-center">
          <FactsLine />
          <p className="text-[0.9375rem] text-navy-900">
            Anything missed, we re-clean within 24 hours.{" "}
            <span className="font-medium text-palm">Free.</span>
          </p>
        </div>
      </Section>

      {/* 5 — CTA band */}
      <CTABand
        heading="Get your quote."
        sub="Flat-rate · in writing · within 2 business hours."
      />
    </>
  );
}
