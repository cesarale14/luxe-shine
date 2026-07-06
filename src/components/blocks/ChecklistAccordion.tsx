"use client";

import { useId, useState } from "react";
import { Plus, Check } from "lucide-react";
import type { ChecklistGroup } from "@/content/checklists";

/** Collapsed-by-default "what's included" accordion for /standard (v2 §4). */
export function ChecklistAccordion({ groups }: { groups: ChecklistGroup[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {groups.map((group, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p-${i}`;
        return (
          <div key={group.title}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-[1.0625rem] font-medium text-navy-900">{group.title}</span>
              <Plus
                size={20}
                strokeWidth={1.5}
                className={`shrink-0 text-navy-700 transition-transform duration-ui ease-out-luxe ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              className="grid transition-all duration-ui ease-out-luxe"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2.5 pb-6">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
