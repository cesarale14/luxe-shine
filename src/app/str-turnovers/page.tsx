import type { Metadata } from "next";
import { Check, BedDouble, Package, Camera, Flag } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { TurnoverTimeline } from "@/components/blocks/TurnoverTimeline";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTABand } from "@/components/blocks/CTABand";
import { PhotoPlaceholder } from "@/components/blocks/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { STR_FAQS } from "@/content/faqs";
import { SEO } from "@/content/site";

export const metadata: Metadata = {
  title: SEO.str.title,
  description: SEO.str.description,
  alternates: { canonical: "/str-turnovers" },
};

const CHIPS = [
  { icon: Check, label: "Clean" },
  { icon: BedDouble, label: "Stage" },
  { icon: Package, label: "Restock" },
  { icon: Camera, label: "Report" },
  { icon: Flag, label: "Flag" },
];

export default function StrTurnoversPage() {
  return (
    <>
      <PageHero
        eyebrow="STR Turnovers"
        title="Turnovers that protect your reviews."
        subhead="Cleaned, staged, restocked, and confirmed before every check-in."
        primaryCta={{ label: "STR Turnover Quote", href: "/quote" }}
        showSla={false}
        aside={<PhotoPlaceholder label="STR — crisp unit, straight-on" ratio="4 / 3" />}
      />

      {/* Turnover timeline — the page's orchestrated moment */}
      <Section bg="ivory">
        <SectionHeading eyebrow="Same-day capability" title="Out at 10. Guest-ready by 4." />
        <div className="mt-12">
          <TurnoverTimeline />
        </div>
      </Section>

      {/* What a turn includes — chips (describes the service in words, no simulated output) */}
      <Section bg="white">
        <SectionHeading eyebrow="Every turn" title="Five steps, one report." />
        <ul className="mt-8 flex flex-wrap gap-3">
          {CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] text-navy-900"
            >
              <Icon size={17} strokeWidth={1.5} className="text-navy-700" />
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
          A written report follows every turn before check-in.
        </p>
      </Section>

      {/* We host too + owner + Host Partner */}
      <Section bg="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="We host too" title="The crew we trust with our own." />
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-text md:text-lg">
              &ldquo;I run my own rentals in Tampa. My name&rsquo;s on every clean.&rdquo;
            </p>
            <p className="mono-meta mt-3">
              {/* TODO(launch): real owner name + on-site photo. */}[ OWNER NAME ]
            </p>
            <div className="mt-6 max-w-xs">
              <PhotoPlaceholder label="OWNER — on-site, natural light" ratio="4 / 5" />
            </div>
          </div>
          <div className="rounded-card border border-line bg-white p-8 shadow-card md:p-10">
            <p className="eyebrow">Host Partner Program</p>
            <h3 className="heading-3 mt-3">For managers with 5+ units.</h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Capped slots, priority scheduling, dedicated crews, unit-level reporting, and
              one invoice. Priority only means something if the calendar has room to honor it.
            </p>
            <a
              href="/quote"
              className="link-cta mt-6 inline-flex"
            >
              Ask about availability
            </a>
          </div>
        </div>
      </Section>

      {/* 4 FAQs + CTA */}
      <Section bg="white">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Operator questions." />
          <FAQAccordion items={STR_FAQS.slice(0, 4)} />
        </div>
      </Section>

      <CTABand
        heading="Get a turnover quote."
        sub="Unit count, types, platform — that's all we need."
        cta={{ label: "STR Turnover Quote", href: "/quote" }}
      />

      <JsonLd data={faqSchema(STR_FAQS.slice(0, 4))} />
    </>
  );
}
