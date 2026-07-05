"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { SITE, SLA_MICROCOPY, OWNER_NOTIFICATION_IMPLEMENTED } from "@/content/site";

/*
 * Quote form (strategy §10, form spec in the pack).
 *
 * BACKEND — P0 LAUNCH BLOCKER:
 * This uses a PLACEHOLDER submit handler. There is no backend yet.
 * TODO(launch): POST submissions to an endpoint that fires an INSTANT owner
 *   SMS/email notification, tested end-to-end, BEFORE publishing the 2-business-hour
 *   SLA. See OWNER_NOTIFICATION_IMPLEMENTED in src/content/site.ts.
 *   If notifications are NOT live at launch, change all SLA copy to "same business day".
 */

type ServiceType = "home" | "str";

const inputClass =
  // text-base = 16px so iOS never auto-zooms the field (design §13).
  "w-full rounded-btn border border-line bg-white px-4 py-3 text-base text-navy-900 placeholder:text-muted/60 transition-colors focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20";
const labelClass = "mb-1.5 block text-[0.8125rem] font-medium text-navy-900";

const SERVICE_OPTIONS = [
  "Signature Clean (recurring)",
  "The Deep Reset (deep clean)",
  "Move-Ready Clean (move in/out)",
];
const UNIT_TYPE_OPTIONS = ["Studio", "1BR", "2BR", "3BR+"];
const PLATFORM_OPTIONS = ["Airbnb", "VRBO", "Both", "Other"];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+(]?[\d][\d\s().-]{6,}$/;

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label} {required && <span className="text-muted">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-[0.8125rem] text-[#9B2C2C]">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={`${inputClass} appearance-none pr-10 ${value ? "" : "text-muted/60"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-navy-900">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.5}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}

export function QuoteForm() {
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    bedsBaths: "",
    service: "",
    timing: "",
    units: "",
    platform: "",
    frequency: "",
    notes: "",
    company: "", // honeypot — must stay empty
  });
  const [unitTypes, setUnitTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  const set = (k: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  function toggleUnitType(t: string) {
    setUnitTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!serviceType) e.serviceType = "Choose what we're quoting.";
    if (!values.name.trim()) e.name = "Please add your name.";
    if (!values.phone.trim()) e.phone = "A phone number is required — quotes often close on a call.";
    else if (!phoneRe.test(values.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!values.email.trim()) e.email = "An email is required.";
    else if (!emailRe.test(values.email.trim())) e.email = "Enter a valid email address.";
    if (!values.zip.trim()) e.zip = "Add your zip code so we can confirm we serve you.";
    if (serviceType === "home" && !values.service) e.service = "Pick a service to start.";
    if (serviceType === "str" && !values.units.trim()) e.units = "How many units?";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (!validate()) return;

    // Honeypot: a real user never fills this. Silently drop bots as a "success".
    if (values.company.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    const payload = { serviceType, ...values, unitTypes };
    try {
      // TODO(backend): replace this placeholder with a POST to a real endpoint that
      // triggers an INSTANT owner notification (SMS/email), tested end-to-end, before
      // the 2-business-hour SLA is treated as production-safe.
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
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
          Your quote is being prepared now — expect it within 2 business hours. It will
          come from {SITE.ownerFirstName} directly, by text or email, whichever you prefer.
          If you requested outside business hours, you&rsquo;ll hear from us first thing the
          next business morning.
        </p>
        <p className="mt-6 text-[0.9375rem] text-muted">
          In the meantime, the full cleaning standard is published here if you haven&rsquo;t
          read it yet:{" "}
          <Link href="/our-standard" className="link-cta">
            Read the Luxe Shine Standard
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Service-type selector — controls conditional fields */}
      <fieldset>
        <legend className={labelClass}>
          What are we quoting? <span className="text-muted">*</span>
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(
            [
              { key: "home", label: "My home" },
              { key: "str", label: "My short-term rental(s)" },
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
        {errors.serviceType && (
          <p className="mt-2 text-[0.8125rem] text-[#9B2C2C]">{errors.serviceType}</p>
        )}
      </fieldset>

      {/* Honeypot — always present, visually hidden, off-screen, skipped by AT.
          A real user never fills it; bots that do are silently dropped on submit. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this field blank)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company")(e.target.value)}
        />
      </div>

      {serviceType && (
        <>
          {/* Shared contact fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" required error={errors.name}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name")(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field label="Phone" htmlFor="phone" required error={errors.phone}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field label="Email" htmlFor="email" required error={errors.email}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email")(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field
              label={serviceType === "str" ? "Zip code(s)" : "Zip code"}
              htmlFor="zip"
              required
              error={errors.zip}
            >
              <input
                id="zip"
                type="text"
                autoComplete="postal-code"
                value={values.zip}
                onChange={(e) => set("zip")(e.target.value)}
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? "zip-error" : undefined}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Residential branch */}
          {serviceType === "home" && (
            <div className="grid gap-5 sm:grid-cols-2">
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
              <Field label="Service" htmlFor="service" required error={errors.service}>
                <Select
                  id="service"
                  value={values.service}
                  onChange={set("service")}
                  options={SERVICE_OPTIONS}
                  placeholder="Choose a service"
                  invalid={!!errors.service}
                />
              </Field>
              <Field label="Preferred timing" htmlFor="timing">
                <input
                  id="timing"
                  type="text"
                  placeholder="e.g. weekday mornings, starting next month"
                  value={values.timing}
                  onChange={(e) => set("timing")(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          )}

          {/* STR branch */}
          {serviceType === "str" && (
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Number of units" htmlFor="units" required error={errors.units}>
                  <input
                    id="units"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={values.units}
                    onChange={(e) => set("units")(e.target.value)}
                    aria-invalid={!!errors.units}
                    aria-describedby={errors.units ? "units-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Platform" htmlFor="platform">
                  <Select
                    id="platform"
                    value={values.platform}
                    onChange={set("platform")}
                    options={PLATFORM_OPTIONS}
                    placeholder="Airbnb / VRBO / both / other"
                  />
                </Field>
                <Field label="Turnover frequency" htmlFor="frequency">
                  <input
                    id="frequency"
                    type="text"
                    placeholder="estimated turns per month"
                    value={values.frequency}
                    onChange={(e) => set("frequency")(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <fieldset>
                <legend className={labelClass}>Unit types</legend>
                <div className="mt-1 flex flex-wrap gap-2">
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
              </fieldset>
            </div>
          )}

          {/* Shared notes */}
          <Field label="Anything we should know? (optional)" htmlFor="notes">
            <textarea
              id="notes"
              rows={4}
              placeholder={
                serviceType === "home"
                  ? "Pets, access, priorities…"
                  : "Access, linen setup, PMS/calendar, priorities…"
              }
              value={values.notes}
              onChange={(e) => set("notes")(e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-[52px] w-full items-center justify-center rounded-btn bg-navy-900 px-7 text-[1.0625rem] font-medium text-white transition-colors duration-ui ease-out-luxe hover:bg-navy-600 disabled:opacity-40 sm:w-auto"
            >
              {submitting ? "Sending…" : "Request My Quote"}
            </button>
            <p className="mt-4 max-w-md text-[0.8125rem] leading-relaxed text-muted">
              No spam, no sales sequence. A quote and one brief follow-up — that&rsquo;s it.
            </p>
            <p className="mono-meta mt-2">{SLA_MICROCOPY}</p>
          </div>
        </>
      )}
    </form>
  );
}
