# Luxe Shine — Visual Design Direction

For the website build. Every value here is a decision, not a suggestion — hexes, fonts, sizes, and durations are specified so this document can be handed directly to implementation.

---

## 0. Logo Reality Check (read first)

**The problem.** The current mark — green swoosh, house silhouette, squeegee, sparkle stars, lime green + royal blue, bold caps — is the standard visual language of discount cleaning and pressure-washing companies. Premium buyers pattern-match in under a second, and this is the pattern they're pattern-matching *against*. Left at full strength, the logo fights every other decision in this document. It also contains "SOLUTIONS," which the brand rules ban from public-facing copy — the lockup violates the naming rule by existing.

**The containment plan (zero redesign cost, launch-ready):**
1. **Header:** wordmark only — "Luxe Shine" typeset in the site display face (spec in §4), navy ink, ~28–32px tall. No illustration, no swoosh, no "SOLUTIONS."
2. **Footer (optional):** if the mark must appear, use a **single-color navy version** of the full logo at small size. Monochrome neutralizes most of the budget energy even when the shapes remain.
3. **Everywhere else on the site:** the full-color lockup does not appear. It continues to live on invoices, estimates, and ops paperwork, where B2B context makes it harmless.
4. **The rescue:** the white four-point star from the roofline, redrawn as a 1.5px line glyph, becomes the brand's "verified" motif — used beside photo-report and guarantee moments. This gives the site genuine continuity with the mark without inheriting its energy.
5. **P2 (not a launch blocker):** commission a proper wordmark/monogram once revenue justifies it. The site system below is designed to outlive the current logo.

---

## 1. Overall Design Concept

**Concept name: The Standard, Visualized.**

The site should feel like walking into a freshly turned five-star suite: white, ordered, warm light, one note of green through the window. For a cleaning company, **whitespace is the product demo** — an immaculate, uncluttered page is congruent proof of an immaculate, systemized service, and a cluttered page would falsify the brand before a word is read.

Two layers make it Luxe Shine rather than a generic boutique-hotel site:
- **The hospitality layer** — warm whites, a refined serif, generous air, photography of real Tampa rooms in real light.
- **The operational layer** — the system made visible: monospaced timestamps, checklist counts, the photo-verification report treated as a designed artifact. Discipline shows in details, not decoration.

**Signature element (the one memorable thing):** the **verification report artifact** — a designed card showing a real photo report: room thumbnails, mono timestamp, unit label, checklist count, the star glyph. It appears at hero scale once on the Home proof block, and echoes at small scale wherever "photo-verified" is claimed. Everything else on the site stays quiet so this one element carries the brand's proof story.

---

## 2. Moodboard Description

Ten tiles, if this were pinned to a wall:

1. A white hotel bed, corners squared, shot straight-on in morning sidelight — the "reveal" image.
2. A stack of three folded white towels on warm wood, shadows soft.
3. Deep navy ink on ivory paper — a letterpress business card texture.
4. A palm frond shadow cast across a white stucco wall (Tampa, said quietly).
5. A boutique-hotel corridor: symmetry, hush, warm downlight.
6. A printed checklist on a clipboard, one item ticked in green ink.
7. Monospaced type on a shipping manifest — operational truth.
8. Bay light through a bungalow window, linen curtain moving.
9. A brass door number "4" on a painted door (the optional metallic micro-note).
10. A phone photographing a finished room — the verification moment itself.

What's *not* on the board: sparkles, bubbles, spray bottles, rubber gloves, smiling models, lime green anything.

---

## 3. Color Palette

The system is 90% neutral + navy. Color discipline *is* the premium signal.

| Token | Hex | Role |
|---|---|---|
| `--white` | `#FFFFFF` | Primary background, cards |
| `--ivory` | `#FAF7F2` | Alternating section bands (warm, not yellow) |
| `--sand` | `#EFE9DF` | Rare third band, skeleton/loading states |
| `--line` | `#E5DFD3` | Hairlines, card borders, dividers |
| `--navy-900` | `#10233F` | Headlines, primary buttons, ink |
| `--navy-700` | `#1E3A5F` | Links, icon strokes, secondary emphasis |
| `--navy-600` | `#274B73` | Hover states |
| `--text` | `#1C2B42` | Body text (navy-derived, cohesive) |
| `--muted` | `#5B6779` | Secondary text, captions |
| `--palm` | `#3F6B54` | Verification/success accent — checkmarks, "verified," guarantee. **≤5% of any view** |
| `--palm-tint` | `#E9F0EB` | Success chip backgrounds only |
| `--brass` | `#A98C5F` | *Optional* micro-accent: hairline details, the guarantee seal rule. Tiny doses or omit entirely |

