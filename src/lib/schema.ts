import { SITE, SERVICE_AREAS, isPlaceholder } from "@/content/site";
import type { Faq } from "@/content/faqs";

/**
 * LocalBusiness JSON-LD. telephone/email are included only once they are real
 * (never emit placeholder contact data). Add logo/image once real assets exist.
 */
export function localBusinessSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.brand,
    legalName: SITE.legalName,
    description: SITE.tagline,
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: "US",
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name: `${name}, Tampa, FL`,
    })),
    priceRange: "$$$",
    // TODO(launch): add "image", "logo", "aggregateRating"/"review" only from REAL data.
  };
  if (!isPlaceholder(SITE.phone.href) && SITE.phone.href) {
    schema.telephone = SITE.phone.href.replace(/^tel:/, "");
    schema.contactPoint = SITE.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.href.replace(/^tel:/, ""),
      contactType: "customer service",
      availableLanguage: p.lang,
    }));
  }
  if (!isPlaceholder(SITE.email)) schema.email = SITE.email;
  if (SITE.gbpUrl) schema.sameAs = [SITE.gbpUrl];
  return schema;
}

/** FAQPage JSON-LD from a page's FAQ list. */
export function faqSchema(faqs: Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
