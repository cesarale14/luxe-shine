/**
 * The published cleaning standards, verbatim from the copy deck (Our Standard page)
 * and the Residential "checklist, in brief" excerpt.
 *
 * [ADJUST] the rotation cadence group to match real operations before launch.
 */

export type ChecklistGroup = { title: string; items: string[] };

export const RESIDENTIAL_CHECKLIST: ChecklistGroup[] = [
  {
    title: "Kitchen",
    items: [
      "Counters and backsplash wiped and dried",
      "Sink and faucet scrubbed and polished, water-spot free",
      "Cabinet and drawer fronts wiped",
      "Appliance exteriors cleaned; stainless polished with the grain",
      "Microwave cleaned inside and out",
      "Small-appliance surfaces wiped (toaster, coffee maker)",
      "Trash emptied, liner replaced",
      "Floors vacuumed and mopped edge to edge",
    ],
  },
  {
    title: "Bathrooms",
    items: [
      "Shower and tub scrubbed; glass squeegeed",
      "Toilet cleaned inside and out, including base and behind",
      "Sink and counter cleaned; faucet polished",
      "Mirrors streak-free",
      "Towels replaced or squared",
      "Trash emptied",
      "Floors washed, corners included",
    ],
  },
  {
    title: "Bedrooms",
    items: [
      "Beds made with squared corners; linens changed when left out",
      "All surfaces, ledges, and decor dusted",
      "Mirrors and glass cleaned",
      "Floors vacuumed, including reachable under-bed areas",
    ],
  },
  {
    title: "Living and common areas",
    items: [
      "All surfaces, shelves, and decor dusted",
      "Glass and mirrors cleaned",
      "Cushions straightened, throws folded",
      "Touchpoints wiped — switches, handles, banisters",
      "Floors vacuumed and mopped edge to edge",
    ],
  },
  {
    title: "On rotation",
    // [ADJUST] rotation cadence to your ops before publishing.
    items: [
      "Baseboards, door frames, vents, ceiling-fan blades — worked through on a rotating schedule so nothing is ever more than a few visits from attention.",
    ],
  },
];

export const RESIDENTIAL_ADDONS =
  "Inside the refrigerator · inside the oven · interior windows · laundry and linens · garage or patio";

export const STR_CHECKLIST: ChecklistGroup[] = [
  {
    title: "Reset",
    items: [
      "All beds stripped and remade with fresh linens, hotel corners",
      "Bathrooms fully reset: scrubbed, restocked, towels staged",
      "Kitchen reset: dishes done and put away, counters and sink cleaned, guest food removed from the refrigerator",
      "All floors vacuumed and mopped; trash out, liners replaced",
    ],
  },
  {
    title: "Stage",
    items: [
      "Furniture and decor returned to listing-photo positions",
      "Amenities placed — welcome items, coffee setup, remotes where guests expect them",
      "Blinds, lighting, and thermostat set to your arrival spec",
    ],
  },
  {
    title: "Restock",
    items: [
      "Consumables counted and replenished to your standard list",
      "Quantities logged in the turnover report",
    ],
  },
  {
    title: "Verify",
    items: [
      "Photo set captured: every bedroom, every bathroom, kitchen, living area, entry",
      "Report timestamped and sent before check-in time",
    ],
  },
  {
    title: "Flag",
    items: [
      "Damage, stains, missing inventory, smoking indicators, signs of extra guests — photographed and reported same day",
    ],
  },
];

/** Residential page "The checklist, in brief" — condensed room summaries. */
export const RESIDENTIAL_BRIEF: { room: string; summary: string }[] = [
  {
    room: "Kitchen",
    summary:
      "counters and backsplash wiped and dried, sink and faucet polished water-spot free, cabinet fronts wiped, appliance exteriors cleaned, microwave interior cleaned, floors vacuumed and mopped edge to edge.",
  },
  {
    room: "Bathrooms",
    summary:
      "shower and tub scrubbed, toilet cleaned inside and out including the base, mirrors streak-free, fixtures polished, floors washed, towels squared.",
  },
  {
    room: "Bedrooms",
    summary:
      "beds made with squared corners, surfaces and decor dusted, mirrors cleaned, floors vacuumed including reachable under-bed areas.",
  },
  {
    room: "Living areas",
    summary:
      "all surfaces dusted, glass cleaned, cushions straightened, floors done edge to edge, touchpoints (switches, handles) wiped.",
  },
];

export const RESIDENTIAL_BRIEF_ADDONS =
  "inside the refrigerator, inside the oven, interior windows, laundry and linens.";
