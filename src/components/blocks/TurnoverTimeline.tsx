"use client";

import { useEffect, useRef, useState } from "react";

/**
 * STR turnover timeline (v2 §7.4): a day-strip whose nodes advance sequentially on
 * enter — teaches same-day capability without a paragraph. Plays once.
 * Reduced-motion → all nodes shown immediately.
 */
const NODES = [
  { time: "10:00", label: "Guest out" },
  { time: "10:20", label: "Crew in" },
  { time: "1:47", label: "Report sent" },
  { time: "4:00", label: "Guest in" },
];

export function TurnoverTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* base + fill track (desktop) */}
      <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-line md:block" />
      <div
        className="absolute left-0 top-[9px] hidden h-px bg-palm transition-all ease-out-luxe md:block"
        style={{
          width: shown ? "100%" : "0%",
          transitionDuration: reduce ? "0ms" : "1100ms",
        }}
      />
      <ol className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {NODES.map((n, i) => (
          <li
            key={n.time}
            className="transition-all ease-out-luxe"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(10px)",
              transitionDuration: reduce ? "0ms" : "500ms",
              transitionDelay: reduce ? "0ms" : `${i * 180}ms`,
            }}
          >
            <span
              className={`block h-[18px] w-[18px] rounded-full border-2 ${
                i === NODES.length - 1 ? "border-palm bg-palm-tint" : "border-navy-700 bg-white"
              }`}
            />
            <p className="mono-meta mt-4 text-navy-900">{n.time}</p>
            <p className="mt-1 text-[0.9375rem] text-muted">{n.label}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
