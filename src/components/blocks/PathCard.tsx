import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Dual-path selector card (design §7 contained card, hover lift). Whole card links. */
export function PathCard({
  eyebrow,
  title,
  body,
  href,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-card border border-line bg-white p-8 shadow-card transition-all duration-ui ease-out-luxe hover:-translate-y-0.5 hover:border-line-hover md:p-10"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="mt-4 font-display text-[1.5rem] leading-tight text-navy-900 md:text-[1.75rem]">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted md:text-base">
        {body}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy-700 transition-colors group-hover:text-navy-600">
        {ctaLabel}
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-ui ease-out-luxe group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
