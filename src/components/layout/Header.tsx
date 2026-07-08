"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SITE, isPlaceholder } from "@/content/site";
import { Button } from "@/components/ui/Button";

const links = NAV.filter((n) => !n.cta);
const hasPhone = !isPlaceholder(SITE.phone.href) && SITE.phone.href;

/*
 * Header. Below `lg` (1024px) the bar carries ONLY the wordmark + hamburger — the
 * "Request a Quote" CTA lives in the sticky bottom bar on mobile/tablet, so the header
 * never crowds three items into a narrow width. The full nav + header CTA appear at lg.
 *
 * The full-screen menu is PORTALED to <body>, not rendered inside this header: the header
 * uses `backdrop-blur`, and backdrop-filter makes an element the containing block for its
 * fixed descendants — which otherwise traps the `fixed inset-0` sheet inside the 64px bar.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: lock body scroll, close on Escape, focus the close button.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sheet = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu-sheet-in fixed inset-0 z-[60] flex flex-col bg-ivory lg:hidden"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Image
          src="/brand/luxe-shine-wordmark.png"
          alt="Luxe Shine"
          width={600}
          height={137}
          className="h-auto w-[130px]"
        />
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center text-navy-900"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-2 px-6 pt-8" aria-label="Mobile">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="border-b border-line py-4 font-display text-[1.75rem] text-navy-900"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-8">
          <Button href="/quote" size="hero" className="w-full">
            Request a Quote
          </Button>
        </div>
        {hasPhone && (
          <a
            href={SITE.phone.href as string}
            className="mt-4 flex items-center justify-center gap-2 text-navy-700"
          >
            <Phone size={18} strokeWidth={1.5} />
            {SITE.phone.display}
          </a>
        )}
      </nav>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur supports-[backdrop-filter]:bg-ivory/75">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-6">
          <Link href="/" aria-label="Luxe Shine — home" className="inline-flex shrink-0 items-center">
            {/* Premium wordmark asset (navy on transparent). Wordmark-only in the header;
                the house-mark logo is never used here (brand rule §0).
                TODO(brand): replace with the final exported SVG/PNG wordmark when available. */}
            <Image
              src="/brand/luxe-shine-wordmark.png"
              alt="Luxe Shine"
              width={600}
              height={137}
              priority
              className="h-auto w-[130px] lg:w-[168px]"
            />
          </Link>

          {/* Desktop nav — appears only when there's room (>= lg / 1024px). */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap text-[0.9375rem] transition-colors duration-ui ${
                    active ? "text-navy-900" : "text-muted hover:text-navy-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {hasPhone && (
              <a
                href={SITE.phone.href as string}
                className="flex items-center gap-1.5 whitespace-nowrap text-[0.9375rem] text-navy-700 hover:text-navy-600"
              >
                <Phone size={16} strokeWidth={1.5} />
                {SITE.phone.display}
              </a>
            )}
            <Button href="/quote">Request a Quote</Button>
          </nav>

          {/* Mobile / tablet: hamburger only — the sticky bottom bar carries the CTA. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-navy-900 lg:hidden"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {mounted && open && createPortal(sheet, document.body)}
    </>
  );
}