**Rules:**
- The logo's lime green (`#7AC143`-class) and full-saturation royal blue never appear as UI colors. Navy-900 is the "evolved" logo blue; palm is the "evolved" green — muted, Tampa-foliage, not sport-lime.
- Palm means one thing: *verified/guaranteed*. Never decorative, never a big background.
- No gradients. Bands alternate white → ivory → white; sand appears at most once per page.
- Dark sections (navy-900 background, ivory text) allowed once per page maximum — best used for the "We host too" block or final CTA.

---

## 4. Typography

| Role | Face | Source | Usage |
|---|---|---|---|
| **Display** | **Fraunces** (variable) | Google Fonts | H1/H2, the wordmark. Weight 380–450 at large sizes (light-ish, warm, expensive). Never bold-black |
| **Body / UI** | **General Sans** or **Switzer** | Fontshare (free) | Everything else. Fallback if build friction: Schibsted Grotesk (Google). Inter only as last resort — it reads template |
| **Mono** | **IBM Plex Mono** | Google Fonts | Timestamps, report metadata, checklist counts, BEFORE/AFTER tags. Small sizes only (11–13px). This face signals "system, not vibes" |

**Scale (desktop / mobile):**
- H1: Fraunces 64px / clamp(34–40px), line-height 1.08, letter-spacing −0.5%
- H2: Fraunces 40px / 28px
- H3: Sans 600, 22px / 19px
- Body: Sans 400, 18px / 17px, line-height 1.65, measure 60–70ch
- Eyebrow labels: Sans 500, 12px, letter-spacing +8%, uppercase — **the only uppercase element in the system**
- Mono metadata: 12px, `--muted` or `--navy-700`

**Rules:** sentence case everywhere (headlines, buttons, nav). No all-caps headline stacks — bold caps is flyer energy. No italics except sparing Fraunces italic for one-word inflections.

---

## 5. Layout Principles

- 12-column grid, content max-width **1160px**, gutters 24px.
- Section padding: **120px** vertical desktop, **72px** mobile. Air is the aesthetic; when in doubt, add space, remove elements.
- **One idea per section.** If a section needs a second heading, it's two sections.
- Asymmetry over centering: editorial 7/5 and 6/6 splits for text+image sections. Center only heroes and final CTAs.
- Hairline 1px `--line` rules as section punctuation — never heavy borders or colored separators.
- Hero (Home), desktop:

```
| eyebrow                                    |
| H1 — Fraunces, 2 lines max      [ hero    ]|
| subhead — 1 line                [ image   ]|
| [Request a Quote] [STR Quote]   [ 7/12    ]|
| mono: Quotes within 2 business hours       |
```
Text column 5/12, image 7/12 — the image (a real finished room) is the biggest thing on the page because the work is the argument.
- Trust strip: single row, icon + label, hairline-separated, no boxes, no cards.
- Never more than 3 cards per row. Density reads discount.

---

## 6. Button Styles

| Variant | Spec |
|---|---|
| **Primary** | `--navy-900` bg, white text, radius **8px**, padding 16px 28px (52px tall hero size; 44px standard). Hover: `--navy-600`, 180ms ease-out. No gradients, no glow, no lift |
| **Secondary** | Transparent bg, 1px `--navy-900` border, navy text. Hover: navy bg at 4% tint. Used for STR Turnover Quote beside primary |
| **On-dark** | White 1px outline, ivory text (for the navy section) |
| **Text CTA** | Navy, underline 1px, underline-offset 3px. Hover: `--navy-600` |

Rules: sentence case labels ("Request a Quote"). Radius stays at 8px — pill buttons read consumer-app; 0px reads cold. Focus ring: 2px `--navy-600`, 2px offset (visible keyboard focus is a quality floor, not an option). Disabled: 40% opacity. Never two primary buttons in one viewport.

---

## 7. Card Styles

Two modes, used deliberately:

