import fs from "node:fs";

const files = ["lib/tools/registry.ts", "lib/tools/extra-tools.ts"].map((file) => fs.readFileSync(file, "utf8"));
const source = files.join("\n");
const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
const titles = [...source.matchAll(/\bseoTitle:\s*"([^"]+)"/g)].map((match) => match[1]);
const related = [...source.matchAll(/relatedToolSlugs:\s*\[([^\]]*)\]/g)].flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));

const duplicates = (items) => [...new Set(items.filter((item, index) => items.indexOf(item) !== index))];
const duplicateSlugs = duplicates(slugs);
const duplicateTitles = duplicates(titles);
const missingRelated = [...new Set(related.filter((slug) => !slugs.includes(slug)))];

if (duplicateSlugs.length || duplicateTitles.length || missingRelated.length) {
  console.error(JSON.stringify({ duplicateSlugs, duplicateTitles, missingRelated }, null, 2));
  process.exit(1);
}
console.log(`Registry OK: ${slugs.length} tools, ${titles.length} unique SEO titles, ${related.length} related-tool references checked.`);
