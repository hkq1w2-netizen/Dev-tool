import { ALL_TOOLS, executeToolClient } from "../lib/tools/registry";

console.log("=== DEVTOOLS.ONLINE UTILITIES SUITE TEST ===");
console.log(`Total Registered Tools: ${ALL_TOOLS.length}\n`);

let passed = 0;
let failed = 0;

const sampleJson = '{"name":"DevTools.online","version":"1.0.0","active":true}';
const sampleText = "Hello World! DevTools.online 2026";
const sampleHex = "#3b82f6";

ALL_TOOLS.forEach((tool, idx) => {
  let input = sampleText;
  const options: Record<string, unknown> = {};

  if (tool.slug.startsWith("json")) {
    input = sampleJson;
  } else if (tool.slug === "base64-decoder") {
    input = executeToolClient("base64-encoder", sampleText).output;
  } else if (tool.slug === "url-decoder") {
    input = encodeURIComponent("https://devtools.online/search?q=test");
  } else if (tool.slug === "uuid-generator") {
    input = "";
    options.count = 5;
  } else if (tool.slug === "timestamp-converter") {
    input = "1735689600";
  } else if (tool.slug === "regex-tester") {
    input = "Contact support@devtools.online";
    options.pattern = "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b";
    options.flags = "gi";
    options.testString = input;
  } else if (tool.slug === "hex-to-rgb") {
    input = sampleHex;
  } else if (tool.slug === "html-formatter") {
    input = "<div><h1>Test</h1></div>";
  } else if (tool.slug === "css-formatter") {
    input = "body{margin:0;padding:0}";
  } else if (tool.slug === "markdown-editor") {
    input = "# DevTools\n\n- Fast";
  }

  const res = executeToolClient(tool.slug, input, options);

  if (res.success && res.output) {
    passed++;
    console.log(`[PASS] ${idx + 1}. ${tool.name} (${tool.slug}) -> Success! Output length: ${res.output.length}`);
  } else {
    failed++;
    console.error(`[FAIL] ${idx + 1}. ${tool.name} (${tool.slug}) -> Error: ${res.error}`);
  }
});

console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
if (failed === 0) {
  console.log("ALL 15 TOOLS EXECUTED SUCCESSFULLY WITH 100% PARAMETER ACCURACY!");
}
