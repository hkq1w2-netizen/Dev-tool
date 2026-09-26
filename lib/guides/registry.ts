export interface GuideArticle {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  contentMarkdown: string;
  relatedToolSlugs: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const ALL_GUIDES: GuideArticle[] = [
  {
    slug: "json-formatting-guide",
    title: "Complete JSON Formatting & Syntax Guide for Developers",
    seoTitle: "JSON Formatting & Syntax Guide — Rules, Escaping & Best Practices",
    seoDescription: "Master JSON formatting rules, string escaping, trailing commas, and client-side beautification techniques with step-by-step developer examples.",
    excerpt: "Learn standard JSON specifications, escape characters, trailing comma rules, and common formatting pitfalls.",
    category: "JSON",
    date: "2026-09-14",
    readTime: "5 min read",
    relatedToolSlugs: ["json-formatter", "json-validator", "json-minifier", "json-viewer"],
    contentMarkdown: `
JSON (JavaScript Object Notation) is the lightweight data-interchange format powering modern REST APIs, web services, microservices, and configuration files.

### 1. Key Rules of Valid JSON Syntax
- **Double Quotes Only:** Property names and string values MUST be enclosed in double quotes (\`"key"\`: \`"value"\`). Single quotes (\`'key'\`) are invalid.
- **Supported Data Types:** JSON supports strings, numbers, booleans (\`true\` / \`false\`), arrays (\`[...]\`), objects (\`{...}\`), and \`null\`.
- **No Functions or Undefined:** Functions, \`undefined\`, symbols, and Date objects are not valid JSON primitives.
- **Strict Trailing Commas:** Trailing commas in arrays or objects (\`{"a": 1,}\`) are strictly illegal in standard JSON specs (RFC 8259).

### 2. Formatting vs. Minification
- **Formatting (Beautifying):** Adds indentation (2 or 4 spaces) and newlines to make raw JSON human-readable for debugging and code reviews.
- **Minification:** Strips unnecessary whitespace to reduce HTTP payload sizes for high-performance production APIs.

### 3. Client-Side Browser Privacy Guarantee
When formatting sensitive API responses or database export files, uploading raw data to server-side formatters risks data leakage. Modern tools like **DevKitLab** process JSON entirely inside browser memory using native Web APIs.
`,
    faqs: [
      {
        question: "Why does JSON reject trailing commas?",
        answer: "The ECMAScript JSON specification (RFC 8259) prohibits trailing commas to ensure unambiguous parsing across simple hardware devices, low-memory parsers, and strict C/C++ libraries."
      },
      {
        question: "How can I safely format sensitive client or user JSON data online?",
        answer: "Use client-side tools like DevKitLab's JSON Formatter. The execution runs strictly within your browser JavaScript engine without network transmission."
      }
    ]
  },
  {
    slug: "regex-cheat-sheet",
    title: "JavaScript Regular Expressions Cheat Sheet & Matcher Guide",
    seoTitle: "JavaScript Regex Cheat Sheet — Pattern Matching & Performance Guide",
    seoDescription: "Comprehensive JavaScript Regular Expressions cheat sheet. Master flags, character classes, lookaheads, capture groups, and regex testing.",
    excerpt: "Master character classes, lookaheads, capture groups, and regex performance optimization.",
    category: "Regex",
    date: "2026-09-14",
    readTime: "7 min read",
    relatedToolSlugs: ["regex-tester", "html-formatter", "css-formatter"],
    contentMarkdown: `
Regular expressions (Regex) provide powerful pattern matching and textual search-and-replace capabilities across all programming languages.

### 1. Core Regex Character Classes
- \`\\d\`: Match any numeric digit (0-9).
- \`\\w\`: Match any word character (A-Z, a-z, 0-9, \`_\`).
- \`\\s\`: Match any whitespace character (space, tab, newline).
- \`.\`: Match any character except newlines.
- \`[A-Z]\`: Match any uppercase character range.

### 2. Regex Flags in JavaScript
- \`g\` (Global): Match all occurrences throughout the target string.
- \`i\` (Case-Insensitive): Ignore character casing differences.
- \`m\` (Multiline): Anchors \`^\` and \`$\` match line beginnings and ends.
- \`s\` (DotAll): Allows dot (\`.\`) to match newline characters.

### 3. Lookaheads and Lookbehinds
- **Positive Lookahead (\`(?=...)\`):** Asserts that the expression matches ahead without consuming characters.
- **Negative Lookahead (\`(?!...)\`):** Asserts that the expression does NOT match ahead.
`,
    faqs: [
      {
        question: "What is catastrophic backtracking in regex?",
        answer: "Catastrophic backtracking occurs when nested quantifiers (like (a+)+) match ambiguous strings, forcing the regex engine to test exponential permutations and freezing the CPU thread."
      }
    ]
  },
  {
    slug: "unix-timestamp-guide",
    title: "Understanding Unix Epoch Timestamps & Timezones",
    seoTitle: "Unix Epoch Timestamp Guide — Seconds, Milliseconds & ISO Dates",
    seoDescription: "Demystifying 10-digit epoch seconds vs 13-digit milliseconds, ISO 8601 UTC strings, leap seconds, and timezone conversion rules.",
    excerpt: "Demystifying 10-digit epoch seconds vs 13-digit milliseconds, ISO 8601 UTC strings, and leap seconds.",
    category: "Time",
    date: "2026-09-14",
    readTime: "4 min read",
    relatedToolSlugs: ["timestamp-converter", "uuid-generator"],
    contentMarkdown: `
Unix timestamp (Epoch time) tracks absolute time as an integer representing elapsed seconds since **January 1, 1970 00:00:00 UTC**.

### 1. 10-Digit Seconds vs. 13-Digit Milliseconds
- **Unix Seconds (10 digits):** Standard POSIX timestamp format used in Linux systems, Python \`time.time()\`, and databases like PostgreSQL. Example: \`1700000000\`.
- **Unix Milliseconds (13 digits):** Precision format used by JavaScript \`Date.now()\`, Java \`System.currentTimeMillis()\`, and MongoDB ObjectId timestamps. Example: \`1700000000000\`.

### 2. ISO 8601 & UTC Standardization
Storing raw Unix timestamps avoids timezone ambiguity in global applications. Convert to ISO 8601 (\`YYYY-MM-DDTHH:mm:ss.sssZ\`) at application boundaries for human readability.
`,
    faqs: [
      {
        question: "What is the Year 2038 Problem (Y2K38)?",
        answer: "Legacy 32-bit signed integer systems will overflow on January 19, 2038 at 03:14:07 UTC. Modern 64-bit systems represent timestamps up to billions of years into the future."
      }
    ]
  }
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return ALL_GUIDES.find((g) => g.slug === slug);
}
