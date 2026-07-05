import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICE_AREAS } from "@/content/site";

/** Named neighborhoods, never "Tampa Bay area" (strategy §12). */
export function ServiceAreaBlock({
  bg = "ivory",
  copy = "Nearby but not listed? Ask. We keep our service area tight on purpose — crews that aren't rushed between jobs do better work.",
}: {
  bg?: "white" | "ivory";
  copy?: string;
}) {
  return (
    <Section bg={bg}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow="Service area" title="Tampa, deliberately." />
        <div>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[1.0625rem] text-navy-900">
            {SERVICE_AREAS.map((area, i) => (
              <li key={area} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-line-hover">·</span>}
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
            {copy}
          </p>
        </div>
      </div>
    </Section>
  );
}
