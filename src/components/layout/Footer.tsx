import Link from "next/link";
import Image from "next/image";
import { SITE, NAV, SERVICE_AREAS, isPlaceholder } from "@/content/site";

/*
 * Footer note (design §0.2): the full-color logo lockup does not appear on the site.
 * If a mark must appear here later, use a SINGLE-COLOR NAVY version at small size —
 * the current asset is full-color and contains "SOLUTIONS", so it is intentionally
 * not rendered. public/brand/luxeshine-logo-fullcolor.png is preserved but unused.
 * The wordmark carries the footer instead.
 */

function Contact({ label, value, href }: { label: string; value: string; href: string | null }) {
  const placeholder = isPlaceholder(value) || isPlaceholder(href);
  return (
    <li>
      <span className="text-muted">{label}: </span>
      {placeholder || !href ? (
        <span className="text-muted">{value}</span>
      ) : (
        <a href={href} className="text-ivory/90 hover:text-white">
          {value}
        </a>
      )}
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-white/10">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + promise */}
          <div className="lg:pr-8">
            {/* Ivory wordmark for the dark footer (the navy header asset would be invisible here).
                TODO(brand): swap to the monochrome premium house-mark logo for footer/invoices/
                PDFs/ops surfaces once that asset exists. Do not use the old full-color logo. */}
            <Image
              src="/brand/luxe-shine-wordmark-ivory.png"
              alt="Luxe Shine"
              width={600}
              height={137}
              className="h-auto w-[150px]"
            />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ivory/70">
              Hotel-standard cleaning for Tampa homes and short-term rentals. Insured,
              background-checked crews and a written 24-hour guarantee.
            </p>
            <p className="mt-4 text-[0.8125rem] text-ivory/60">Insured &amp; bonded.</p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <p className="eyebrow text-ivory/50">Services</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ivory/80">
              <li>
                <Link href="/residential" className="hover:text-white">
                  Signature Clean &amp; Deep Reset
                </Link>
              </li>
              <li>
                <Link href="/residential" className="hover:text-white">
                  Move-Ready Clean
                </Link>
              </li>
              <li>
                <Link href="/str-turnovers" className="hover:text-white">
                  Five-Star Turnover
                </Link>
              </li>
              <li>
                <Link href="/str-turnovers" className="hover:text-white">
                  Host Partner Program
                </Link>
              </li>
              <li>
                <Link href="/standard" className="hover:text-white">
                  The Luxe Shine Guarantee
                </Link>
              </li>
            </ul>
          </nav>

          {/* Site */}
          <nav aria-label="Site">
            <p className="eyebrow text-ivory/50">Explore</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ivory/80">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/standard" className="hover:text-white">
                  The standard &amp; guarantee
                </Link>
              </li>
            </ul>
          </nav>

          {/* NAP — identical formatting sitewide for local SEO (strategy §4) */}
          <div>
            <p className="eyebrow text-ivory/50">Luxe Shine</p>
            <ul className="mt-4 space-y-2 text-[0.9375rem]">
              <li className="text-ivory/90">Serving {SITE.region}</li>
              <Contact label="Phone" value={SITE.phone.display} href={SITE.phone.href} />
              <Contact
                label="Email"
                value={SITE.email}
                href={isPlaceholder(SITE.email) ? null : `mailto:${SITE.email}`}
              />
              {SITE.gbpUrl && (
                <li>
                  <a
                    href={SITE.gbpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory/90 hover:text-white"
                  >
                    Reviews on Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Service area line */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-[0.8125rem] leading-relaxed text-ivory/55">
            Serving {SERVICE_AREAS.join(", ")}.
          </p>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col gap-2 text-[0.8125rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.brand}. {SITE.brand} is operated by {SITE.legalName}.
            {/* TODO(compliance): Keep this legal entity line visible for Twilio/Trust Hub verification.
                Visible brand stays "Luxe Shine"; the legal entity appears only in this small legal line. */}
          </p>
          <p>{SITE.region}</p>
        </div>
      </div>
    </footer>
  );
}
