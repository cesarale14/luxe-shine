"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SITE, isPlaceholder } from "@/content/site";
import { Button } from "@/components/ui/Button";

const links = NAV.filter((n) => !n.cta);
const hasPhone = !isPlaceholder(SITE.phone.href) && SITE.phone.href;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the full-screen sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur supports-[backdrop-filter]:bg-ivory/75">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link href="/" aria-label="Luxe Shine — home" className="inline-flex items-center">
          {/* Premium wordmark asset (navy on transparent). Wordmark-only in the header;
              the house-mark logo is never used here (brand rule §0).
              TODO(brand): replace with the final exported SVG/PNG wordmark when available. */}
          <Image
            src="/brand/luxe-shine-wordmark.png"
            alt="Luxe Shine"
            width={600}
            height={137}
            priority
            className="h-auto w-[130px] md:w-[168px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.9375rem] transition-colors duration-ui ${
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
              className="flex items-center gap-1.5 text-[0.9375rem] text-navy-700 hover:text-navy-600"
            >
              <Phone size={16} strokeWidth={1.5} />
              {SITE.phone.display}
            </a>
          )}
          <Button href="/quote">Request a Quote</Button>
        </nav>

        {/* Mobile controls: quote button stays visible outside the menu (§4) */}
        <div className="flex items-center gap-2 md:hidden">
          <Button href="/quote" size="standard" className="h-10 px-4 text-[0.875rem]">
            Request a Quote
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center text-navy-900"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Full-screen mobile sheet (ivory, Fraunces links) */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory md:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <Image
              src="/brand/luxe-shine-wordmark.png"
              alt="Luxe Shine"
              width={600}
              height={137}
              className="h-auto w-[150px]"
            />
            <button
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
      )}
    </header>
  );
}
