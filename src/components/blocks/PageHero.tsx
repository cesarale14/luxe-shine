import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SLA_MICROCOPY } from "@/content/site";

type Cta = { label: string; href: string };

/**
 * Page hero. When `aside` is provided the layout runs 6/6 (text + artifact/image);
 * otherwise a single left-aligned column. Interior heroes are not centered (design §5).
 */
export function PageHero({
  eyebrow,
  title,
  subhead,
  primaryCta,
  secondaryCta,
  showSla = true,
  aside,
}: {
  eyebrow?: string;
  title: string;
  subhead: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  showSla?: boolean;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-16" : ""}>
          <div className={aside ? "" : "max-w-3xl"}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className={`display-1 ${eyebrow ? "mt-5" : ""}`}>{title}</h1>
            <p className="lede mt-6 max-w-2xl">{subhead}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {primaryCta && (
                  <Button href={primaryCta.href} size="hero">
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} size="hero" variant="secondary">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
            {showSla && <p className="mono-meta mt-5">{SLA_MICROCOPY}</p>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
