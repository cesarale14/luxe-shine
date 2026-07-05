import type { ReactNode } from "react";

/** The only uppercase element in the system (design §4). */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}
