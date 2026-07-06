import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Shared quote field primitives — one source of truth for the hero QuoteCard and the
 * /quote page form (v2.1). text-base = 16px so iOS never auto-zooms inputs.
 */
export const inputClass =
  "w-full rounded-btn border border-line bg-white px-4 py-3 text-base text-navy-900 placeholder:text-muted/60 transition-colors focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20";
export const labelClass = "mb-1.5 block text-[0.8125rem] font-medium text-navy-900";

export function Field({
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

export function NativeSelect({
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

/** Validators shared by both quote surfaces. */
export const isValidZip = (z: string) => /^\d{5}$/.test(z.trim());
export const phoneDigits = (p: string) => p.replace(/\D/g, "");
export const isValidUsMobile = (p: string) => phoneDigits(p).length === 10;
