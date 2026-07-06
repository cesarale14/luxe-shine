"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { VerificationReportArtifact } from "./VerificationReportArtifact";

/**
 * How it works (v2 §7.3): 3 nodes on a progress line that advances as you scroll;
 * node 3's outcome is the report card assembling. One orchestrated moment.
 * Reduced-motion → all nodes active, line full, card static.
 */
const NODES = [
  { time: "2 BUSINESS HOURS", title: "Quote in 2 hours." },
  { time: "VISIT ONE", title: "First visit sets the standard." },
  { time: "SAME VISIT", title: "Confirmed to your phone." },
];

export function HowItWorks() {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(NODES.length - 1);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.getAttribute("data-i"));
            setActive((prev) => Math.max(prev, i));
          }
        });
      },
      { threshold: 0.6 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pct = (active / (NODES.length - 1)) * 100;

  return (
    <section className="bg-white py-section-mobile md:py-section-desktop">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="display-2 mt-4">Quote by 3, clean this week.</h2>

        <div className="relative mt-12">
          {/* progress track */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
          <div
            className="absolute left-0 top-[7px] hidden h-px bg-navy-700 transition-all duration-reveal ease-out-luxe md:block"
            style={{ width: `${pct}%` }}
          />
          <ol className="grid gap-10 md:grid-cols-3">
            {NODES.map((n, i) => (
              <li
                key={n.title}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <span
                  className={`block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-ui ${
                    i <= active ? "border-navy-700 bg-navy-700" : "border-line bg-white"
                  }`}
                />
                <p className="mono-meta mt-4">{n.time}</p>
                <h3 className="heading-3 mt-1">{n.title}</h3>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-center">
          <Reveal className="w-full max-w-xl">
            <VerificationReportArtifact variant="hero" />
          </Reveal>
          <p className="mono-meta mt-4 text-center">
            Every room, photographed before we leave.
          </p>
        </div>
      </Container>
    </section>
  );
}
