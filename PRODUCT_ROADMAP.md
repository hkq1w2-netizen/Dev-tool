# DevKitLab Product Roadmap

DevKitLab is now organized as a scalable, no-account, free online tools platform. Releases are gated by real functionality, clear privacy behavior, mobile usability, SEO quality, and maintainability.

## Completed foundation

- [x] Authentication, account, dashboard, subscription, pricing, billing, and database dependencies removed from the public product
- [x] Canonical production hostname standardized to `https://www.devkitlab.online`
- [x] Dynamic sitemap and robots routes
- [x] Typed tool and category registries
- [x] Searchable all-tools directory and command palette
- [x] Category pages, guide architecture, breadcrumbs, metadata, Open Graph, and JSON-LD
- [x] About, Contact, Privacy, Terms, Security, Changelog, 404, and error-oriented tool states
- [x] PDF/image shells dynamically loaded instead of shipping their heavy code to every tool page
- [x] Registry validation and TypeScript validation scripts
- [x] Deployment target moved off unsupported Next.js 14 to patched Next.js 15.5.24

## Phase 1 — Image tools

- [x] Image Compressor
- [x] Image Converter (JPG, PNG, WebP)
- [x] Image Resizer with aspect-ratio locking
- [x] Drag-and-drop uploads, previews, output controls, file-size comparison, and local browser processing
- [ ] Batch image processing and ZIP downloads
- [ ] Crop, rotate/flip, watermark, and metadata tools

## Phase 2 — PDF essentials

- [x] PDF Merger
- [x] PDF Splitter / page extraction
- [x] PDF Compressor for scanned/image-heavy files
- [x] Images to PDF
- [x] PDF pages to PNG/JPEG ZIP
- [x] PDF page organizer (reorder/remove/duplicate/rotate)
- [x] Local processing, progress, file limits, and encrypted-file limitations

## Phase 3 — Data, text, and everyday conversion tools

- [x] CSV to JSON
- [x] JSON to CSV
- [x] Markdown to HTML
- [x] HTML to Markdown
- [x] XML Formatter
- [x] Word Counter
- [x] Character Counter
- [x] Case Converter
- [x] Text Cleaner
- [x] Remove Duplicate Lines
- [x] Text Line Sorter
- [x] URL Slug Generator
- [x] Decimal to Binary
- [x] Binary to Decimal
- [x] Percentage Calculator
- [x] Discount Calculator
- [x] Markup Calculator
- [x] Age Calculator
- [ ] CSV/Excel conversion (requires a deliberately selected spreadsheet library)
- [ ] Full YAML conversion (requires a standards-compliant YAML parser)
- [ ] QR generation/reading (requires a vetted QR implementation)

## Phase 4 — Media tools

Deferred until codec dependencies are selected and performance-tested. Do not ship fake or browser-incompatible media converters.

- [ ] Audio trim/conversion
- [ ] Video trim/mute/resize
- [ ] GIF maker/frame extractor
- [ ] Capability detection, progress, cancellation, and realistic file limits

## Phase 5 — Security/developer tools

- [x] JWT Decoder with explicit “decode is not verification” guidance
- [x] Secure Password Generator using Web Crypto randomness
- [x] Existing JSON, Base64, URL, UUID, timestamp, regex, HTML, CSS, color, and Markdown utilities retained
- [ ] Hash/HMAC tools with test vectors
- [ ] Additional formatters only after parser/formatter quality is validated

## Phase 6 — Growth and quality

- [x] Homepage repositioned for broad free-online-tools intent
- [x] Search-first discovery and category browsing
- [x] Contextual related-tool graph
- [x] No thin auto-generated keyword variants
- [x] No fake testimonials, ratings, popularity, or usage statistics
- [ ] Add more high-quality guides based on Search Console demand
- [ ] Add privacy-safe analytics after deployment
- [ ] Run Lighthouse/Core Web Vitals measurements in the deployed environment
- [ ] Expand only from validated demand and tool-quality evidence

## Release rule

A tool is complete only when it works, validates input, handles errors, has usable mobile interaction, describes real limitations, and makes privacy claims that match the implementation. Page count is not a success metric.
