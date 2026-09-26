import { ToolMetadata, ToolCategorySlug, ToolExecutionResult } from "@/types/tool";
import { TOOL_CATEGORIES } from "@/lib/categories/registry";
import { EXTRA_TOOLS } from "@/lib/tools/extra-tools";

export { TOOL_CATEGORIES };

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
    processingMode: "CLIENT",
    supportedInputs: ["application/json", "text/plain"],
    supportedOutputs: ["application/json"],
    keywords: ["json formatter", "format json online", "json beautifier", "pretty print json", "indent json"],
    aliases: ["json pretty", "beautify json", "prettify json"],
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
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["base64 encoder", "encode base64", "base64 encode online", "string to base64"],
    aliases: ["text to base64", "b64 encode"],
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
    processingMode: "CLIENT",
    supportedInputs: [],
    supportedOutputs: ["text/plain"],
    keywords: ["uuid generator", "guid generator", "generate uuid v4", "random uuid online"],
    aliases: ["guid", "random id", "unique identifier"],
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
    processingMode: "CLIENT",
    supportedInputs: ["text/plain"],
    supportedOutputs: ["text/plain"],
    keywords: ["timestamp converter", "unix epoch converter", "epoch to date", "date to timestamp"],
    aliases: ["epoch time", "unix time", "date converter"],
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
  },
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    shortDescription: "Reduce JPEG, PNG, and WebP file sizes with a visual quality control and instant savings report.",
    longDescription: "Image Compressor reduces image file size directly in your browser. Choose an output format and quality level, compare the original with the optimized preview, and download the compressed file without uploading private images to a server.",
    category: "images",
    categoryName: "Image Tools",
    icon: "Minimize2",
    status: "active",
    processingMode: "CLIENT",
    supportedInputs: ["image/jpeg", "image/png", "image/webp"],
    supportedOutputs: ["image/jpeg", "image/png", "image/webp"],
    keywords: ["image compressor", "compress image online", "reduce image size", "jpeg compressor", "png compressor", "webp compressor"],
    aliases: ["compress photo", "shrink image", "reduce photo size"],
    seoTitle: "Free Image Compressor — Compress JPG, PNG & WebP | DevKitLab",
    seoDescription: "Compress JPG, PNG, and WebP images privately in your browser. Preview quality, compare file sizes, and download instantly.",
    howTo: [
      "Drop a JPG, PNG, or WebP image into the workspace.",
      "Choose the output format and adjust the quality slider.",
      "Click Compress image and compare the original and optimized sizes.",
      "Download the optimized image to your device."
    ],
    features: ["Private in-browser processing", "Before and after previews", "Adjustable quality control", "Live file-size savings report"],
    limitations: ["Files are limited to 25 MB", "PNG quality is controlled mainly by dimensions and browser encoding"],
    faqs: [
      { question: "Are my images uploaded?", answer: "No. The image is decoded, processed, and exported within your browser. It is never sent to DevKitLab servers." },
      { question: "Which format usually creates the smallest file?", answer: "WebP commonly provides a smaller file than JPEG or PNG for web use, although results vary by image." }
    ],
    relatedToolSlugs: ["image-converter", "image-resizer"]
  },
  {
    id: "image-converter",
    slug: "image-converter",
    name: "Image Converter",
    shortDescription: "Convert JPG, PNG, and WebP images between modern browser-friendly formats in seconds.",
    longDescription: "Image Converter changes images between JPEG, PNG, and WebP entirely on your device. It includes transparent-background handling, output quality control, previews, and one-click downloads.",
    category: "images",
    categoryName: "Image Tools",
    icon: "RefreshCw",
    status: "active",
    processingMode: "CLIENT",
    supportedInputs: ["image/jpeg", "image/png", "image/webp"],
    supportedOutputs: ["image/jpeg", "image/png", "image/webp"],
    keywords: ["image converter", "jpg to png", "png to jpg", "image to webp", "webp converter"],
    seoTitle: "Image Converter — JPG, PNG & WebP Converter | DevKitLab",
    seoDescription: "Convert images between JPG, PNG, and WebP privately in your browser with previews and quality controls.",
    howTo: ["Choose or drop an image.", "Select JPEG, PNG, or WebP as the output format.", "Set output quality when supported.", "Convert and download the new image."],
    features: ["JPG, PNG, and WebP output", "Transparent background handling", "No account required", "100% local conversion"],
    limitations: ["Animated images are not supported", "Converting transparency to JPEG uses a white background"],
    faqs: [
      { question: "Can I convert a transparent PNG to JPEG?", answer: "Yes. Because JPEG does not support transparency, transparent pixels are placed on a white background." },
      { question: "Does conversion reduce quality?", answer: "JPEG and WebP can use lossy compression. PNG output is lossless, while the quality slider controls supported lossy formats." }
    ],
    relatedToolSlugs: ["image-compressor", "image-resizer"]
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Image Resizer",
    shortDescription: "Resize images to exact pixel dimensions while preserving aspect ratio and export quality.",
    longDescription: "Image Resizer changes image width and height using the browser canvas. Lock the aspect ratio to avoid distortion, select the output format and quality, preview the result, and download the resized image.",
    category: "images",
    categoryName: "Image Tools",
    icon: "Maximize2",
    status: "active",
    processingMode: "CLIENT",
    supportedInputs: ["image/jpeg", "image/png", "image/webp"],
    supportedOutputs: ["image/jpeg", "image/png", "image/webp"],
    keywords: ["image resizer", "resize image online", "change image dimensions", "resize jpg", "resize png"],
    seoTitle: "Free Image Resizer — Resize JPG, PNG & WebP | DevKitLab",
    seoDescription: "Resize JPG, PNG, and WebP images to exact dimensions privately in your browser while preserving aspect ratio.",
    howTo: ["Upload or drop an image.", "Enter the target width or height.", "Keep aspect ratio locked to prevent stretching.", "Resize, preview, and download the result."],
    features: ["Exact pixel dimensions", "Aspect-ratio lock", "Multiple output formats", "Local browser processing"],
    limitations: ["Maximum output dimension is 12000 pixels", "Enlarging a small image cannot create missing detail"],
    faqs: [
      { question: "How do I resize without stretching?", answer: "Leave Lock aspect ratio enabled. Changing one dimension automatically calculates the other." },
      { question: "Can I make an image larger?", answer: "Yes, but enlarging beyond the original dimensions may look soft or pixelated." }
    ],
    relatedToolSlugs: ["image-compressor", "image-converter"]
  },
  {
    id: "pdf-merger",
    slug: "pdf-merger",
    name: "Merge & Reorder PDF",
    shortDescription: "Combine multiple PDF files in your chosen order and download one finished document.",
    longDescription: "Merge two or more PDF files without uploading them. Reorder documents before combining them, review page counts and file sizes, and download a single PDF produced entirely inside your browser.",
    category: "pdf", categoryName: "PDF Tools", icon: "Files", status: "active", processingMode: "CLIENT",
    supportedInputs: ["application/pdf"], supportedOutputs: ["application/pdf"],
    keywords: ["merge pdf", "combine pdf", "join pdf", "reorder pdf"],
    aliases: ["combine documents", "join pdf files"],
    seoTitle: "Merge PDF Files Online Privately | DevKitLab", seoDescription: "Merge and reorder PDF files locally in your browser. No uploads, no watermarks, and no account required.",
    howTo: ["Add two or more PDF files.", "Move files up or down into the required order.", "Click Merge PDFs.", "Download the combined document."],
    features: ["Drag-and-drop PDF input", "Document reordering", "Page and size summary", "Private local processing"],
    limitations: ["Encrypted PDFs must be unlocked first", "Maximum recommended combined size is 100 MB"],
    faqs: [{ question: "Are my PDFs uploaded?", answer: "No. DevKitLab reads and combines the files within your browser memory." }],
    relatedToolSlugs: ["pdf-splitter", "pdf-compressor", "images-to-pdf"]
  },
  {
    id: "pdf-splitter",
    slug: "pdf-splitter",
    name: "Split & Extract PDF Pages",
    shortDescription: "Extract selected pages or page ranges into a new PDF document.",
    longDescription: "Split a PDF by entering pages such as 1-3, 5, 8-10. DevKitLab validates the range, preserves the selected order, and creates a new PDF locally without uploading the source file.",
    category: "pdf", categoryName: "PDF Tools", icon: "Scissors", status: "active", processingMode: "CLIENT",
    supportedInputs: ["application/pdf"], supportedOutputs: ["application/pdf"],
    keywords: ["split pdf", "extract pdf pages", "pdf page extractor", "separate pdf"],
    seoTitle: "Split PDF & Extract Pages Online | DevKitLab", seoDescription: "Extract selected PDF pages and ranges privately in your browser with no file uploads.",
    howTo: ["Choose a PDF file.", "Enter pages or ranges such as 1-3,5.", "Click Extract pages.", "Download the new PDF."],
    features: ["Flexible page ranges", "Range validation", "Original page quality preserved", "Local processing"],
    limitations: ["Encrypted PDFs must be unlocked first"],
    faqs: [{ question: "Can I change the page order?", answer: "Yes. Enter page numbers in the exact order you want them in the new PDF." }],
    relatedToolSlugs: ["pdf-merger", "pdf-compressor", "pdf-to-images"]
  },
  {
    id: "pdf-compressor",
    slug: "pdf-compressor",
    name: "PDF Compressor",
    shortDescription: "Reduce image-heavy PDF file sizes with selectable compression strength.",
    longDescription: "Compress image-heavy PDFs by rendering and re-encoding each page at a selected quality. Processing stays in your browser. Because compression flattens pages, DevKitLab clearly warns when selectable text, links, forms, or annotations will be removed.",
    category: "pdf", categoryName: "PDF Tools", icon: "Minimize2", status: "active", processingMode: "CLIENT",
    supportedInputs: ["application/pdf"], supportedOutputs: ["application/pdf"],
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "optimize pdf"],
    seoTitle: "Compress PDF Files Privately Online | DevKitLab", seoDescription: "Reduce image-heavy PDF size locally in your browser with balanced and maximum compression modes.",
    howTo: ["Choose a PDF.", "Select balanced or maximum compression.", "Review the flattening warning.", "Compress and download the result."],
    features: ["Balanced and maximum modes", "Before/after size report", "No server upload", "Works well for scanned PDFs"],
    limitations: ["Pages are flattened into images", "Text, forms, links, and annotations are not preserved", "Already-optimized PDFs may not become smaller"],
    faqs: [{ question: "Why does compression flatten the PDF?", answer: "Browser-safe compression renders each page and re-encodes it. This is effective for scans but removes interactive document features." }],
    relatedToolSlugs: ["pdf-merger", "pdf-splitter", "pdf-to-images"]
  },
  {
    id: "images-to-pdf",
    slug: "images-to-pdf",
    name: "Images to PDF",
    shortDescription: "Combine JPG, PNG, and WebP images into a clean, ordered PDF document.",
    longDescription: "Turn multiple images into one PDF. Reorder images, choose A4 or image-sized pages, and export locally. Transparent images are placed on a white page for predictable printing.",
    category: "pdf", categoryName: "PDF Tools", icon: "Images", status: "active", processingMode: "CLIENT",
    supportedInputs: ["image/jpeg", "image/png", "image/webp"], supportedOutputs: ["application/pdf"],
    keywords: ["images to pdf", "jpg to pdf", "png to pdf", "webp to pdf", "photo to pdf"],
    seoTitle: "Convert Images to PDF - JPG, PNG & WebP | DevKitLab", seoDescription: "Combine JPG, PNG, and WebP images into an ordered PDF privately in your browser.",
    howTo: ["Add one or more images.", "Reorder them as needed.", "Choose A4 or original-size pages.", "Create and download the PDF."],
    features: ["Multiple image formats", "Image reordering", "A4 print layout", "Local conversion"],
    limitations: ["Maximum recommended combined size is 100 MB"],
    faqs: [{ question: "Can I mix JPG and PNG files?", answer: "Yes. JPG, PNG, and WebP images can be combined in the same PDF." }],
    relatedToolSlugs: ["pdf-to-images", "pdf-merger", "image-converter"]
  },
  {
    id: "pdf-to-images",
    slug: "pdf-to-images",
    name: "PDF to Images",
    shortDescription: "Convert PDF pages into high-quality PNG or JPEG images and download them as a ZIP.",
    longDescription: "Render selected PDF pages as PNG or JPEG images. Choose the output scale and page range, then download every generated page in one ZIP archive. Files remain in browser memory.",
    category: "pdf", categoryName: "PDF Tools", icon: "FileImage", status: "active", processingMode: "CLIENT",
    supportedInputs: ["application/pdf"], supportedOutputs: ["image/png", "image/jpeg", "application/zip"],
    keywords: ["pdf to images", "pdf to jpg", "pdf to png", "convert pdf pages", "pdf image extractor"],
    seoTitle: "Convert PDF to JPG or PNG Images | DevKitLab", seoDescription: "Convert selected PDF pages to JPG or PNG locally and download them together as a ZIP file.",
    howTo: ["Choose a PDF.", "Select PNG or JPEG, scale, and page range.", "Click Convert pages.", "Download the ZIP archive."],
    features: ["PNG and JPEG output", "Page-range selection", "1x, 1.5x, and 2x rendering", "Single ZIP download"],
    limitations: ["Encrypted PDFs must be unlocked first", "Very large documents can use significant browser memory"],
    faqs: [{ question: "What scale should I use?", answer: "Use 1x for smaller web images, 1.5x for balanced quality, or 2x for sharper output and printing." }],
    relatedToolSlugs: ["images-to-pdf", "pdf-splitter", "pdf-compressor"]
  },
  {
    id: "pdf-organizer",
    slug: "pdf-organizer",
    name: "Organize & Rotate PDF Pages",
    shortDescription: "Reorder, remove, duplicate, and rotate PDF pages using a simple page sequence.",
    longDescription: "Organize a PDF by entering the page sequence you want in the result. Omit pages to delete them, repeat a page to duplicate it, change the order freely, and rotate the selected output pages in 90-degree steps.",
    category: "pdf", categoryName: "PDF Tools", icon: "PanelsTopLeft", status: "active", processingMode: "CLIENT",
    supportedInputs: ["application/pdf"], supportedOutputs: ["application/pdf"],
    keywords: ["reorder pdf pages", "rotate pdf", "delete pdf pages", "organize pdf", "duplicate pdf page"],
    seoTitle: "Organize, Reorder & Rotate PDF Pages | DevKitLab", seoDescription: "Reorder, remove, duplicate, and rotate PDF pages privately in your browser.",
    howTo: ["Choose a PDF.", "Enter the page sequence you want, such as 3,1,2.", "Choose an optional rotation.", "Create and download the organized PDF."],
    features: ["Reorder pages", "Remove pages by omission", "Duplicate pages", "Rotate in 90-degree steps"],
    limitations: ["Encrypted PDFs must be unlocked first"],
    faqs: [{ question: "How do I delete a page?", answer: "Leave that page number out of the output sequence. For example, use 1-3,5 to omit page 4." }],
    relatedToolSlugs: ["pdf-merger", "pdf-splitter", "pdf-compressor"]
  },
  ...EXTRA_TOOLS,
];

