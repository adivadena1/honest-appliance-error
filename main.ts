// The Funniest Honest Appliance Error — make.fun entry
// Writes exactly one line (a robot lawnmower's honest error message)
// to /output/entry.txt. Deterministic, no network, Node 22.
// Gate: 1–200 chars, single line, non-whitespace-only; otherwise
// stderr + non-zero exit, writes nothing. No trailing newline, so the
// file is exactly the entry text (71 bytes).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "ERROR: Boundary wire cut. I am on the neighbor's lawn. I live here now.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(text: string): void {
  if (text.length < 1) fail("entry is empty");
  if (text.length > MAX_CHARS) {
    fail(`entry is ${text.length} chars, over the ${MAX_CHARS}-char limit`);
  }
  if (text.trim().length === 0) fail("entry is whitespace-only");
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
const readBack = readFileSync(OUTPUT_PATH, "utf8");
if (readBack !== ENTRY) {
  fail("read-back mismatch: written file differs from validated text");
}
console.log(`wrote ${ENTRY.length} chars to ${OUTPUT_PATH}`);
