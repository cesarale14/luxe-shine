"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { inputClass } from "./fields";

/*
 * Address field with Mapbox Search Box autocomplete (My Home tab).
 *
 * Powered by NEXT_PUBLIC_MAPBOX_TOKEN. Mapbox public tokens (pk.*) are designed to be
 * exposed client-side — restrict the token by URL in the Mapbox dashboard. Until the
 * token is present at BUILD time, this degrades gracefully to a plain street-address
 * input (no dropdown) so the form always works.
 *
 * Cost-efficient flow: /suggest while typing, /retrieve on select — Mapbox bills one
 * session per completed lookup, not per keystroke. Biased to the Tampa area.
 */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const TAMPA_PROXIMITY = "-82.4572,27.9506"; // lng,lat — biases suggestions to Tampa

type Suggestion = {
  mapbox_id: string;
  name: string;
  place_formatted?: string;
  full_address?: string;
};

type Props = {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onSelect: (r: { address: string; zip: string }) => void;
  invalid?: boolean;
  placeholder?: string;
};

function newSession() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `s-${Date.now()}`;
}

function zipFrom(text: string) {
  const m = text.match(/\b(\d{5})\b/);
  return m ? m[1] : "";
}

/** No token configured → plain input, browser autofill only, no live dropdown. */
function PlainAddressInput({ id, value, onChange, onSelect, invalid, placeholder }: Props) {
  return (
    <input
      id={id}
      type="text"
      autoComplete="street-address"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        onSelect({ address: e.target.value, zip: zipFrom(e.target.value) });
      }}
      aria-invalid={invalid || undefined}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

/** Token present → Mapbox Search Box combobox with a suggestions dropdown. */
function MapboxAddressInput({ id, value, onChange, onSelect, invalid, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const sessionRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const skipNextFetch = useRef(false);

  useEffect(() => {
    sessionRef.current = newSession();
    return () => abortRef.current?.abort();
  }, []);

  // Debounced /suggest as the user types.
  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const q = value.trim();
    if (q.length < 3) {
      setItems([]);
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const url =
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(q)}` +
        `&access_token=${MAPBOX_TOKEN}&session_token=${sessionRef.current}` +
        `&country=us&types=address&proximity=${TAMPA_PROXIMITY}&limit=5`;
      fetch(url, { signal: ctrl.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!data) return;
          const next: Suggestion[] = data.suggestions ?? [];
          setItems(next);
          setActive(-1);
          setOpen(next.length > 0);
        })
        .catch(() => {
          /* aborted or network error — stay silent, keep the plain field usable */
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [value]);

  async function select(s: Suggestion) {
    const display = s.full_address ?? [s.name, s.place_formatted].filter(Boolean).join(", ");
    skipNextFetch.current = true;
    onChange(display);
    setOpen(false);
    setItems([]);
    setActive(-1);
    let zip = "";
    try {
      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${s.mapbox_id}` +
          `?access_token=${MAPBOX_TOKEN}&session_token=${sessionRef.current}`
      );
      if (res.ok) {
        const data = await res.json();
        zip = data.features?.[0]?.properties?.context?.postcode?.name ?? "";
      }
    } catch {
      /* fall through to text parse */
    }
    if (!zip) zip = zipFrom(display);
    onSelect({ address: display, zip });
    sessionRef.current = newSession(); // start a fresh billing session after a completed lookup
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open && items.length > 0) setOpen(true);
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (open && active >= 0 && items[active]) {
        e.preventDefault();
        select(items[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        aria-invalid={invalid || undefined}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => items.length > 0 && setOpen(true)}
        onBlur={() => setOpen(false)}
        className={inputClass}
      />
      {open && items.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-[0.75rem] border border-line bg-white shadow-[0_8px_28px_rgba(16,35,63,0.12)]"
        >
          {items.map((s, i) => (
            <li
              key={s.mapbox_id}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                select(s);
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-4 py-2.5 ${i === active ? "bg-ivory" : "bg-white"}`}
            >
              <span className="block text-[0.9375rem] leading-tight text-navy-900">{s.name}</span>
              {s.place_formatted && (
                <span className="mt-0.5 block text-[0.8125rem] leading-tight text-muted">
                  {s.place_formatted}
                </span>
              )}
            </li>
          ))}
          <li
            aria-hidden="true"
            className="border-t border-line px-4 py-1.5 text-right text-[0.6875rem] tracking-wide text-muted/70"
          >
            Search by Mapbox
          </li>
        </ul>
      )}
    </div>
  );
}

export function AddressAutocomplete(props: Props) {
  // MAPBOX_TOKEN is a build-time constant, so this branch is stable across renders
  // (no conditional-hook hazard): one component type is chosen for the whole mount.
  if (!MAPBOX_TOKEN) return <PlainAddressInput {...props} />;
  return <MapboxAddressInput {...props} />;
}
