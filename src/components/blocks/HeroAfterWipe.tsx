"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { VerifiedStar } from "@/components/ui/VerifiedStar";

/**
 * The after-wipe (v2 §6, §7.1). The finished-room ("after") image is the base layer
 * and LCP element — always visible, so no-JS and reduced-motion users see the result.
 * On load (motion allowed) a "before" overlay wipes away left-to-right in 1.2s, once.
 * A replay control re-triggers it.
 *
 * TODO(brand): replace the placeholder panels with a real before/after photo pair,
 * identical framing/grade (design §10). Until then the tone shift stands in.
 */
export function HeroAfterWipe() {
  const [playing, setPlaying] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setPlaying(true);
  }, []);

  const replay = () => {
    setRunId((r) => r + 1);
    setPlaying(true);
  };

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-[#f4f0e9]">
      {/* AFTER — base layer / LCP */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f4f0e9]">
        <VerifiedStar size={22} tone="palm" />
        <span className="mono-meta text-navy-700/70">[ AFTER — finished Tampa room ]</span>
      </div>

      {/* BEFORE — overlay that wipes away to reveal AFTER */}
      {playing && (
        <div
          key={runId}
          onAnimationEnd={() => setPlaying(false)}
          className="wipe-away absolute inset-0 flex items-center justify-center bg-[#d8d2c5]"
        >
          <span className="mono-meta text-navy-900/50">[ BEFORE ]</span>
        </div>
      )}

      <button
        type="button"
        onClick={replay}
        aria-label="Replay the before and after"
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-3 py-1.5 text-[0.6875rem] font-medium text-navy-700 backdrop-blur transition-colors hover:text-navy-900"
      >
        <RotateCcw size={13} strokeWidth={1.75} />
        Replay
      </button>
    </div>
  );
}
