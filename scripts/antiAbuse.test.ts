import assert from "node:assert/strict";
import { isLikelyBot, MIN_SUBMIT_MS } from "../src/lib/antiAbuse.ts";

// Bot: honeypot filled (even with a human-plausible time)
assert.equal(isLikelyBot({ honeypot: "acme corp", elapsedMs: 9000 }), true, "honeypot filled → bot");

// Bot: submitted faster than a human could fill the fields
assert.equal(isLikelyBot({ honeypot: "", elapsedMs: 800 }), true, "sub-2s submit → bot");
assert.equal(isLikelyBot({ honeypot: "", elapsedMs: MIN_SUBMIT_MS - 1 }), true, "just under gate → bot");

// Human: empty honeypot, took long enough
assert.equal(isLikelyBot({ honeypot: "", elapsedMs: MIN_SUBMIT_MS + 1 }), false, "human → allowed");
assert.equal(isLikelyBot({ honeypot: "   ", elapsedMs: 5000 }), false, "whitespace honeypot + slow → allowed");

console.log("anti-abuse test: PASS (5 assertions)");
