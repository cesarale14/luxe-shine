"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

/**
 * Service card (v2 §8): photo top, title, one line; hover OR tap reveals 3 included
 * items. Tap equivalent = the toggle button, so no hover-only information anywhere.
 * A real photo renders in the top slot when `image` is provided; otherwise the tone
 * panel + [PHOTO] marker stands in.
 */
export function ServiceRevealCard({
  title,
  line,
  items,
  href = "/quote",
  cta = "Request a Quote",
  tone = "#efe7db",
  image,
}: {
  title: string;
  line: string;
  items: string[];
  href?: string;
  cta?: string;
  tone?: string;
  image?: { src: string; alt: string };
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const open = hovered || clicked;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: image ? undefined : tone }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="mono-meta absolute bottom-4 left-4 text-navy-700/45">[ PHOTO ]</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="heading-3">{title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{line}</p>

        <button
          type="button"
          onClick={() => setClicked((c) => !c)}
          aria-expanded={open}
          className="mt-4 flex items-center gap-1.5 self-start text-[0.875rem] font-medium text-navy-700"
        >
          What&rsquo;s included
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={`transition-transform duration-ui ease-out-luxe ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className="grid transition-all duration-ui ease-out-luxe"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="mt-3 space-y-2">
              {items.map((it) => (
                <li key={it} className="flex gap-2.5 text-[0.875rem] text-text">
                  <Check size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-navy-700" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy-700 transition-colors hover:text-navy-600"
        >
          {cta}
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
