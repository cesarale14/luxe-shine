import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/** Consistent section header: eyebrow + display-2 title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`.trim()}>
      {eyebrow && <Eyebrow className={centered ? "flex justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2 className={`display-2 ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
      {lead && (
        <p className={`lede mt-5 max-w-2xl ${centered ? "mx-auto" : ""}`}>{lead}</p>
      )}
    </div>
  );
}
