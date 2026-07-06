import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Path split (v2 §2, §7.2): two large panels — For Your Home / For Your Rental.
 * Hover crossfades between two scene tones; tapping navigates (the tap equivalent —
 * no hover-only information). Placeholders stand in for real home/rental photography.
 *
 * TODO(brand): replace tone layers with real warm-home and crisp-rental photos.
 */
const PANELS = [
  {
    eyebrow: "For Your Home",
    title: "Recurring cleaning, handled.",
    href: "/residential",
    cta: "Explore Residential",
    base: "#efe7db", // warm home
    hover: "#f6f2ea",
  },
  {
    eyebrow: "For Your Rental",
    title: "Turnovers that protect your reviews.",
    href: "/str-turnovers",
    cta: "Explore STR Turnovers",
    base: "#e6e9ea", // crisp rental
    hover: "#eef1f2",
  },
];

export function PathPanels() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PANELS.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          className="group relative flex min-h-[54vh] flex-col justify-end overflow-hidden rounded-card border border-line p-8 md:min-h-[62vh] md:p-10"
        >
          {/* scene tone layers (placeholder for photography) */}
          <div
            className="absolute inset-0 transition-opacity duration-reveal ease-out-luxe group-hover:opacity-0"
            style={{ backgroundColor: p.base }}
          />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-reveal ease-out-luxe group-hover:opacity-100"
            style={{ backgroundColor: p.hover }}
          />
          <span className="mono-meta absolute left-8 top-8 text-navy-700/40 md:left-10 md:top-10">
            [ PHOTO ]
          </span>

          <div className="relative">
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-navy-900 md:text-[2rem]">
              {p.title}
            </h3>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy-700 transition-colors group-hover:text-navy-600">
              {p.cta}
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-ui ease-out-luxe group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
