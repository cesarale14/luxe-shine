import Link from "next/link";
import { Section } from "@/components/layout/Section";

/** Navy CTA band — one line, one button (v2 §2). The single dark section per page. */
export function CTABand({
  heading,
  sub,
  cta = { label: "Request a Quote", href: "/quote" },
}: {
  heading: string;
  sub?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Section bg="navy">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="display-2">{heading}</h2>
          {sub && <p className="mono-meta mt-3 text-ivory/60">{sub}</p>}
        </div>
        <Link
          href={cta.href}
          className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-btn bg-ivory px-8 text-[1.0625rem] font-medium text-navy-900 transition-colors duration-ui ease-out-luxe hover:bg-white"
        >
          {cta.label}
        </Link>
      </div>
    </Section>
  );
}
