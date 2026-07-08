"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Field, NativeSelect, inputClass, isValidZip, isValidUsMobile } from "./fields";
import { Reveal } from "@/components/ui/Reveal";
import { isLikelyBot } from "@/lib/antiAbuse";
import { SITE, OWNER_NOTIFICATION_IMPLEMENTED } from "@/content/site";

/*
 * Hero QuoteCard (v2.1). Segmented Home/Rental toggle, mode-specific fields, morph on
 * switch, success morphs in place with an "Add details" prefill link. Anti-abuse:
 * honeypot + >2s time-gate (isLikelyBot). Posts the lead to the (placeholder) pipeline.
 *
 * My Home: zip, size, mobile. My Rental: zip, units, booking platform, mobile.
 *
 * BACKEND — P0 LAUNCH BLOCKER: no real endpoint yet.
 * TODO(launch): POST {mode, zip, size|units, platform, phone, source_page, ts} to the real
 *   quote notification pipeline (instant owner SMS), add per-IP rate limiting, and confirm
 *   end-to-end BEFORE the 2-business-hour SLA promise (success state + /quote) is
 *   production-safe.
 */

type Mode = "home" | "str";

const SIZE_OPTIONS = ["1–2 bed", "3 bed", "4 bed", "5+ bed"];
const UNIT_OPTIONS = ["1", "2–4", "5+"];
const PLATFORM_OPTIONS = ["Airbnb", "Vrbo", "Booking.com", "Multiple platforms", "Direct / other"];
const cardShadow = "shadow-[0_4px_16px_rgba(16,35,63,0.08)]";

