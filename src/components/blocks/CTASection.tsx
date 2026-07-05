import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SLA_MICROCOPY } from "@/content/site";

type Cta = { label: string; href: string };

/** Final CTA block — centered (design §5). Navy variant allowed once per page (§3). */
export function CTASection({
  heading,
  body,
  primaryCta = { label: "Request a Quote", href: "/request-a-quote" },
  secondaryCta,
  variant = "ivory",
  showSla = true,
}: {
  heading: string;
  body?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  variant?: "ivory" | "navy";
  showSla?: boolean;
}) {
  const onNavy = variant === "navy";
  return (
    <Section bg={onNavy ? "navy" : "ivory"}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="display-2">{heading}</h2>
        {body && <p className="lede mt-5">{body}</p>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={primaryCta.href} size="hero">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              size="hero"
              variant={onNavy ? "on-dark" : "secondary"}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
        {showSla && (
          <p className={`mono-meta mt-6 ${onNavy ? "text-ivory/60" : ""}`}>{SLA_MICROCOPY}</p>
        )}
      </div>
    </Section>
  );
}
