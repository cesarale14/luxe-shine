"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { VerifiedStar } from "@/components/ui/VerifiedStar";

/**
 * The signature element (design §1, §7, §14): a designed card representing the
 * photo-verification report — mono metadata header, thumbnail grid, checklist
 * completion line, star glyph, timestamp details.
 *
 * The thumbnails are PLACEHOLDERS for real anonymized report photos.
 * TODO(launch): replace tile placeholders with a real anonymized photo report.
 *
 * The one orchestrated moment: on first view, tiles fade in sequentially (120ms
 * apart) then the timestamp resolves. Disabled under prefers-reduced-motion.
 */

const HERO_TILES = [
  "Entry",
  "Kitchen",
  "Living",
  "Primary bed",
  "Primary bath",
  "Bed 2",
  "Bath 2",
  "Balcony",
];
const COMPACT_TILES = ["Kitchen", "Living", "Primary bath", "Bed 2"];

export function VerificationReportArtifact({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "compact";
  className?: string;
}) {
  const hero = variant === "hero";
  const tiles = hero ? HERO_TILES : COMPACT_TILES;

  const ref = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlay(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tailDelay = tiles.length * 120 + 120;

  return (
    <figure
      ref={ref}
      className={`overflow-hidden rounded-card border border-line bg-white shadow-card ${className}`.trim()}
      aria-label="Sample photo report"
    >
      {/* Mono metadata header */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <span
          className="mono-meta transition-opacity duration-500 ease-out-luxe"
          style={{ opacity: play ? 1 : 0, transitionDelay: `${tailDelay}ms` }}
        >
          UNIT 2BR · {hero ? 14 : 6} PHOTOS · 2:41 PM
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-palm-tint px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-palm">
          <VerifiedStar size={13} tone="palm" />
          Verified
        </span>
      </div>

      {/* Thumbnail grid — placeholders for real anonymized photos */}
      <div
        className={`grid gap-2 p-5 ${hero ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}
      >
        {tiles.map((label, i) => (
          <div
            key={label}
            className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-sand transition-all duration-500 ease-out-luxe"
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "none" : "translateY(6px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <span className="mono-meta absolute bottom-1.5 left-2 text-[0.625rem] text-navy-700/70">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Checklist completion line */}
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-navy-900">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-palm-tint">
              <Check size={13} strokeWidth={2} className="text-palm" />
            </span>
            Standard met
          </span>
          <span className="mono-meta text-navy-700">42 / 42</span>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-palm transition-all ease-out-luxe"
            style={{
              width: play ? "100%" : "0%",
              transitionDuration: "700ms",
              transitionDelay: `${tailDelay + 120}ms`,
            }}
          />
        </div>
      </div>

      {/* Timestamp-style footer detail */}
      <figcaption
        className="border-t border-line bg-ivory px-5 py-3 transition-opacity duration-500 ease-out-luxe"
        style={{ opacity: play ? 1 : 0, transitionDelay: `${tailDelay + 240}ms` }}
      >
        <span className="mono-meta">Report sent 2:41 PM · before check-in · no flags</span>
      </figcaption>
    </figure>
  );
}
