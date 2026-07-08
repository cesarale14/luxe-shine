"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Sticky mobile quote bar (design §13): appears after the hero scrolls out,
 * hidden on the quote page itself. 60px + safe-area inset.
 */
export function MobileQuoteBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/quote") return null;

  // On the homepage, anchor back to the hero QuoteCard instead of routing.
  const href = pathname === "/" ? "#quote-card" : "/quote";

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900 px-4 pt-3 transition-transform duration-ui ease-out-luxe lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        href={href}
        className="flex h-11 w-full items-center justify-center rounded-btn bg-ivory text-[0.9375rem] font-medium text-navy-900"
        tabIndex={show ? 0 : -1}
      >
        Request a Quote
      </Link>
    </div>
  );
}