function validateToolRegistry() {
  const slugs = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const categorySlugs = new Set(TOOL_CATEGORIES.map((category) => category.slug));

  for (const tool of ALL_TOOLS) {
    if (slugs.has(tool.slug)) throw new Error(`Duplicate tool slug: ${tool.slug}`);
    if (titles.has(tool.seoTitle)) throw new Error(`Duplicate tool SEO title: ${tool.seoTitle}`);
    if (descriptions.has(tool.seoDescription)) throw new Error(`Duplicate tool SEO description: ${tool.slug}`);
    if (!categorySlugs.has(tool.category)) throw new Error(`Unknown category '${tool.category}' on tool '${tool.slug}'`);
    if (!tool.shortDescription.trim() || !tool.seoDescription.trim()) throw new Error(`Missing description on tool '${tool.slug}'`);
    slugs.add(tool.slug);
    titles.add(tool.seoTitle);
    descriptions.add(tool.seoDescription);
  }

  for (const tool of ALL_TOOLS) {
    for (const relatedSlug of tool.relatedToolSlugs) {
      if (!slugs.has(relatedSlug)) throw new Error(`Broken related tool '${relatedSlug}' on '${tool.slug}'`);
    }
  }
}

validateToolRegistry();

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
      t.aliases?.some((alias) => alias.toLowerCase().includes(q)) ||
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