- **Contained card** (on ivory bands): white bg, 1px `--line` border, radius **12px**, padding 28–32px, shadow `0 1px 2px rgba(16,35,63,0.05)` — near-invisible. Hover (when interactive): border shifts to `#C9D3E0`, translateY(−2px), 180ms. For service cards, dual-path selector, FAQ items.
- **Editorial block** (on white): no border, no shadow — a 1px `--line` top rule + eyebrow label, generous padding. For checklist sections, process steps, the Standard content.

The **verification report artifact** (signature element) is a contained card with mono metadata header (`UNIT 2BR · 14 PHOTOS · 2:41 PM`), a thumbnail grid, and the star glyph — the most "designed" object on the site, which is why everything else stays plain.

## 8. Icon Style

- **Lucide** (already in stack), **1.5px stroke**, `--navy-700`, 20–24px. Line icons only.
- No filled icons, no multicolor icon sets, no emoji anywhere in UI.
- Check glyphs in trust contexts may sit in a 32px `--palm-tint` circle with `--palm` stroke — the only colored icon treatment.
- **Custom glyph:** the four-point star, redrawn at 1.5px stroke to match Lucide's grid. Appears beside "photo-verified" and on the report artifact. Maximum once per viewport outside the report card.
- Banned motifs even as line icons: squeegees, spray bottles, bubbles, sparkles-as-decoration.

---

## 9. Photography Direction

Photography carries the premium claim — this is where the budget is won, and the properties already exist.

- **Light:** natural only. Morning or late-afternoon sidelight. No on-camera flash, no HDR real-estate processing.
- **Camera discipline:** tripod, verticals true (architecture rule — no tilted door frames), 35–50mm equivalent. No wide-angle distortion; distortion reads "listing photo," not "brand photo."
- **Composition:** straight-on or gentle three-quarter angles. Declutter the frame before shooting — one stray cable undoes the whole message.
- **Grade:** one preset across every image on the site. Warm-neutral, slightly lifted shadows, restrained saturation. Consistency of grade is the single strongest "professional brand" tell.
- **Tampa, said quietly:** locality comes through light and foliage — palm shadow on a white wall, bay light through a window, a bungalow porch. Never flamingos, never postcard kitsch.
- **People:** hands and process over faces at launch. The verification moment (phone photographing a finished room), a branded-shirt detail, the checklist being worked. Owner portrait: environmental, natural light, on-site — not a gray-gradient headshot.
- **Never:** stock models in aprons, thumbs-ups, staged smiling-while-scrubbing.

---

## 10. Before/After Image Style

- **Default: static side-by-side pairs**, 4:3 each, hairline gap. Sliders are optional and can read gimmicky; if used, minimal 2px navy handle, no bounce.
- **Identical framing** — tripod position marked with tape, same focal length, same time-of-day light. A moved camera reads as a cheated comparison.
- **Identical grade.** Never brighten or saturate the "after." A visibly juiced after-shot is dishonest and premium buyers can tell.
- Labels: mono eyebrow tags `BEFORE` / `AFTER`, 11px, top-left, `--muted`. No red arrows, no circles, no starbursts.
- The "after" may render 10–15% larger, or first on mobile — the after is the product.
- Curate hard: six immaculate pairs beat twenty adequate ones.

---

## 11. STR Turnover Visual Direction

**Temperature: crisp.** The STR audience buys precision, so the imagery leans geometric and exact:
- Squared bed corners shot straight-on; towel stacks; symmetric compositions; the tray setup; the unit from the front door exactly as a guest sees it at check-in.
- Grade shares the site preset with a slight cool bias relative to residential — clinical is wrong, *exact* is right.
- The operational layer is loudest here: the report artifact at full size, mono metadata (timestamp, unit type, photo count, restock log), the flag example (a damage photo presented as evidence, not drama).
- Layout can run slightly denser than residential — hosts are operators reading a spec, and the page may use the editorial-block mode with rules and mono labels more heavily.

## 12. Residential Cleaning Visual Direction

**Temperature: calm.** The homeowner buys relief:
- Morning light, linen and wood textures, a lived-in-but-immaculate room. Human traces allowed — a folded throw, a book on the nightstand — because the promise is "your life, minus the cleaning," not "a showroom."
- Grade: same preset, slight warm bias.
- Compositions relax: three-quarter angles, softer asymmetry, more air around subjects.
- Operational elements present but quieter: the checklist excerpt as an editorial block, the report artifact at small scale.

