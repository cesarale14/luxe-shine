import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.quote.title,
  description: SEO.quote.description,
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Two hours to a quote."
        subhead="Flat-rate and in writing, from the owner. Tell us about your home or your units."
        showSla={false}
      />

      <Section bg="white">
        <div className="mx-auto max-w-2xl">
          <p className="text-[0.9375rem] leading-relaxed text-muted">
            You&rsquo;ll have a flat-rate quote in writing within 2 business hours.
          </p>
          <div className="mt-6">
            <QuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
