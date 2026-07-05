import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Contained card for services / feature groups (design §7). */
export function ServiceCard({
  title,
  eyebrow,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-card border border-line bg-white p-7 shadow-card md:p-8 ${className}`.trim()}
    >
      {Icon && (
        <Icon size={22} strokeWidth={1.5} className="mb-4 text-navy-700" aria-hidden="true" />
      )}
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h3 className="heading-3">{title}</h3>
      <div className="mt-3 text-[0.9375rem] leading-relaxed text-muted md:text-base">
        {children}
      </div>
    </div>
  );
}
