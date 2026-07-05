import { ShieldCheck, UserCheck, Camera, BadgeCheck } from "lucide-react";
import { TRUST_SIGNALS } from "@/content/site";

const icons = [ShieldCheck, UserCheck, Camera, BadgeCheck] as const;

/** Trust strip: single row, icon + label, hairline-separated, no boxes (design §5). */
export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between ${className}`.trim()}
    >
      {TRUST_SIGNALS.map((label, i) => {
        const Icon = icons[i];
        return (
          <li
            key={label}
            className="flex items-center gap-2.5 text-[0.9375rem] text-navy-900"
          >
            <Icon size={20} strokeWidth={1.5} className="shrink-0 text-navy-700" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
