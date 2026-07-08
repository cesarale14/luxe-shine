import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Path split (v2 §2, §7.2): two large panels — For Your Home / For Your Rental.
 * Tapping navigates. The home panel carries a real photo; panels without one fall back
 * to a scene-tone placeholder that crossfades on hover.
 *
 * TODO(brand): add a real crisp-rental photo to the "For Your Rental" panel.
 */
type Panel = {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  base: string;
  hover: string;
  image?: { src: string; alt: string };
};

const PANELS: Panel[] = [
  {
    eyebrow: "For Your Home",
    title: "Recurring cleaning, handled.",
    href: "/residential",
    cta: "Explore Residential",
    base: "#efe7db", // warm home
    hover: "#f6f2ea",
    image: {
      src: "/photos/residential-kitchen.jpg",
      alt: "A freshly cleaned, bright kitchen in a Tampa home",
    },
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
          {p.image ? (
            <>
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-reveal ease-out-luxe group-hover:scale-[1.03]"
              />
              {/* ivory bottom scrim keeps the navy text legible over the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
            </>
          ) : (
            <>
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
            </>
          )}

          <div className="relative z-10">
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
