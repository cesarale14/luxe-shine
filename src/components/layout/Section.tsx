import type { ReactNode } from "react";
import { Container } from "./Container";

type Background = "white" | "ivory" | "sand" | "navy";

const backgrounds: Record<Background, string> = {
  white: "bg-white",
  ivory: "bg-ivory",
  sand: "bg-sand",
  navy: "on-dark", // navy-900 bg + ivory text (design §3, max once per page)
};

export function Section({
  children,
  bg = "white",
  id,
  className = "",
  containerClassName = "",
  bleed = false,
}: {
  children: ReactNode;
  bg?: Background;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** When true, children are rendered without the max-width Container. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-section-mobile md:py-section-desktop ${backgrounds[bg]} ${className}`.trim()}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