function parseCsvRows(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '"') {
      if (quoted && input[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field); field = "";
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && input[i + 1] === '\n') i++;
      row.push(field); field = "";
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
    } else field += char;
  }
  row.push(field);
  if (row.some((value) => value.length > 0)) rows.push(row);
  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  return rows;
}

function csvEscape(value: unknown): string {
  let text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/[",\n\r]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

function commonMarkdownToHtml(input: string): string {
  const escaped = input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const lines = escaped.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    const list = line.match(/^[-*]\s+(.+)/);
    if (list) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${list[1]}</li>`);
      continue;
    }
    if (inList) { out.push("</ul>"); inList = false; }
    if (!line.trim()) continue;
    const inline = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
    const heading = inline.match(/^(#{1,6})\s+(.+)/);
    if (heading) out.push(`<h${heading[1].length}>${heading[2]}</h${heading[1].length}>`);
    else out.push(`<p>${inline}</p>`);
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

function decodeBase64Url(segment: string): string {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  return base64DecodeUtf8(padded);
}

// Client-side Execution Helper Engine
export function executeToolClient(slug: string, input: string, options?: Record<string, unknown>): ToolExecutionResult {
  try {
    const cleanInput = input ? input.trim() : "";

    if (!cleanInput && !["uuid-generator", "password-generator"].includes(slug)) {
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


      case "csv-to-json": {
        const rows = parseCsvRows(cleanInput);
        if (rows.length < 2) return { success: false, output: "", error: "CSV needs a header row and at least one data row." };
        const headers = rows[0].map((h, i) => h.trim() || `column_${i + 1}`);
        const data = rows.slice(1).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""])));
        return { success: true, output: JSON.stringify(data, null, 2), metadata: { rows: data.length, columns: headers.length } };
      }

      case "json-to-csv": {
        const parsed = JSON.parse(sanitizeJsonInput(cleanInput));
        if (!Array.isArray(parsed) || parsed.some((item) => item === null || typeof item !== "object" || Array.isArray(item))) {
          return { success: false, output: "", error: "Enter a JSON array of objects." };
        }
        if (parsed.length === 0) return { success: true, output: "" };
        const headers = Array.from(new Set(parsed.flatMap((item) => Object.keys(item))));
        const lines = [headers.map(csvEscape).join(","), ...parsed.map((item) => headers.map((h) => csvEscape(item[h])).join(","))];
        return { success: true, output: lines.join("\n"), metadata: { rows: parsed.length, columns: headers.length } };
      }

      case "markdown-to-html":
        return { success: true, output: commonMarkdownToHtml(cleanInput) };

      case "html-to-markdown": {
        if (typeof DOMParser === "undefined") return { success: false, output: "", error: "HTML parsing is unavailable in this environment." };
        const doc = new DOMParser().parseFromString(cleanInput, "text/html");
        const walk = (node: Node): string => {
          if (node.nodeType === Node.TEXT_NODE) return node.textContent || "";
          if (node.nodeType !== Node.ELEMENT_NODE) return "";
          const el = node as HTMLElement;
          const body = Array.from(el.childNodes).map(walk).join("");
          const tag = el.tagName.toLowerCase();
          if (/^h[1-6]$/.test(tag)) return `${"#".repeat(Number(tag[1]))} ${body.trim()}\n\n`;
          if (tag === "p") return `${body.trim()}\n\n`;
          if (tag === "strong" || tag === "b") return `**${body}**`;
          if (tag === "em" || tag === "i") return `*${body}*`;
          if (tag === "code") return `\`${body}\``;
          if (tag === "a") return `[${body}](${el.getAttribute("href") || ""})`;
          if (tag === "li") return `- ${body.trim()}\n`;
          if (tag === "br") return "\n";
          return body;
        };
        return { success: true, output: Array.from(doc.body.childNodes).map(walk).join("").replace(/\n{3,}/g, "\n\n").trim() };
      }

      case "word-counter": {
        const words = cleanInput.match(/\S+/g)?.length ?? 0;
        const chars = input.length;
        const charsNoSpaces = input.replace(/\s/g, "").length;
        const lines = input ? input.split(/\r?\n/).length : 0;
        const sentences = (cleanInput.match(/[.!?]+(?:\s|$)/g) || []).length || (words ? 1 : 0);
        const minutes = words / 225;
        return { success: true, output: `Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}\nLines: ${lines}\nSentences (estimated): ${sentences}\nReading time: ${minutes < 1 ? "< 1 minute" : `${Math.ceil(minutes)} minutes`}` };
      }

      case "character-counter": {
        const words = cleanInput.match(/\S+/g)?.length ?? 0;
        return { success: true, output: `Characters: ${input.length}\nCharacters (no spaces): ${input.replace(/\s/g, "").length}\nWords: ${words}\nLines: ${input ? input.split(/\r?\n/).length : 0}` };
      }

      case "case-converter": {
        const words = cleanInput.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
        const title = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        const sentence = cleanInput.charAt(0).toUpperCase() + cleanInput.slice(1).toLowerCase();
        const camel = words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join("");
        return { success: true, output: `UPPERCASE\n${cleanInput.toUpperCase()}\n\nlowercase\n${cleanInput.toLowerCase()}\n\nTitle Case\n${title}\n\nSentence case\n${sentence}\n\ncamelCase\n${camel}\n\nsnake_case\n${words.join("_")}` };
      }

      case "text-cleaner": {
        const cleaned = input.replace(/\r\n?/g, "\n").split("\n").map((line) => line.trim().replace(/[ \t]{2,}/g, " ")).join("\n").replace(/\n{3,}/g, "\n\n").trim();
        return { success: true, output: cleaned };
      }

      case "remove-duplicate-lines": {
        const seen = new Set<string>();
        const lines = input.replace(/\r\n?/g, "\n").split("\n").filter((line) => { if (seen.has(line)) return false; seen.add(line); return true; });
        return { success: true, output: lines.join("\n"), metadata: { removed: input.split(/\r?\n/).length - lines.length } };
      }

      case "text-sorter": {
        const lines = input.replace(/\r\n?/g, "\n").split("\n").filter((line) => line.trim().length > 0);
        lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
        return { success: true, output: lines.join("\n") };
      }

      case "slug-generator": {
        const slug = cleanInput.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        if (!slug) return { success: false, output: "", error: "This text does not contain characters that can be converted to an ASCII slug." };
        return { success: true, output: slug };
      }

      case "decimal-to-binary": {
        const value = Number(cleanInput);
        if (!Number.isSafeInteger(value)) return { success: false, output: "", error: "Enter a valid decimal safe integer." };
        const out = value < 0 ? `-${Math.abs(value).toString(2)}` : value.toString(2);
        return { success: true, output: out };
      }

      case "binary-to-decimal": {
        if (!/^-?[01]+$/.test(cleanInput)) return { success: false, output: "", error: "Enter a binary integer containing only 0 and 1." };
        const negative = cleanInput.startsWith("-");
        const digits = negative ? cleanInput.slice(1) : cleanInput;
        const value = parseInt(digits, 2) * (negative ? -1 : 1);
        if (!Number.isSafeInteger(value)) return { success: false, output: "", error: "The binary value is outside the safe integer range." };
        return { success: true, output: String(value) };
      }

      case "percentage-calculator": {
        const [part, total] = cleanInput.split(",").map(Number);
        if (![part, total].every(Number.isFinite) || total === 0) return { success: false, output: "", error: "Use part,total format, for example 25,200. Total cannot be zero." };
        const percent = part / total * 100;
        return { success: true, output: `${part} is ${percent.toFixed(2)}% of ${total}\nFormula: (${part} ÷ ${total}) × 100` };
      }

      case "discount-calculator": {
        const [price, discount] = cleanInput.split(",").map(Number);
        if (![price, discount].every(Number.isFinite) || price < 0 || discount < 0 || discount > 100) return { success: false, output: "", error: "Use price,discount format, for example 120,25. Discount must be 0–100." };
        const savings = price * discount / 100;
        return { success: true, output: `Original price: ${price.toFixed(2)}\nDiscount: ${discount.toFixed(2)}%\nYou save: ${savings.toFixed(2)}\nFinal price: ${(price - savings).toFixed(2)}` };
      }

      case "markup-calculator": {
        const [cost, markup] = cleanInput.split(",").map(Number);
        if (![cost, markup].every(Number.isFinite) || cost < 0 || markup < 0) return { success: false, output: "", error: "Use cost,markup format, for example 80,30." };
        const amount = cost * markup / 100;
        const price = cost + amount;
        const margin = price === 0 ? 0 : amount / price * 100;
        return { success: true, output: `Cost: ${cost.toFixed(2)}\nMarkup: ${markup.toFixed(2)}%\nMarkup amount: ${amount.toFixed(2)}\nSelling price: ${price.toFixed(2)}\nGross margin: ${margin.toFixed(2)}%` };
      }

      case "age-calculator": {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanInput)) return { success: false, output: "", error: "Enter the date as YYYY-MM-DD." };
        const birth = new Date(`${cleanInput}T00:00:00`);
        if (Number.isNaN(birth.getTime()) || birth.getFullYear() !== Number(cleanInput.slice(0,4)) || birth.getMonth() + 1 !== Number(cleanInput.slice(5,7)) || birth.getDate() !== Number(cleanInput.slice(8,10))) return { success: false, output: "", error: "Enter a real calendar date." };
        const today = new Date();
        today.setHours(0,0,0,0);
        if (birth > today) return { success: false, output: "", error: "Birth date cannot be in the future." };
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
        if (months < 0) { years--; months += 12; }
        return { success: true, output: `${years} years, ${months} months, ${days} days` };
      }

      case "jwt-decoder": {
        const parts = cleanInput.split(".");
        if (parts.length !== 3) return { success: false, output: "", error: "A JWT normally has three dot-separated segments." };
        const header = JSON.parse(decodeBase64Url(parts[0]));
        const payload = JSON.parse(decodeBase64Url(parts[1]));
        return { success: true, output: `Header\n${JSON.stringify(header, null, 2)}\n\nPayload\n${JSON.stringify(payload, null, 2)}\n\nNote: decoded only — signature NOT verified.` };
      }

      case "password-generator": {
        const length = Math.min(Math.max(Number(options?.length) || 20, 12), 128);
        const count = Math.min(Math.max(Number(options?.count) || 5, 1), 50);
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=?";
        const values: string[] = [];
        for (let p = 0; p < count; p++) {
          const bytes = new Uint32Array(length);
          crypto.getRandomValues(bytes);
          values.push(Array.from(bytes, (n) => chars[n % chars.length]).join(""));
        }
        return { success: true, output: values.join("\n"), metadata: { length, count } };
      }

      case "xml-formatter": {
        if (typeof DOMParser === "undefined" || typeof XMLSerializer === "undefined") return { success: false, output: "", error: "XML parsing is unavailable in this environment." };
        const doc = new DOMParser().parseFromString(cleanInput, "application/xml");
        const parserError = doc.querySelector("parsererror");
        if (parserError) return { success: false, output: "", error: "Invalid XML: " + (parserError.textContent || "parse error").replace(/\s+/g, " ").slice(0, 220) };
        const xml = new XMLSerializer().serializeToString(doc);
        let formatted = ""; let pad = 0;
        xml.replace(/>\s*</g, "><").replace(/</g, "\n<").trim().split("\n").forEach((node) => {
          if (/^<\//.test(node)) pad = Math.max(0, pad - 1);
          formatted += `${"  ".repeat(pad)}${node}\n`;
          if (/^<[^!?/][^>]*[^/]>$/.test(node) && !/<\/[^>]+>$/.test(node)) pad++;
        });
        return { success: true, output: formatted.trim() };
      }

      default:
        return { success: false, output: "", error: `Tool ${slug} execution is not registered.` };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, output: "", error: errorMsg };
  }
}
