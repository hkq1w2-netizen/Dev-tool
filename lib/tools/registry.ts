import { ToolMetadata, ToolCategorySlug, ToolExecutionResult } from "@/types/tool";

export const TOOL_CATEGORIES: Array<{ slug: ToolCategorySlug; name: string; description: string; icon: string }> = [
  { slug: "json", name: "JSON Utilities", description: "Format, validate, minify, and inspect JSON structures locally in your browser.", icon: "FileCode" },
  { slug: "encoding", name: "Encoding & Decoding", description: "Convert data formats with Base64, URL encoding, HTML entities, and Unicode.", icon: "Binary" },
  { slug: "generators", name: "Generators", description: "Generate UUIDs, random strings, secure passwords, and test data.", icon: "KeyRound" },
  { slug: "time", name: "Date & Time", description: "Convert Unix timestamps, epoch times, and ISO 8601 strings accurately.", icon: "Clock" },
  { slug: "regex", name: "Regex Tools", description: "Test, build, escape, and explain regular expressions in real-time.", icon: "Regex" },
  { slug: "colors", name: "Color Tools", description: "Convert HEX, RGB, HSL values, inspect contrast, and build palette gradients.", icon: "Palette" },
  { slug: "html", name: "HTML Utilities", description: "Format, beautify, and sanitize HTML markup instantly.", icon: "Code2" },
  { slug: "css", name: "CSS Utilities", description: "Format, minify, and clean up CSS stylesheets safely.", icon: "Paintbrush" },
  { slug: "markdown", name: "Markdown", description: "Edit Markdown with instant HTML preview, tables, and TOC tools.", icon: "FileText" },
];