export function QuoteCard({ sourcePage = "home" }: { sourcePage?: string }) {
  const [mode, setMode] = useState<Mode>("home");
  const [values, setValues] = useState({ zip: "", size: "", units: "", platform: "", phone: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { mode: Mode; units: string; zip: string; phone: string; size: string }>(
    null
  );
  const renderedAt = useRef(0);
  const homeRef = useRef<HTMLButtonElement | null>(null);
  const strRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") === "str") setMode("str");
  }, []);

  const set = (k: keyof typeof values) => (v: string) =>
    setValues((p) => ({ ...p, [k]: v }));

  function selectMode(m: Mode) {
    setMode(m);
    (m === "home" ? homeRef : strRef).current?.focus();
  }
  function onToggleKey(e: KeyboardEvent) {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectMode("home");
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectMode("str");
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!isValidZip(values.zip)) e.zip = "Enter a 5-digit zip code.";
    if (mode === "home" && !values.size) e.size = "Pick a home size.";
    if (mode === "str" && !values.units) e.units = "How many units?";
    if (mode === "str" && !values.platform) e.platform = "Where do you list?";
    if (!isValidUsMobile(values.phone)) e.phone = "Enter a 10-digit mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const elapsedMs = Date.now() - renderedAt.current;
    // Anti-abuse: honeypot + time-gate. Bots are dropped as a silent "success".
    if (isLikelyBot({ honeypot: values.company, elapsedMs })) {
      setDone({ mode, units: values.units, zip: values.zip, phone: values.phone, size: values.size });
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      mode,
      zip: values.zip,
      ...(mode === "home" ? { size: values.size } : { units: values.units, platform: values.platform }),
      phone: values.phone,
      source_page: sourcePage,
      ts: new Date().toISOString(),
    };
    try {
      if (!OWNER_NOTIFICATION_IMPLEMENTED) {
        console.info("[Luxe Shine] Quote card (placeholder — no backend):", payload);
      }
      await new Promise((r) => setTimeout(r, 400));
      setDone({ mode, units: values.units, zip: values.zip, phone: values.phone, size: values.size });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    const detailsHref =
      `/quote?type=${done.mode}&zip=${encodeURIComponent(done.zip)}` +
      `&phone=${encodeURIComponent(done.phone)}` +
      (done.mode === "home" ? `&size=${encodeURIComponent(done.size)}` : "");
    const hostPartner = done.mode === "str" && done.units === "5+";
    return (
      <div className={`rounded-card border border-line bg-white p-7 md:p-8 ${cardShadow}`}>
        <div aria-live="polite">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-palm-tint">
            <Check size={22} strokeWidth={2} className="text-palm" />
          </span>
          <p className="mt-5 text-[1.0625rem] font-medium text-navy-900">Got it.</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
            You&rsquo;ll hear from {SITE.ownerFirstName} within 2 business hours.
            {hostPartner ? " We'll include Host Partner details." : ""}
          </p>
          <Link href={detailsHref} className="link-cta mt-5 inline-flex">
            Add details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-card border border-line bg-white p-7 md:p-8 ${cardShadow}`}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Segmented toggle */}
        <div
          role="radiogroup"
          aria-label="What are we quoting?"
          onKeyDown={onToggleKey}
          className="relative grid h-11 grid-cols-2 rounded-btn border border-line bg-ivory p-1"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-md bg-white shadow-[0_1px_2px_rgba(16,35,63,0.1)] transition-transform duration-ui ease-out-luxe"
            style={{ transform: mode === "str" ? "translateX(100%)" : "translateX(0)" }}
          />
          <button
            ref={homeRef}
            type="button"
            role="radio"
            aria-checked={mode === "home"}
            tabIndex={mode === "home" ? 0 : -1}
            onClick={() => selectMode("home")}
            className="relative z-10 text-[0.875rem] font-medium text-navy-900"
          >
            My Home
          </button>
          <button
            ref={strRef}
            type="button"
            role="radio"
            aria-checked={mode === "str"}
            tabIndex={mode === "str" ? 0 : -1}
            onClick={() => selectMode("str")}
            className="relative z-10 text-[0.875rem] font-medium text-navy-900"
          >
            My Rental
          </button>
        </div>

        {/* Fields */}
        <div className="mt-5 space-y-4">
          <Field label="Zip code" htmlFor="qc-zip" required error={errors.zip}>
            <input
              id="qc-zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={values.zip}
              onChange={(e) => set("zip")(e.target.value)}
              aria-invalid={!!errors.zip}
              className={inputClass}
            />
          </Field>

          {/* Mode-specific fields (morph on switch) */}
          <Reveal key={mode} className="space-y-4">
            {mode === "home" ? (
              <Field label="Home size" htmlFor="qc-size" required error={errors.size}>
                <NativeSelect
                  id="qc-size"
                  value={values.size}
                  onChange={set("size")}
                  options={SIZE_OPTIONS}
                  placeholder="Choose size"
                  invalid={!!errors.size}
                />
              </Field>
            ) : (
              <>
                <Field label="Units" htmlFor="qc-units" required error={errors.units}>
                  <NativeSelect
                    id="qc-units"
                    value={values.units}
                    onChange={set("units")}
                    options={UNIT_OPTIONS}
                    placeholder="How many?"
                    invalid={!!errors.units}
                  />
                </Field>
                <Field label="Booking platform" htmlFor="qc-platform" required error={errors.platform}>
                  <NativeSelect
                    id="qc-platform"
                    value={values.platform}
                    onChange={set("platform")}
                    options={PLATFORM_OPTIONS}
                    placeholder="Where do you list?"
                    invalid={!!errors.platform}
                  />
                </Field>
              </>
            )}
          </Reveal>

          <Field label="Mobile number" htmlFor="qc-phone" required error={errors.phone}>
            <input
              id="qc-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set("phone")(e.target.value)}
              aria-invalid={!!errors.phone}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="qc-company">Company (leave blank)</label>
          <input
            id="qc-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => set("company")(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-btn bg-navy-900 px-6 text-[1rem] font-medium text-white transition-colors duration-ui ease-out-luxe hover:bg-navy-600 disabled:opacity-40"
        >
          {submitting
            ? "Sending…"
            : mode === "home"
              ? "Request a Quote"
              : "Request Turnover Quote"}
        </button>
      </form>
    </div>
  );
}
