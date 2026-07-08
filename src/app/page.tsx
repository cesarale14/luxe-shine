import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { QuoteCard } from "@/components/quote/QuoteCard";
import { PathPanels } from "@/components/blocks/PathPanels";
import { ReviewsBlock } from "@/components/blocks/ReviewsBlock";
import { FactsLine } from "@/components/blocks/FactsLine";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SEO, REVIEWS } from "@/content/site";

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

      {/* 3 — Proof: real reviews + facts sentence. Renders ONLY with >= 2 real reviews;
             otherwise omitted entirely (v2.2 §4 — an absent section is honest). */}
      {REVIEWS.length >= 2 && (
        <Section bg="ivory">
          <SectionHeading eyebrow="Proof" title="Standing evidence." />
          <div className="mt-10">
            <ReviewsBlock />
          </div>
          <div className="mt-12 border-t border-line pt-10 text-center">
            <FactsLine className="mx-auto max-w-2xl" />
          </div>
        </Section>
      )}

      {/* 4 — CTA band (button anchors to the hero card) */}
      <CTABand
        heading="Get your quote."
        cta={{ label: "Request a Quote", href: "#quote-card" }}
      />
    </>
  );
}
