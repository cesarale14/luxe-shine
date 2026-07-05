import { Image as ImageIcon } from "lucide-react";

/**
 * Clearly-marked placeholder for real work photography that does not exist yet.
 * Honesty rule: absence is marked visibly, never filled with stock or fabricated images.
 *
 * TODO(launch): replace every PhotoPlaceholder with real, consistently-graded work
 * photography (design §9). Own STR units are the portfolio.
 */
export function PhotoPlaceholder({
  label,
  ratio = "4 / 3",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-sand text-center ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <ImageIcon size={24} strokeWidth={1.25} className="text-navy-700/40" aria-hidden="true" />
      <span className="mono-meta mt-3 px-4 text-navy-700/60">[ {label} ]</span>
    </div>
  );
}
