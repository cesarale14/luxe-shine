import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { ChecklistTable } from "@/components/blocks/ChecklistTable";
import { VerificationReportArtifact } from "@/components/blocks/VerificationReportArtifact";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTASection } from "@/components/blocks/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifiedStar } from "@/components/ui/VerifiedStar";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { OUR_STANDARD_FAQS } from "@/content/faqs";
import {
  RESIDENTIAL_CHECKLIST,
  RESIDENTIAL_ADDONS,
  STR_CHECKLIST,
} from "@/content/checklists";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.ourStandard.title,
  description: SEO.ourStandard.description,
  alternates: { canonical: "/our-standard" },
};

/** Placeholder for a downloadable checklist PDF that doesn't exist yet. */
function PdfPlaceholder({ label }: { label: string }) {
  // TODO(launch): generate the real checklist PDF and link it here.
  return (
    <span className="mono-meta mt-8 inline-flex items-center gap-2 text-muted/80">
      <FileText size={15} strokeWidth={1.5} />[ {label} — PDF COMING SOON ]
    </span>
  );
}

export default function OurStandardPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Standard"
        title="The standard, in writing."
        subhead="Most cleaning companies describe their work with adjectives. We publish ours — the checklists, the photo process, the guarantee terms. Read everything before you request a quote."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
        showSla={false}
      />

      {/* Why we publish */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Why we publish" title="A standard you can hold us to." />
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-text md:text-lg">
            A standard you can't read is a standard you can't hold anyone to. Publishing ours
            does two things: it tells you exactly what you're paying for, and it hands you the
            document to hold us accountable with. Both work in your favor.
          </p>
        </div>
      </Section>

      {/* Residential checklist */}
      <Section bg="ivory">
        <SectionHeading eyebrow="Residential checklist" title="Every visit, every room." />
        <div className="mt-10">
          <ChecklistTable groups={RESIDENTIAL_CHECKLIST} columns={2} />
        </div>
        <p className="mt-10 text-[0.9375rem] text-muted">
          <span className="font-medium text-navy-900">Add-ons (on request):</span>{" "}
          {RESIDENTIAL_ADDONS}
        </p>
        <div>
          <PdfPlaceholder label="Residential Checklist" />
        </div>
      </Section>

      {/* STR turnover checklist */}
      <Section bg="white">
        <SectionHeading eyebrow="STR turnover checklist" title="Reset to listing standard." />
        <div className="mt-10">
          <ChecklistTable groups={STR_CHECKLIST} columns={2} />
        </div>
        <div>
          <PdfPlaceholder label="STR Turnover Checklist" />
        </div>
      </Section>

      {/* Photo verification explained */}
      <Section bg="ivory">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Photo verification" title="How we inspect our own work." />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Before the crew leaves, your property is photographed room by room against the
              checklist. The report is timestamped and sent the same visit — for rentals,
              before check-in time. It isn't marketing. It's how we inspect our own work, and
              you get a copy every time.
            </p>
          </div>
          <Reveal>
            <VerificationReportArtifact variant="hero" />
          </Reveal>
        </div>
      </Section>

      {/* The Luxe Shine Guarantee — full terms */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl rounded-card border border-line bg-ivory p-8 shadow-card md:p-12">
          <div className="flex items-center gap-3">
            <VerifiedStar size={22} tone="palm" />
            <p className="eyebrow text-palm">The Luxe Shine Guarantee</p>
          </div>
          <h2 className="display-2 mt-5">Anything missed, re-cleaned free.</h2>
          <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-text md:text-base">
            <p>
              If anything on your published checklist was missed, tell us within 24 hours of
              your clean — a text with a photo is plenty. We return and re-clean the missed
              item free, scheduled at the next available window, typically within one business
              day.
            </p>
            <p>
              Scope notes, in plain language: the guarantee covers the published checklist for
              your service, plus any add-ons you purchased for that visit. It's a re-clean
              guarantee, not a discount negotiation — we fix the work.
            </p>
          </div>
        </div>
      </Section>

      {/* Insurance and crew standards */}
      <Section bg="ivory">
        <SectionHeading eyebrow="The boring proof" title="Insurance and crew standards." />
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Insured and bonded</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Certificate of insurance available on request — emailed the same day you ask.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Crew standards</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {/* TODO(launch): state the ACTUAL screening process + inspection cadence. */}
              Every crew member passes a background check before entering any client
              property, and trains on the Luxe Shine checklist before working unsupervised.
              We assign consistent crews whenever schedules allow, and the owner personally
              inspects jobs on a rotating basis.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="heading-3">Supplies</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Professional-grade supplies and equipment included on every job. Product
              preferences and allergy considerations accommodated — just tell us at
              onboarding.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="A few specifics." />
          <FAQAccordion items={OUR_STANDARD_FAQS} />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        heading="Hold us to it."
        body="You've read the standard. Now get the quote — flat-rate, in writing, within 2 business hours."
        primaryCta={{ label: "Request a Quote", href: "/request-a-quote" }}
      />

      <JsonLd data={faqSchema(OUR_STANDARD_FAQS)} />
    </>
  );
}
