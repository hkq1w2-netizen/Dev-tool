import type { ToolMetadata } from "@/types/tool";

const local = {
  status: "active" as const,
  processingMode: "CLIENT" as const,
  privacyMode: "LOCAL" as const,
  indexable: true,
};

export const EXTRA_TOOLS: ToolMetadata[] = [
  {
    ...local, id: "csv-to-json", slug: "csv-to-json", name: "CSV to JSON Converter", category: "converters", categoryName: "Data Converters", icon: "TableProperties",
    shortDescription: "Convert CSV rows into structured JSON arrays directly in your browser.",
    longDescription: "Convert comma-separated tabular data into JSON objects using the first CSV row as field names. Quoted commas and escaped quotes are supported for practical exports.",
    supportedInputs: ["text/csv", "text/plain"], supportedOutputs: ["application/json"], keywords: ["csv to json", "convert csv to json", "csv json converter"], aliases: ["csv json"],
    seoTitle: "CSV to JSON Converter Online | DevKitLab", seoDescription: "Convert CSV data to formatted JSON locally in your browser with quoted-field support and no file upload.",
    howTo: ["Paste CSV with a header row.", "Run the converter.", "Review, copy, or download the JSON output."],
    features: ["Header-based objects", "Quoted CSV fields", "Local browser processing"], limitations: ["Uses comma as the delimiter"],
    faqs: [{ question: "Does the first row become JSON keys?", answer: "Yes. The first CSV row is treated as the header and each following row becomes an object." }], relatedToolSlugs: ["json-to-csv", "json-formatter", "json-validator"]
  },
  {
    ...local, id: "json-to-csv", slug: "json-to-csv", name: "JSON to CSV Converter", category: "converters", categoryName: "Data Converters", icon: "Table2",
    shortDescription: "Convert an array of flat JSON objects into downloadable CSV text.",
    longDescription: "Turn JSON arrays into CSV using the union of object keys as columns, with correct escaping for commas, quotes, and newlines.",
    supportedInputs: ["application/json", "text/plain"], supportedOutputs: ["text/csv"], keywords: ["json to csv", "convert json to csv", "json csv converter"],
    seoTitle: "JSON to CSV Converter Online | DevKitLab", seoDescription: "Convert JSON arrays to CSV locally with automatic columns and safe CSV escaping.",
    howTo: ["Paste a JSON array of objects.", "Run the converter.", "Copy or download the CSV result."], features: ["Automatic columns", "CSV escaping", "Local processing"], limitations: ["Nested objects are serialized as JSON strings"],
    faqs: [{ question: "Can it convert nested JSON?", answer: "Nested values are preserved by serializing them into a CSV cell instead of silently discarding them." }], relatedToolSlugs: ["csv-to-json", "json-formatter", "json-validator"]
  },
  {
    ...local, id: "markdown-to-html", slug: "markdown-to-html", name: "Markdown to HTML", category: "markdown", categoryName: "Markdown Tools", icon: "FileCode2",
    shortDescription: "Convert common Markdown syntax into clean HTML markup.", longDescription: "Convert headings, emphasis, code, links, lists, and paragraphs from Markdown into HTML for documentation and publishing workflows.",
    supportedInputs: ["text/markdown", "text/plain"], supportedOutputs: ["text/html"], keywords: ["markdown to html", "md to html", "convert markdown"], seoTitle: "Markdown to HTML Converter | DevKitLab", seoDescription: "Convert common Markdown syntax to HTML instantly in your browser.",
    howTo: ["Paste Markdown.", "Run the converter.", "Copy the generated HTML."], features: ["Headings", "Emphasis and inline code", "Links and lists"], limitations: ["Intentionally supports a safe common subset rather than every Markdown extension"], faqs: [], relatedToolSlugs: ["markdown-editor", "html-to-markdown", "html-formatter"]
  },
  {
    ...local, id: "html-to-markdown", slug: "html-to-markdown", name: "HTML to Markdown", category: "converters", categoryName: "Data Converters", icon: "CodeXml",
    shortDescription: "Convert common HTML elements into readable Markdown text.", longDescription: "Transform headings, paragraphs, links, emphasis, code, lists, and line breaks into Markdown for notes and documentation.",
    supportedInputs: ["text/html", "text/plain"], supportedOutputs: ["text/markdown"], keywords: ["html to markdown", "html to md", "convert html to markdown"], seoTitle: "HTML to Markdown Converter | DevKitLab", seoDescription: "Convert common HTML markup to Markdown locally in your browser.",
    howTo: ["Paste HTML markup.", "Run the converter.", "Review and copy the Markdown."], features: ["Common semantic tags", "Links and lists", "No upload"], limitations: ["Complex layout HTML and CSS are not preserved"], faqs: [], relatedToolSlugs: ["markdown-to-html", "html-formatter", "markdown-editor"]
  },
  {
    ...local, id: "word-counter", slug: "word-counter", name: "Word Counter", category: "text", categoryName: "Text Tools", icon: "ListOrdered",
    shortDescription: "Count words, characters, lines, sentences, and estimated reading time.", longDescription: "Analyze text instantly with practical writing metrics including word count, character counts, line count, sentence estimate, and reading time.",
    supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["word counter", "count words", "character counter", "reading time"], seoTitle: "Word Counter & Reading Time Tool | DevKitLab", seoDescription: "Count words, characters, lines, sentences, and estimated reading time instantly.",
    howTo: ["Paste or type text.", "Run Word Counter.", "Review the writing statistics."], features: ["Word and character counts", "Sentence and line counts", "Reading-time estimate"], limitations: ["Sentence count is an estimate based on punctuation"], faqs: [], relatedToolSlugs: ["character-counter", "case-converter", "text-cleaner"]
  },
  {
    ...local, id: "character-counter", slug: "character-counter", name: "Character Counter", category: "text", categoryName: "Text Tools", icon: "TextCursorInput",
    shortDescription: "Count characters with and without spaces plus words and lines.", longDescription: "Quickly measure text length for forms, metadata, captions, posts, code snippets, and other character-limited content.",
    supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["character counter", "letter counter", "count characters"], seoTitle: "Character Counter Online | DevKitLab", seoDescription: "Count characters with and without spaces, words, and lines instantly.", howTo: ["Paste text.", "Run the counter.", "Review character totals."], features: ["With-space count", "Without-space count", "Word and line totals"], limitations: [], faqs: [], relatedToolSlugs: ["word-counter", "case-converter", "slug-generator"]
  },
  {
    ...local, id: "case-converter", slug: "case-converter", name: "Case Converter", category: "text", categoryName: "Text Tools", icon: "CaseSensitive",
    shortDescription: "Generate uppercase, lowercase, title case, sentence case, camelCase, and snake_case versions.", longDescription: "Transform text into common writing and developer naming conventions in a single run so you can choose the version you need.",
    supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["case converter", "uppercase converter", "lowercase converter", "title case", "camel case"], seoTitle: "Text Case Converter | DevKitLab", seoDescription: "Convert text to uppercase, lowercase, title case, sentence case, camelCase, and snake_case.", howTo: ["Paste text.", "Run the converter.", "Copy the case style you need."], features: ["Six common case styles", "Developer naming formats", "Instant local processing"], limitations: [], faqs: [], relatedToolSlugs: ["word-counter", "slug-generator", "text-cleaner"]
  },
  {
    ...local, id: "text-cleaner", slug: "text-cleaner", name: "Text Cleaner", category: "text", categoryName: "Text Tools", icon: "Eraser",
    shortDescription: "Normalize whitespace, trim lines, and remove repeated blank lines.", longDescription: "Clean pasted text by normalizing line endings, trimming trailing spaces, collapsing repeated spaces, and reducing excessive blank lines while preserving paragraph structure.",
    supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["text cleaner", "clean text", "remove extra spaces"], seoTitle: "Text Cleaner – Remove Extra Spaces | DevKitLab", seoDescription: "Clean pasted text by removing extra spaces, trailing whitespace, and repeated blank lines.", howTo: ["Paste messy text.", "Run Text Cleaner.", "Copy the normalized result."], features: ["Whitespace cleanup", "Blank-line normalization", "Preserves paragraphs"], limitations: [], faqs: [], relatedToolSlugs: ["remove-duplicate-lines", "text-sorter", "word-counter"]
  },
  {
    ...local, id: "remove-duplicate-lines", slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", category: "text", categoryName: "Text Tools", icon: "ListX",
    shortDescription: "Remove repeated lines while preserving the first occurrence and original order.", longDescription: "Deduplicate lists, exports, identifiers, and pasted text without sorting away the original sequence.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["remove duplicate lines", "deduplicate text", "unique lines"], seoTitle: "Remove Duplicate Lines Online | DevKitLab", seoDescription: "Remove duplicate text lines while preserving original order, entirely in your browser.", howTo: ["Paste one item per line.", "Run the tool.", "Copy the unique lines."], features: ["Stable order", "Exact line matching", "Local processing"], limitations: ["Matching is case-sensitive"], faqs: [], relatedToolSlugs: ["text-sorter", "text-cleaner", "word-counter"]
  },
  {
    ...local, id: "text-sorter", slug: "text-sorter", name: "Text Line Sorter", category: "text", categoryName: "Text Tools", icon: "ArrowDownAZ",
    shortDescription: "Sort non-empty text lines alphabetically with natural numeric ordering.", longDescription: "Sort line-based lists using locale-aware natural ordering so values such as item2 and item10 appear in expected order.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["sort text lines", "alphabetize list", "text sorter"], seoTitle: "Text Line Sorter & Alphabetizer | DevKitLab", seoDescription: "Sort text lines alphabetically with natural numeric ordering in your browser.", howTo: ["Paste one item per line.", "Run the sorter.", "Copy the ordered list."], features: ["Natural numeric ordering", "Locale-aware sorting", "Blank-line cleanup"], limitations: [], faqs: [], relatedToolSlugs: ["remove-duplicate-lines", "text-cleaner", "slug-generator"]
  },
  {
    ...local, id: "slug-generator", slug: "slug-generator", name: "URL Slug Generator", category: "text", categoryName: "Text Tools", icon: "Link2",
    shortDescription: "Turn titles and phrases into lowercase, hyphen-separated URL slugs.", longDescription: "Create readable URL slugs by normalizing accents, removing punctuation, collapsing separators, and trimming extra hyphens.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["slug generator", "url slug", "seo slug generator"], seoTitle: "URL Slug Generator Online | DevKitLab", seoDescription: "Convert titles into clean lowercase URL slugs with normalized characters and hyphens.", howTo: ["Paste a title or phrase.", "Run Slug Generator.", "Copy the clean slug."], features: ["Accent normalization", "Punctuation cleanup", "Hyphen normalization"], limitations: ["Non-Latin scripts may be removed rather than transliterated"], faqs: [], relatedToolSlugs: ["case-converter", "url-encoder", "text-cleaner"]
  },
  {
    ...local, id: "decimal-to-binary", slug: "decimal-to-binary", name: "Decimal to Binary Converter", category: "converters", categoryName: "Data Converters", icon: "Binary",
    shortDescription: "Convert safe decimal integers into binary notation.", longDescription: "Convert positive or negative base-10 integers into base-2 representation with validation for JavaScript safe integers.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["decimal to binary", "base 10 to base 2", "decimal binary converter"], seoTitle: "Decimal to Binary Converter | DevKitLab", seoDescription: "Convert decimal integers to binary notation instantly with input validation.", howTo: ["Enter a decimal integer.", "Run the converter.", "Copy the binary value."], features: ["Negative integers", "Safe-integer validation", "Instant conversion"], limitations: ["Limited to JavaScript safe integers"], faqs: [], relatedToolSlugs: ["binary-to-decimal", "base64-encoder", "hex-to-rgb"]
  },
  {
    ...local, id: "binary-to-decimal", slug: "binary-to-decimal", name: "Binary to Decimal Converter", category: "converters", categoryName: "Data Converters", icon: "Calculator",
    shortDescription: "Convert base-2 binary integers into decimal values.", longDescription: "Translate binary strings into decimal integers with validation and safe-integer range checking.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["binary to decimal", "base 2 to base 10", "binary decimal converter"], seoTitle: "Binary to Decimal Converter | DevKitLab", seoDescription: "Convert binary integers to decimal values instantly in your browser.", howTo: ["Enter a binary value such as 101101.", "Run the converter.", "Copy the decimal result."], features: ["Optional negative sign", "Strict binary validation", "Safe-integer checks"], limitations: ["Limited to values inside JavaScript safe integer range"], faqs: [], relatedToolSlugs: ["decimal-to-binary", "base64-decoder", "timestamp-converter"]
  },
  {
    ...local, id: "percentage-calculator", slug: "percentage-calculator", name: "Percentage Calculator", category: "calculators", categoryName: "Calculators", icon: "Percent",
    shortDescription: "Calculate what percentage one number is of another using simple comma-separated input.", longDescription: "Calculate percentage relationships for everyday math. Enter part,total to find what percent the part represents of the total.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["percentage calculator", "percent calculator", "what percent is"], seoTitle: "Percentage Calculator Online | DevKitLab", seoDescription: "Calculate what percentage one number is of another using simple part,total input.", howTo: ["Enter part,total — for example 25,200.", "Run the calculator.", "Review the percentage and formula."], features: ["Clear formula", "Decimal support", "Input validation"], limitations: ["Total cannot be zero"], faqs: [], relatedToolSlugs: ["discount-calculator", "markup-calculator"]
  },
  {
    ...local, id: "discount-calculator", slug: "discount-calculator", name: "Discount Calculator", category: "calculators", categoryName: "Calculators", icon: "BadgePercent",
    shortDescription: "Calculate sale price and savings from an original price and discount percentage.", longDescription: "Enter price,discount% to calculate the amount saved and the final price after the discount.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["discount calculator", "sale price calculator", "percent off calculator"], seoTitle: "Discount & Sale Price Calculator | DevKitLab", seoDescription: "Calculate discount savings and final sale price from an original price and percentage off.", howTo: ["Enter price,discount — for example 120,25.", "Run the calculator.", "Review savings and final price."], features: ["Savings amount", "Final price", "Decimal support"], limitations: ["Discount must be between 0 and 100"], faqs: [], relatedToolSlugs: ["percentage-calculator", "markup-calculator"]
  },
  {
    ...local, id: "markup-calculator", slug: "markup-calculator", name: "Markup Calculator", category: "calculators", categoryName: "Calculators", icon: "TrendingUp",
    shortDescription: "Calculate selling price and gross profit from cost and markup percentage.", longDescription: "Enter cost,markup% to calculate markup amount, selling price, and the resulting gross margin percentage.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["markup calculator", "selling price calculator", "markup percentage"], seoTitle: "Markup & Selling Price Calculator | DevKitLab", seoDescription: "Calculate markup amount, selling price, and gross margin from cost and markup percentage.", howTo: ["Enter cost,markup — for example 80,30.", "Run the calculator.", "Review selling price and margin."], features: ["Markup amount", "Selling price", "Gross margin"], limitations: ["Cost must be zero or greater"], faqs: [], relatedToolSlugs: ["percentage-calculator", "discount-calculator"]
  },
  {
    ...local, id: "age-calculator", slug: "age-calculator", name: "Age Calculator", category: "calculators", categoryName: "Calculators", icon: "CalendarDays",
    shortDescription: "Calculate age in completed years, months, and days from a birth date.", longDescription: "Calculate calendar age from an ISO-style date using the device's current local date, with validation that the birth date is not in the future.", supportedInputs: ["text/plain"], supportedOutputs: ["text/plain"], keywords: ["age calculator", "calculate age", "date of birth age"], seoTitle: "Age Calculator – Years, Months & Days | DevKitLab", seoDescription: "Calculate age in completed years, months, and days from a birth date.", howTo: ["Enter a date in YYYY-MM-DD format.", "Run Age Calculator.", "Review the completed years, months, and days."], features: ["Calendar-aware result", "Future-date validation", "Local calculation"], limitations: ["Result uses the current date on your device"], faqs: [], relatedToolSlugs: ["timestamp-converter", "percentage-calculator"]
  },
  {
    ...local, id: "jwt-decoder", slug: "jwt-decoder", name: "JWT Decoder", category: "security", categoryName: "Security & Identity Tools", icon: "KeyRound",
    shortDescription: "Decode JWT header and payload data without claiming to verify its signature.", longDescription: "Inspect the Base64URL-encoded header and payload of a JSON Web Token locally. Decoding does not prove that a token is authentic or trusted.", supportedInputs: ["text/plain"], supportedOutputs: ["application/json"], keywords: ["jwt decoder", "decode jwt", "json web token decoder"], seoTitle: "JWT Decoder & Token Inspector | DevKitLab", seoDescription: "Decode JWT header and payload locally. Clear warning: decoding does not verify the token signature.", howTo: ["Paste a JWT.", "Run JWT Decoder.", "Inspect the header and payload; verify signatures separately in your trusted application."], features: ["Header decoding", "Payload decoding", "No signature-verification claim"], limitations: ["Does not verify signatures", "Does not determine whether a token should be trusted"], faqs: [{ question: "Does decoding a JWT verify it?", answer: "No. Anyone can decode a JWT payload. Trust requires cryptographic signature verification with the expected key and algorithm." }], relatedToolSlugs: ["base64-decoder", "json-formatter", "json-validator"]
  },
  {
    ...local, id: "password-generator", slug: "password-generator", name: "Password Generator", category: "security", categoryName: "Security & Identity Tools", icon: "ShieldCheck",
    shortDescription: "Generate strong random passwords locally with browser cryptographic randomness.", longDescription: "Generate random passwords on your device using the Web Crypto API. Password values are created locally and are not sent to DevKitLab.", supportedInputs: ["none"], supportedOutputs: ["text/plain"], keywords: ["password generator", "random password generator", "strong password generator"], seoTitle: "Secure Password Generator | DevKitLab", seoDescription: "Generate strong random passwords locally using browser cryptographic randomness.", howTo: ["Choose a password length and count.", "Run Password Generator.", "Copy the generated password and store it securely."], features: ["Web Crypto randomness", "Configurable length", "Local generation"], limitations: ["A password manager is recommended for storing unique passwords safely"], faqs: [], relatedToolSlugs: ["uuid-generator", "base64-encoder", "jwt-decoder"]
  },
  {
    ...local, id: "xml-formatter", slug: "xml-formatter", name: "XML Formatter", category: "converters", categoryName: "Data Converters", icon: "Brackets",
    shortDescription: "Pretty-print XML markup with readable indentation and syntax validation.", longDescription: "Validate XML using the browser parser and reformat nested elements into a readable, indented representation for inspection and debugging.", supportedInputs: ["application/xml", "text/xml", "text/plain"], supportedOutputs: ["application/xml"], keywords: ["xml formatter", "pretty print xml", "format xml online"], seoTitle: "XML Formatter & Pretty Printer | DevKitLab", seoDescription: "Validate and pretty-print XML markup locally in your browser.", howTo: ["Paste XML.", "Run XML Formatter.", "Copy the formatted XML."], features: ["Syntax validation", "Readable indentation", "Client-side parsing"], limitations: ["Formatting preserves structure, not original whitespace"], faqs: [], relatedToolSlugs: ["json-formatter", "html-formatter", "csv-to-json"]
  }
];
