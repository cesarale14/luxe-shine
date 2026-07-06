import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { IncludedAccordion } from "@/components/blocks/IncludedAccordion";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifiedStar } from "@/components/ui/VerifiedStar";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { OUR_STANDARD_FAQS } from "@/content/faqs";
import { RESIDENTIAL_CHECKLIST, STR_CHECKLIST } from "@/content/checklists";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.standard.title,
  description: SEO.standard.description,
  alternates: { canonical: "/standard" },
};

export default function StandardPage() {
  return (
    <>
      <PageHero
        eyebrow="The Standard"
        title="The full detail."
        subhead="Guarantee terms, insurance, and exactly what's included — the depth, for anyone who wants it."
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        showSla={false}
      />

      {/* Guarantee — full terms */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl rounded-card border border-line bg-ivory p-8 shadow-card md:p-12">
          <div className="flex items-center gap-3">
            <VerifiedStar size={22} tone="palm" />
            <p className="eyebrow text-palm">The Luxe Shine Guarantee</p>
          </div>
          <h2 className="display-2 mt-5">Anything missed, we re-clean within 24 hours. Free.</h2>
          <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-text md:text-base">
            <p>
              Tell us within 24 hours of your clean — a text with a photo is plenty. We return
              and re-clean the missed item free, at the next available window, typically within
              one business day.
            </p>
            <p>
              It covers everything included in your service, plus any add-ons you bought for
              that visit. It&rsquo;s a re-clean, not a discount — we fix the work.
            </p>
          </div>
        </div>
      </Section>

      {/* Insurance & crew */}
      <Section bg="ivory">
        <SectionHeading eyebrow="The boring proof" title="Insurance and crew." />
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Insured and bonded</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Certificate of insurance available on request — emailed the same day you ask.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Background-checked crews</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {/* TODO(launch): state the ACTUAL screening process + inspection cadence. */}
              Every crew member is screened before entering any property, and trained before
              working unsupervised.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Owner-inspected</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Consistent crews whenever schedules allow, with the owner inspecting on a
              rotating basis.
            </p>
          </div>
        </div>
      </Section>

      {/* What's included — accordions */}
      <Section bg="white">
        <SectionHeading eyebrow="What's included" title="Every room, every turn." />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-navy-700">Home visits</p>
            <div className="mt-5">
              <IncludedAccordion groups={RESIDENTIAL_CHECKLIST} />
            </div>
          </div>
          <div>
            <p className="eyebrow text-navy-700">Turnovers</p>
            <div className="mt-5">
              <IncludedAccordion groups={STR_CHECKLIST} />
            </div>
          </div>
        </div>
      </Section>

      {/* Depth FAQ */}
      <Section bg="ivory">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="A few specifics." />
          <FAQAccordion items={OUR_STANDARD_FAQS} />
        </div>
      </Section>

      <CTABand heading="Hold us to it." sub="Flat-rate quote, in writing, within 2 business hours." />

      <JsonLd data={faqSchema(OUR_STANDARD_FAQS)} />
    </>
  );
}
