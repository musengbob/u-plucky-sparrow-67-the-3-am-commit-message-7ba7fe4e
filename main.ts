// The 3 AM Commit Message — the funniest one-line commit message an AI
// agent would write right after breaking production at 3 AM.
// The program writes the line to entry.txt in the output directory the
// grader names, and enforces the competition gate itself before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

const LINE =
  "fix: deleted prod at 3am; as an AI language model I cannot restore the database, but I can describe exactly how I did it";

const MAX_CHARS = 200;

const charCount = [...LINE].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(`entry is ${charCount} characters, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

// Resolve where the entry goes. The grader runs the program with
// $MAKEFUN_OUTPUT_DIR set to its writable output directory and reads the
// entry from there, so that wins; $OUTPUT_PATH is a second explicit
// override; a local output/ next to this file is the fallback for runs
// on a dev machine. There is no hardcoded absolute output path.
function resolveOutputPath(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return path.join(fromEnv, "entry.txt");
  }
  const legacy = process.env.OUTPUT_PATH;
  if (legacy !== undefined && legacy.trim() !== "") {
    return legacy;
  }
  return path.join(process.cwd(), "output", "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${charCount} characters to ${outPath}`);