export const ALL_TOOLS: ToolMetadata[] = [
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Format and beautify unformatted JSON strings into structured, indented code.",
    longDescription: "JSON Formatter instantly takes minified or poorly structured JSON text and transforms it into clean, readable, indented JSON code. Features customizable indentation (2 or 4 spaces) and instant syntax error detection. All processing happens 100% locally in your browser.",
    category: "json",
    categoryName: "JSON Utilities",
    icon: "FileCode",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["application/json", "text/plain"],
    supportedOutputs: ["application/json"],
    keywords: ["json formatter", "format json online", "json beautifier", "pretty print json", "indent json"],
    seoTitle: "Free Online JSON Formatter & Beautifier — DevKitLab",
    seoDescription: "Format, beautify, and clean up JSON code online instantly. 100% private client-side JSON formatter with error highlighting.",
    howTo: [
      "Paste your raw or minified JSON string into the input editor.",
      "Select your preferred indentation level (2 or 4 spaces).",
      "Click 'Format JSON' to view the formatted output instantly.",
      "Click 'Copy' or 'Download' to retrieve your clean JSON code."
    ],
    features: [
      "100% client-side privacy guarantee",
      "Customizable indentation spaces",
      "Real-time syntax validation",
      "One-click copy & file export"
    ],
    limitations: [
      "Browser memory limit for files larger than 100MB"
    ],
    faqs: [
      { question: "Is my JSON data uploaded to any server?", answer: "No. The JSON Formatter runs 100% inside your Web browser using client-side JavaScript. Your data never leaves your device." },
      { question: "What is the difference between JSON formatting and minification?", answer: "Formatting adds whitespace, indentation, and newlines to make JSON human-readable. Minification removes all unnecessary whitespace to compress the payload size." },
      { question: "How does the tool handle invalid JSON?", answer: "If your JSON contains syntax errors (such as missing quotes or trailing commas), the tool displays the exact syntax error message." }
    ],
    relatedToolSlugs: ["json-validator", "json-minifier", "json-viewer"]
  },
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    shortDescription: "Validate JSON syntax and identify exact error positions with detailed diagnostic messages.",
    longDescription: "Validate JSON syntax against standard specifications. Locate missing brackets, illegal characters, unescaped strings, and trailing commas with precise error reporting.",
    category: "json",
    categoryName: "JSON Utilities",
    icon: "CheckCircle2",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["application/json", "text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["json validator", "validate json", "check json syntax", "json syntax checker"],
    seoTitle: "JSON Syntax Validator & Checker — DevKitLab",
    seoDescription: "Validate JSON string syntax online. Find syntax errors, missing quotes, and invalid structures with line-by-line validation.",
    howTo: [
      "Paste your JSON input into the validator editor.",
      "Click 'Validate JSON'.",
      "Review the validation status or diagnostic error location."
    ],
    features: [
      "Detailed syntax error messages with line numbers",
      "Fast client-side parse verification",
      "Supports nested object verification"
    ],
    limitations: ["Schema validation against draft JSON Schema specs coming soon"],
    faqs: [
      { question: "Why is my valid Javascript object invalid JSON?", answer: "JSON requires double quotes around property keys and string values, and does not support single quotes, trailing commas, or functions." }
    ],
    relatedToolSlugs: ["json-formatter", "json-minifier", "json-viewer"]
  },
  {
    id: "json-minifier",
    slug: "json-minifier",
    name: "JSON Minifier",
    shortDescription: "Compress JSON code by removing all whitespace, indentations, and newlines.",
    longDescription: "Minify JSON payloads to reduce bandwidth consumption for REST APIs, config files, and web applications. Safely removes whitespace without altering data structures.",
    category: "json",
    categoryName: "JSON Utilities",
    icon: "Minimize2",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["application/json"],
    supportedOutputs: ["application/json"],
    keywords: ["json minifier", "compress json", "minify json online", "json compact"],
    seoTitle: "Free Online JSON Minifier & Compressor — DevKitLab",
    seoDescription: "Compress and minify JSON files instantly. Remove unnecessary whitespace and reduce payload sizes for production APIs.",
    howTo: [
      "Paste your indented JSON code.",
      "Click 'Minify JSON'.",
      "Copy or download the compressed output string."
    ],
    features: ["Instant string compression", "Preserves exact data values", "Shows file size savings percentage"],
    limitations: ["Requires valid JSON input"],
    faqs: [
      { question: "How much space does minification save?", answer: "Minification typically reduces JSON payload sizes by 20% to 40% depending on indentation levels." }
    ],
    relatedToolSlugs: ["json-formatter", "json-validator", "json-viewer"]
  },
  {
    id: "json-viewer",
    slug: "json-viewer",
    name: "JSON Viewer",
    shortDescription: "Inspect complex JSON data structures with collapsible tree nodes and data type badges.",
    longDescription: "Interactive tree viewer for JSON objects. Expand and collapse nested nodes, inspect data types, copy individual object keys or values, and search through large JSON documents.",
    category: "json",
    categoryName: "JSON Utilities",
    icon: "Eye",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["application/json"],
    supportedOutputs: ["text/html"],
    keywords: ["json viewer", "json tree viewer", "inspect json online", "json explorer"],
    seoTitle: "Interactive JSON Viewer & Tree Explorer — DevKitLab",
    seoDescription: "Explore and inspect complex JSON objects with collapsible tree nodes, data type coloring, and search.",
    howTo: [
      "Paste your JSON document.",
      "View the tree visualization.",
      "Click nodes to expand or collapse sections."
    ],
    features: ["Collapsible node tree", "Color-coded data types", "Fast rendering engine"],
    limitations: ["Extremely deep trees (>50 levels) may degrade browser render speeds"],
    faqs: [
      { question: "Can I inspect large array structures?", answer: "Yes! Large arrays are categorized in readable tree blocks." }
    ],
    relatedToolSlugs: ["json-formatter", "json-validator", "json-minifier"]
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder",
    shortDescription: "Encode text strings and binary data into standard Base64 string format.",
    longDescription: "Convert plaintext strings into UTF-8 standard Base64 encoding. Ideal for data URLs, basic authorization headers, and safe data transport.",
    category: "encoding",
    categoryName: "Encoding & Decoding",
    icon: "Binary",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["base64 encoder", "encode base64", "base64 encode online", "string to base64"],
    seoTitle: "Base64 String Encoder Online — DevKitLab",
    seoDescription: "Encode text to Base64 format online. 100% private client-side conversion with UTF-8 encoding support.",
    howTo: [
      "Type or paste text into the input field.",
      "Click 'Encode Base64'.",
      "Copy your encoded Base64 string."
    ],
    features: ["UTF-8 character support", "Instant real-time encoding", "Copy & download results"],
    limitations: ["Text string focus"],
    faqs: [
      { question: "Is Base64 encryption?", answer: "No. Base64 is an encoding format for data representation, not encryption. Anyone can decode a Base64 string back to plaintext." }
    ],
    relatedToolSlugs: ["base64-decoder", "url-encoder", "url-decoder"]
  },
  {
    id: "base64-decoder",
    slug: "base64-decoder",
    name: "Base64 Decoder",
    shortDescription: "Decode Base64 encoded strings back to human-readable UTF-8 text.",
    longDescription: "Safely decode Base64 strings into original plaintext. Full support for special UTF-8 character sequences and custom padding handling.",
    category: "encoding",
    categoryName: "Encoding & Decoding",
    icon: "Binary",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["base64 decoder", "decode base64", "base64 to text", "decode base64 online"],
    seoTitle: "Base64 String Decoder Online — DevKitLab",
    seoDescription: "Decode Base64 strings to plaintext online. Client-side browser decoding with UTF-8 text restoration.",
    howTo: [
      "Paste your Base64 encoded string.",
      "Click 'Decode Base64'.",
      "View the restored original text."
    ],
    features: ["UTF-8 character restoration", "Error detection for invalid padding", "Fast execution"],
    limitations: ["Input must be valid Base64"],
    faqs: [
      { question: "Why does decoding fail on some strings?", answer: "Invalid character sequences or incorrect string length can cause decoding errors." }
    ],
    relatedToolSlugs: ["base64-encoder", "url-encoder", "url-decoder"]
  },
  {
    id: "url-encoder",
    slug: "url-encoder",
    name: "URL Encoder",
    shortDescription: "Encode text characters into percent-encoded URL string component formats.",
    longDescription: "Escape special characters in web addresses using standard RFC 3986 percent-encoding rules for query parameters and URI paths.",
    category: "encoding",
    categoryName: "Encoding & Decoding",
    icon: "Link",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["url encoder", "encode url", "percent encoding", "url component encoder"],
    seoTitle: "URL & URI Percent Encoder — DevKitLab",
    seoDescription: "Encode special characters into standard URL percent-encoding for query strings and web addresses.",
    howTo: [
      "Enter the text or URL parameter.",
      "Click 'Encode URL'.",
      "Copy the percent-encoded result."
    ],
    features: ["Supports encodeURIComponent and encodeURI modes", "Client-side processing", "Instant output"],
    limitations: ["Standard web encoding specifications"],
    faqs: [
      { question: "What characters are encoded?", answer: "Spaces, non-ASCII characters, reserved URI symbols like ?, &, =, and / are replaced with percent signs and hex numbers." }
    ],
    relatedToolSlugs: ["url-decoder", "base64-encoder", "base64-decoder"]
  },
  {
    id: "url-decoder",
    slug: "url-decoder",
    name: "URL Decoder",
    shortDescription: "Decode percent-encoded URL strings back into human-readable characters.",
    longDescription: "Convert percent-encoded query parameters and URL components back to normal readable text strings.",
    category: "encoding",
    categoryName: "Encoding & Decoding",
    icon: "Link",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["url decoder", "decode url", "percent decoder", "url component decoder"],
    seoTitle: "URL Percent Decoder — DevKitLab",
    seoDescription: "Decode percent-encoded URLs and query parameters back into original readable text.",
    howTo: [
      "Paste your percent-encoded URL string.",
      "Click 'Decode URL'.",
      "Copy the decoded output."
    ],
    features: ["Decodes %20 and + space representations", "UTF-8 safe decoding", "Instant preview"],
    limitations: ["Requires valid percent-encoded string"],
    faqs: [
      { question: "Does this handle spaces represented by '+'?", answer: "Yes, standard decoding automatically handles both %20 and '+' space symbols." }
    ],
    relatedToolSlugs: ["url-encoder", "base64-encoder", "base64-decoder"]
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate cryptographically secure v4 and v1 Universally Unique Identifiers (UUIDs).",
    longDescription: "Generate single or batch cryptographically random UUID v4 identifiers directly using Web Crypto API. Support for upper/lowercase formatting and bulk generation.",
    category: "generators",
    categoryName: "Generators",
    icon: "KeyRound",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: [],
    supportedOutputs: ["text/plain"],
    keywords: ["uuid generator", "guid generator", "generate uuid v4", "random uuid online"],
    seoTitle: "Cryptographic UUID / GUID Generator — DevKitLab",
    seoDescription: "Generate cryptographically secure UUID v4 strings online. Batch generation with custom formatting.",
    howTo: [
      "Select the quantity of UUIDs to generate (1 to 100).",
      "Choose options (uppercase, hyphens).",
      "Click 'Generate UUIDs'.",
      "Copy all generated UUIDs."
    ],
    features: ["Uses window.crypto for true randomness", "Batch output up to 100 UUIDs", "Hyphen and casing controls"],
    limitations: ["Maximum 100 per click on free plan"],
    faqs: [
      { question: "Are generated UUIDs unique?", answer: "UUID v4 uses 122 bits of randomness. The probability of generating a duplicate UUID is so small it is virtually impossible." }
    ],
    relatedToolSlugs: ["json-formatter", "base64-encoder"]
  },
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Unix Timestamp Converter",
    shortDescription: "Convert Unix epoch timestamps to human-readable dates and vice versa.",
    longDescription: "Convert Unix epoch seconds and milliseconds to local time, UTC ISO 8601 strings, and GMT format. Also convert custom calendar dates into Unix timestamps.",
    category: "time",
    categoryName: "Date & Time",
    icon: "Clock",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["timestamp converter", "unix epoch converter", "epoch to date", "date to timestamp"],
    seoTitle: "Unix Timestamp & Epoch Converter — DevKitLab",
    seoDescription: "Convert Unix epoch timestamps to UTC, ISO 8601, and local date formats instantly.",
    howTo: [
      "Enter a epoch timestamp (seconds or milliseconds) or pick a date.",
      "Click 'Convert'.",
      "View converted local date, UTC date, and ISO string."
    ],
    features: ["Supports both 10-digit (sec) and 13-digit (ms) timestamps", "Displays UTC & Local timezones", "Live current timestamp counter"],
    limitations: ["Standard JavaScript Date limits"],
    faqs: [
      { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the total number of seconds that have elapsed since January 1, 1970 00:00:00 UTC (the Unix Epoch)." }
    ],
    relatedToolSlugs: ["uuid-generator", "json-formatter"]
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    shortDescription: "Test and debug JavaScript regular expressions with real-time match highlighting.",
    longDescription: "Test regular expression patterns against sample text. View matched groups, match index positions, flags (g, i, m, s, u), and real-time execution outputs.",
    category: "regex",
    categoryName: "Regex Tools",
    icon: "Regex",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["application/json", "text/plain"],
    keywords: ["regex tester", "test regex online", "regular expression tester", "javascript regex"],
    seoTitle: "Online Regex Tester & Matcher — DevKitLab",
    seoDescription: "Test regular expressions in real-time with match highlighting, capture groups, and flag controls.",
    howTo: [
      "Enter your regex pattern and flags (e.g. /\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b/gi).",
      "Paste your test text string.",
      "Review highlight matches and capture group extractions."
    ],
    features: ["Real-time match highlighting", "Capture group breakdown", "Regex flag toggles (g, i, m, s)"],
    limitations: ["JavaScript RegExp engine standard rules"],
    faqs: [
      { question: "Which regex syntax is supported?", answer: "The tester uses standard ECMAScript / JavaScript regular expression syntax native to modern browsers." }
    ],
    relatedToolSlugs: ["json-formatter", "html-formatter"]
  },
  {
    id: "hex-to-rgb",
    slug: "hex-to-rgb",
    name: "Color Converter (HEX / RGB / HSL)",
    shortDescription: "Convert color codes between HEX, RGB, HSL formats with interactive color picker.",
    longDescription: "Convert color representations between CSS HEX codes (#3b82f6), RGB functional values, and HSL formats. Includes visual swatch preview and copy buttons.",
    category: "colors",
    categoryName: "Color Tools",
    icon: "Palette",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["hex to rgb", "rgb to hex", "color converter", "hex to hsl", "color picker online"],
    seoTitle: "HEX to RGB & HSL Color Converter — DevKitLab",
    seoDescription: "Convert HEX color codes to RGB and HSL values online. Features visual color swatches and instant format copying.",
    howTo: [
      "Paste or select a color using the color picker.",
      "View automatic conversions for HEX, RGB, and HSL values.",
      "Click copy next to any format."
    ],
    features: ["Bi-directional format conversion", "Visual color swatch display", "Alpha transparency support"],
    limitations: ["sRGB color space"],
    faqs: [
      { question: "Does this support 8-digit HEX with alpha?", answer: "Yes! 8-digit HEX codes (e.g., #3b82f6ff) with transparency channels are fully supported." }
    ],
    relatedToolSlugs: ["css-formatter", "html-formatter"]
  },
  {
    id: "html-formatter",
    slug: "html-formatter",
    name: "HTML Formatter",
    shortDescription: "Format, clean, and beautify raw HTML markup with consistent indentation.",
    longDescription: "Beautify dirty or minified HTML strings with customizable tag indentation and clean element nesting rules.",
    category: "html",
    categoryName: "HTML Utilities",
    icon: "Code2",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/html"],
    supportedOutputs: ["text/html"],
    keywords: ["html formatter", "beautify html", "html pretty print", "clean html code"],
    seoTitle: "Free HTML Formatter & Beautifier — DevKitLab",
    seoDescription: "Format and beautify HTML code online with automatic tag alignment and clean element indentation.",
    howTo: [
      "Paste your raw HTML snippet.",
      "Click 'Format HTML'.",
      "Copy your formatted markup."
    ],
    features: ["Automatic element nesting", "Preserves tag attributes", "Fast browser processing"],
    limitations: ["Focuses on standard HTML5 markup"],
    faqs: [
      { question: "Will it fix broken HTML tags?", answer: "It will format existing elements cleanly, but unclosed tags should be checked manually." }
    ],
    relatedToolSlugs: ["css-formatter", "markdown-editor", "json-formatter"]
  },
  {
    id: "css-formatter",
    slug: "css-formatter",
    name: "CSS Formatter",
    shortDescription: "Format and beautify CSS stylesheets with clean rule indentation.",
    longDescription: "Format unorganized or compressed CSS rules into clean, standardized stylesheet code blocks.",
    category: "css",
    categoryName: "CSS Utilities",
    icon: "Paintbrush",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/css"],
    supportedOutputs: ["text/css"],
    keywords: ["css formatter", "beautify css", "css pretty print", "format css online"],
    seoTitle: "Online CSS Formatter & Beautifier — DevKitLab",
    seoDescription: "Format CSS code blocks online. Beautify stylesheets with consistent selector and rule indentation.",
    howTo: [
      "Paste your CSS code.",
      "Click 'Format CSS'.",
      "Copy the beautified CSS output."
    ],
    features: ["Formats selectors and media queries", "Removes redundant whitespace", "100% client-side privacy"],
    limitations: ["Standard CSS syntax"],
    faqs: [
      { question: "Does it support SASS or SCSS?", answer: "It formats standard CSS rules and SCSS block structures cleanly." }
    ],
    relatedToolSlugs: ["html-formatter", "hex-to-rgb", "json-formatter"]
  },
  {
    id: "markdown-editor",
    slug: "markdown-editor",
    name: "Markdown Editor & Previewer",
    shortDescription: "Write and edit Markdown with live dual-pane HTML rendering preview.",
    longDescription: "Live dual-pane editor for Markdown text. Renders headers, lists, code blocks, tables, and links into clean HTML in real-time.",
    category: "markdown",
    categoryName: "Markdown",
    icon: "FileText",
    status: "active",
    isFree: true,
    isPremium: false,
    processingMode: "CLIENT",
    supportedInputs: ["text/markdown"],
    supportedOutputs: ["text/html", "text/markdown"],
    keywords: ["markdown editor", "markdown preview", "markdown to html", "live markdown editor"],
    seoTitle: "Live Markdown Editor & HTML Previewer — DevKitLab",
    seoDescription: "Edit Markdown online with real-time rendered HTML preview. Export rendered HTML or copy raw Markdown.",
    howTo: [
      "Type or paste Markdown syntax into the left panel.",
      "See the live HTML preview render instantly on the right.",
      "Export raw Markdown or compiled HTML."
    ],
    features: ["Real-time dual pane preview", "GitHub-flavored markdown element support", "One-click HTML compile export"],
    limitations: ["Standard browser markdown renderer"],
    faqs: [
      { question: "Can I copy the compiled HTML?", answer: "Yes! Use the 'Copy HTML' button to retrieve the compiled HTML code directly." }
    ],
    relatedToolSlugs: ["html-formatter", "json-formatter"]
  }
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): ToolMetadata[] {
  return ALL_TOOLS.filter((t) => t.category === categorySlug);
}

