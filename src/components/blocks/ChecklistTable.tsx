import { Check } from "lucide-react";
import type { ChecklistGroup } from "@/content/checklists";

/**
 * Published checklist, rendered on-page as HTML (SEO value, strategy §9).
 * Editorial-block treatment (design §7): hairline top rule + group title + items.
 */
export function ChecklistTable({
  groups,
  columns = 2,
}: {
  groups: ChecklistGroup[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-x-12 gap-y-10 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {groups.map((group) => (
        <div key={group.title} className="border-t border-line pt-6">
          <h3 className="eyebrow text-navy-700">{group.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {group.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-text">
                <Check
                  size={16}
                  strokeWidth={1.75}
                  className="mt-1 shrink-0 text-navy-700"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
