"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import {
  Field,
  NativeSelect,
  inputClass,
  labelClass,
  isValidZip,
  isValidUsMobile,
} from "./fields";
import { SITE, OWNER_NOTIFICATION_IMPLEMENTED } from "@/content/site";

/*
 * /quote — the 2-step flow (v2/§11), sharing field primitives with the hero QuoteCard
 * (one source of truth). Reads prefill params from the card's "Add details" link.
 *
 * BACKEND — P0 LAUNCH BLOCKER: placeholder submit handler, no backend.
 * TODO(launch): POST to the real endpoint with an INSTANT owner notification, tested
 *   end-to-end, before the 2-business-hour SLA is production-safe.
 */

type ServiceType = "home" | "str";

const SERVICE_OPTIONS = ["Signature Clean (recurring)", "Deep Clean", "Move-In / Out"];
const UNIT_TYPE_OPTIONS = ["Studio", "1BR", "2BR", "3BR+"];

export function QuoteForm() {
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    zip: "",
    bedsBaths: "",
    service: "",
    note: "",
    units: "",
    frequency: "",
    company: "",
  });
  const [unitTypes, setUnitTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  // Prefill from the hero card's "Add details" link.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("type");
    if (t === "home" || t === "str") setServiceType(t);
    setValues((v) => ({
      ...v,
      zip: p.get("zip") ?? v.zip,
      phone: p.get("phone") ?? v.phone,
      bedsBaths: p.get("size") ?? v.bedsBaths,
    }));
  }, []);

  const set = (k: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  function toggleUnitType(t: string) {
    setUnitTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = "Please add your name.";
    if (!isValidUsMobile(values.phone)) e.phone = "Enter a 10-digit mobile number.";
    if (!isValidZip(values.zip)) e.zip = "Enter a 5-digit zip code.";
    if (serviceType === "home" && !values.service) e.service = "Pick a service.";
    if (serviceType === "str" && !values.units.trim()) e.units = "How many units?";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    if (values.company.trim() !== "") {
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    const payload = { serviceType, ...values, unitTypes };
    try {
      if (!OWNER_NOTIFICATION_IMPLEMENTED) {
        console.info("[Luxe Shine] Quote request (placeholder — no backend):", payload);
      }
      await new Promise((r) => setTimeout(r, 500));
      setSubmitted(true);
      requestAnimationFrame(() => successRef.current?.focus());
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-card border border-line bg-white p-8 shadow-card focus:outline-none md:p-10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-palm-tint">
          <Check size={22} strokeWidth={2} className="text-palm" />
        </span>
        <h2 className="display-2 mt-6">Got it.</h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted md:text-base">
          {SITE.ownerFirstName} will text you within 2 business hours with a flat-rate quote,
          in writing. If you wrote outside business hours, you&rsquo;ll hear back first thing
          the next business morning.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <fieldset>
        <legend className={labelClass}>What are we quoting?</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(
            [
              { key: "home", label: "My home" },
              { key: "str", label: "My rental(s)" },
            ] as { key: ServiceType; label: string }[]
          ).map((opt) => {
            const active = serviceType === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={active}
                onClick={() => setServiceType(opt.key)}
                className={`flex items-center justify-between rounded-card border px-5 py-4 text-left text-[0.9375rem] font-medium transition-all duration-ui ease-out-luxe ${
                  active
                    ? "border-navy-900 bg-navy-900/[0.03] text-navy-900"
                    : "border-line bg-white text-navy-900 hover:border-line-hover"
                }`}
              >
                {opt.label}
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    active ? "border-palm bg-palm-tint" : "border-line"
                  }`}
                >
                  {active && <Check size={13} strokeWidth={2.5} className="text-palm" />}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="qf-company">Company (leave this field blank)</label>
        <input
          id="qf-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company")(e.target.value)}
        />
      </div>

      {serviceType && (
        <Reveal key={serviceType} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" required error={errors.name}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name")(e.target.value)}
                aria-invalid={!!errors.name}
                className={inputClass}
              />
            </Field>
            <Field label="Mobile number" htmlFor="phone" required error={errors.phone}>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                aria-invalid={!!errors.phone}
                className={inputClass}
              />
            </Field>
            <Field label="Zip code" htmlFor="zip" required error={errors.zip}>
              <input
                id="zip"
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

            {serviceType === "home" ? (
              <Field label="Bedrooms / bathrooms" htmlFor="bedsBaths">
                <input
                  id="bedsBaths"
                  type="text"
                  placeholder="e.g. 3 / 2"
                  value={values.bedsBaths}
                  onChange={(e) => set("bedsBaths")(e.target.value)}
                  className={inputClass}
                />
              </Field>
            ) : (
              <Field label="Number of units" htmlFor="units" required error={errors.units}>
                <input
                  id="units"
                  type="text"
                  inputMode="numeric"
                  value={values.units}
                  onChange={(e) => set("units")(e.target.value)}
                  aria-invalid={!!errors.units}
                  className={inputClass}
                />
              </Field>
            )}
          </div>

          {serviceType === "home" ? (
            <>
              <Field label="Service" htmlFor="service" required error={errors.service}>
                <NativeSelect
                  id="service"
                  value={values.service}
                  onChange={set("service")}
                  options={SERVICE_OPTIONS}
                  placeholder="Choose a service"
                  invalid={!!errors.service}
                />
              </Field>
              <Field label="Anything we should know? (optional)" htmlFor="note">
                <textarea
                  id="note"
                  rows={3}
                  placeholder="Pets, access, priorities…"
                  value={values.note}
                  onChange={(e) => set("note")(e.target.value)}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </>
          ) : (
            <>
              <div>
                <span className={labelClass}>Unit types</span>
                <div className="flex flex-wrap gap-2">
                  {UNIT_TYPE_OPTIONS.map((t) => {
                    const active = unitTypes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleUnitType(t)}
                        className={`rounded-btn border px-4 py-2 text-[0.875rem] transition-colors duration-ui ${
                          active
                            ? "border-navy-900 bg-navy-900 text-white"
                            : "border-line bg-white text-navy-900 hover:border-line-hover"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <Field label="Turnovers per month" htmlFor="frequency">
                <input
                  id="frequency"
                  type="text"
                  placeholder="estimated"
                  value={values.frequency}
                  onChange={(e) => set("frequency")(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-[52px] items-center justify-center rounded-btn bg-navy-900 px-8 text-[1.0625rem] font-medium text-white transition-colors duration-ui ease-out-luxe hover:bg-navy-600 disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Request My Quote"}
            </button>
            <p className="text-[0.8125rem] leading-relaxed text-muted">
              Anything missed, we re-clean within 24 hours.{" "}
              <span className="font-medium text-palm">Free.</span>
            </p>
          </div>
          <p className="text-[0.8125rem] text-muted">
            No spam, no sales sequence — a quote and one brief follow-up.{" "}
            <Link href="/standard" className="link-cta">
              Read the standard
            </Link>
          </p>
        </Reveal>
      )}
    </form>
  );
}