**One line to keep the system coherent: same grid, same type, same palette — STR reads crisp, Residential reads calm, and the difference is temperature, not identity.**

---

## 13. Mobile Design Principles

- **Sticky quote bar:** 60px + safe-area inset, `--navy-900`, single "Request a Quote" button. Appears after the hero scrolls out; hidden on the quote page itself.
- Tap targets ≥44px. Body text 17px; **form inputs never below 16px** (prevents iOS auto-zoom).
- H1 `clamp(34px, 8vw, 40px)`; section padding drops to 72px; grid collapses to single column with 20–24px gutters.
- Nav: full-screen sheet (ivory, Fraunces links, generous spacing) — not a dropdown. Phone number tap-to-call stays visible in the header outside the menu.
- Hero image gets a **portrait art-direction crop** via `<picture>` — recomposed, never squashed.
- **Performance is a design property:** fast is premium; jank is cheap. Hero image prioritized (LCP), everything below lazy-loaded, every image in an aspect-ratio box (zero layout shift), fonts preloaded with `font-display: swap`.

---

## 14. Animation / Microinteraction Guidance

Doctrine: motion confirms, never performs.

- UI transitions (hover, focus, accordion): **150–200ms**, ease-out.
- Scroll reveals: opacity 0→1 + translateY 12px→0, **500ms**, `cubic-bezier(0.22, 1, 0.36, 1)`, trigger once at ~20% visibility, never re-trigger. Card groups stagger **70ms**.
- **The one orchestrated moment** (matching the signature element): the report artifact assembles on first view — thumbnails fade in sequentially 120ms apart, then the mono timestamp appears. One second total. It demonstrates the system doing its job. Nothing else on the site gets choreography.
- FAQ accordions: height + chevron rotate, 200ms. No slide-in nav drama.
- Banned: parallax, spring/bounce easing, animated counters, marquees, confetti, typewriter headlines, hover tilts, cursor effects.
- `prefers-reduced-motion`: all reveals disabled, content simply visible. Non-negotiable.

---

## 15. What to Avoid Visually

The anti-list — each item is a "budget service" tell:

- Lime/kelly green or full-saturation royal blue as UI colors
- Gradient backgrounds, mesh blobs, glassmorphism
- Sparkles, bubbles, spray bottles, squeegees, rubber gloves — as icons, illustrations, or section decor
- Stock photos: models in aprons, thumbs-ups, fake team huddles
- All-caps bold headline stacks; more than one font weight ≥700 per page
- Pill buttons, glow shadows, drop-shadow soup
- Multicolor filled icon sets; emoji in UI
- Badge-shaped "trust seals" (fake-award energy) — trust renders as typeset facts with line icons, not shields
- Testimonial carousels and auto-rotating anything
- Animated number counters ("0 → 500 happy clients") — doubly banned given the no-fake-stats rule
- Entry popups, countdown timers, urgency banners, unmanned chat bubbles
- HDR real-estate photography, wide-angle distortion, inconsistent grading between photos
- Cramped sections and 4-up card grids — density reads discount
- The full-color logo lockup anywhere on the site (see §0)

---

## Appendix — Design Tokens (paste into the build)

```css
:root {
  /* color */
  --white: #FFFFFF;
  --ivory: #FAF7F2;
  --sand: #EFE9DF;
  --line: #E5DFD3;
  --navy-900: #10233F;
  --navy-700: #1E3A5F;
  --navy-600: #274B73;
  --text: #1C2B42;
  --muted: #5B6779;
  --palm: #3F6B54;
  --palm-tint: #E9F0EB;
  --brass: #A98C5F; /* optional, micro-doses */

  /* type */
  --font-display: 'Fraunces', serif;
  --font-body: 'General Sans', 'Schibsted Grotesk', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* radius */
  --radius-btn: 8px;
  --radius-card: 12px;

  /* motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-ui: 180ms;
  --dur-reveal: 500ms;

  /* layout */
  --content-max: 1160px;
  --section-pad-desktop: 120px;
  --section-pad-mobile: 72px;
}
```

**Build order note:** tokens and type first, then the report artifact component (it's the signature — get it right early), then pages. The site succeeds if a visitor's first impression is "this company is *ordered*" before they've read a single line.