export function searchTools(query: string): ToolMetadata[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_TOOLS;
  return ALL_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.categoryName.toLowerCase().includes(q)
  );
}

// UTF-8 Standard Helpers for Base64 without DOMException
function base64EncodeUtf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin);
}

function base64DecodeUtf8(b64: string): string {
  const cleanB64 = b64.trim().replace(/\s+/g, "");
  try {
    const bin = atob(cleanB64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("Input string is not valid Base64 format. Use Base64 Encoder to convert raw text to Base64 first.");
  }
}

// Helper to normalize curly/smart quotes to standard double quotes for JSON parsing
function sanitizeJsonInput(str: string): string {
  return str
    .replace(/[\u201C\u201D]/g, '"') // Replace smart double quotes “ ”
    .replace(/[\u2018\u2019]/g, "'"); // Replace smart single quotes ‘ ’
}

// Client-side Execution Helper Engine
export function executeToolClient(slug: string, input: string, options?: Record<string, unknown>): ToolExecutionResult {
  try {
    const cleanInput = input ? input.trim() : "";

    if (!cleanInput && slug !== "uuid-generator") {
      return { success: false, output: "", error: "Input is empty. Please enter text to process." };
    }

    switch (slug) {
      case "json-formatter": {
        const sanitized = sanitizeJsonInput(cleanInput);
        const parsed = JSON.parse(sanitized);
        const indent = options?.indent === 4 ? 4 : 2;
        return { success: true, output: JSON.stringify(parsed, null, indent) };
      }

      case "json-validator": {
        const sanitized = sanitizeJsonInput(cleanInput);
        JSON.parse(sanitized);
        return { success: true, output: "Valid JSON syntax! No errors detected." };
      }

      case "json-minifier": {
        const sanitized = sanitizeJsonInput(cleanInput);
        const parsed = JSON.parse(sanitized);
        const minified = JSON.stringify(parsed);
        const originalLength = cleanInput.length;
        const newLength = minified.length;
        const savings = Math.round(((originalLength - newLength) / originalLength) * 100);
        return {
          success: true,
          output: minified,
          metadata: { originalLength, newLength, savingsPercent: savings > 0 ? savings : 0 },
        };
      }

      case "json-viewer": {
        const sanitized = sanitizeJsonInput(cleanInput);
        const parsed = JSON.parse(sanitized);
        return { success: true, output: JSON.stringify(parsed, null, 2) };
      }

      case "base64-encoder": {
        const encoded = base64EncodeUtf8(cleanInput);
        return { success: true, output: encoded };
      }

      case "base64-decoder": {
        const decoded = base64DecodeUtf8(cleanInput);
        return { success: true, output: decoded };
      }

      case "url-encoder": {
        return { success: true, output: encodeURIComponent(cleanInput) };
      }

      case "url-decoder": {
        try {
          return { success: true, output: decodeURIComponent(cleanInput) };
        } catch {
          return { success: false, output: "", error: "Invalid percent-encoded URI string format." };
        }
      }

      case "uuid-generator": {
        const count = Math.min(Math.max(Number(options?.count) || 5, 1), 100);
        const uuids: string[] = [];
        for (let i = 0; i < count; i++) {
          uuids.push(crypto.randomUUID());
        }
        return { success: true, output: uuids.join("\n") };
      }

      case "timestamp-converter": {
        const num = Number(cleanInput);
        let date: Date;
        if (!isNaN(num)) {
          date = new Date(cleanInput.length <= 10 ? num * 1000 : num);
        } else {
          date = new Date(cleanInput);
        }

        if (isNaN(date.getTime())) {
          return { success: false, output: "", error: "Invalid date or timestamp input." };
        }

        const out = `Unix Timestamp (sec): ${Math.floor(date.getTime() / 1000)}\nUnix Timestamp (ms):  ${date.getTime()}\nUTC String:            ${date.toUTCString()}\nISO 8601:              ${date.toISOString()}\nLocal Time:            ${date.toLocaleString()}`;
        return { success: true, output: out };
      }

      case "regex-tester": {
        const pattern = (options?.pattern as string) || cleanInput;
        const flags = (options?.flags as string) || "gi";
        const testStr = (options?.testString as string) || cleanInput;
        const re = new RegExp(pattern, flags);
        const matches = [...testStr.matchAll(re)];
        
        const summary = `Found ${matches.length} match(es):\n` +
          matches.map((m, idx) => `Match #${idx + 1}: "${m[0]}" at index ${m.index}`).join("\n");

        return { success: true, output: summary };
      }

      case "hex-to-rgb": {
        let hex = cleanInput.replace(/^#/, "");
        if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
        if (hex.length !== 6 && hex.length !== 8) {
          return { success: false, output: "", error: "Invalid HEX color. Use format #RRGGBB or #RRGGBBAA" };
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = hex.length === 8 ? (parseInt(hex.substring(6, 8), 16) / 255).toFixed(2) : "1";

        const rgb = `rgb(${r}, ${g}, ${b})`;
        const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
        const out = `HEX:  #${hex.toUpperCase()}\nRGB:  ${rgb}\nRGBA: ${rgba}`;
        return { success: true, output: out, metadata: { r, g, b, hex: `#${hex}` } };
      }

      case "html-formatter": {
        let formatted = "";
        const reg = /(>)(<)(\/*)/g;
        const html = cleanInput.replace(reg, "$1\r\n$2$3");
        let pad = 0;
        html.split("\r\n").forEach((node) => {
          let indent = 0;
          if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
          } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) pad -= 1;
          } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
          }
          formatted += "  ".repeat(pad) + node + "\r\n";
          pad += indent;
        });
        return { success: true, output: formatted.trim() };
      }

      case "css-formatter": {
        const formatted = cleanInput
          .replace(/\s*\{\s*/g, " {\n  ")
          .replace(/;\s*/g, ";\n  ")
          .replace(/\s*\}\s*/g, "\n}\n\n")
          .replace(/\s*;\s*}/g, ";\n}");
        return { success: true, output: formatted.trim() };
      }

      case "markdown-editor": {
        let html = cleanInput
          .replace(/^### (.*$)/gim, "<h3>$1</h3>")
          .replace(/^## (.*$)/gim, "<h2>$1</h2>")
          .replace(/^# (.*$)/gim, "<h1>$1</h1>")
          .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
          .replace(/\*(.*)\*/gim, "<em>$1</em>")
          .replace(/`([^`]+)`/gim, "<code>$1</code>")
          .replace(/\n$/gim, "<br />");
        return { success: true, output: html.trim() };
      }

      default:
        return { success: false, output: "", error: `Tool ${slug} execution is not registered.` };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, output: "", error: errorMsg };
  }
}
