"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { degrees, PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  FileImage,
  FileText,
  Loader2,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { ToolMetadata } from "@/types/tool";

interface PdfToolShellProps { tool: ToolMetadata }
interface InputItem { id: string; file: File; pages?: number }
interface OutputFile { blob: Blob; url: string; name: string; summary: string }

const PDF_LIMIT = 100 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
let pdfWorker: Worker | null = null;

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 2 : 0)} ${units[index]}`;
};

async function getPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfWorker) {
    pdfWorker = new Worker(new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
  }
  pdfjs.GlobalWorkerOptions.workerPort = pdfWorker;
  return pdfjs;
}

function parsePageRange(value: string, total: number): number[] {
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "all") return Array.from({ length: total }, (_, index) => index);
  const pages: number[] = [];
  for (const token of trimmed.split(",")) {
    const part = token.trim();
    if (!part) continue;
    if (part.includes("-")) {
      const [startText, endText, ...rest] = part.split("-");
      const start = Number(startText);
      const end = Number(endText);
      if (rest.length || !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > total || start > end) throw new Error(`Invalid page range: ${part}`);
      for (let page = start; page <= end; page += 1) pages.push(page - 1);
    } else {
      const page = Number(part);
      if (!Number.isInteger(page) || page < 1 || page > total) throw new Error(`Page ${part} is outside 1-${total}.`);
      pages.push(page - 1);
    }
  }
  if (!pages.length) throw new Error("Enter at least one page number.");
  return pages;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The browser could not export this page.")), type, quality));
}

function createPdfBlob(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new Blob([copy.buffer], { type: "application/pdf" });
}

async function renderPdfPage(pdf: PDFDocumentProxy, pageNumber: number, scale: number) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas rendering is unavailable.");
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: context, viewport }).promise;
  return { canvas, page, viewport };
}

export default function PdfToolShell({ tool }: PdfToolShellProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<InputItem[]>([]);
  const [output, setOutput] = useState<OutputFile | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pageRange, setPageRange] = useState("all");
  const [imageFormat, setImageFormat] = useState<"png" | "jpeg">("png");
  const [renderScale, setRenderScale] = useState(1.5);
  const [compression, setCompression] = useState<"balanced" | "maximum">("balanced");
  const [pageSize, setPageSize] = useState<"a4" | "original">("a4");
  const [rotation, setRotation] = useState(0);

  const acceptsImages = tool.slug === "images-to-pdf";
  const acceptsMultiple = tool.slug === "pdf-merger" || acceptsImages;
  const totalSize = useMemo(() => items.reduce((sum, item) => sum + item.file.size, 0), [items]);
  const totalPages = items.reduce((sum, item) => sum + (item.pages || 0), 0);

  useEffect(() => () => { if (output?.url) URL.revokeObjectURL(output.url); }, [output?.url]);

  const clearOutput = () => setOutput((current) => {
    if (current?.url) URL.revokeObjectURL(current.url);
    return null;
  });

  const inspectFile = async (file: File): Promise<InputItem> => {
    if (file.size > PDF_LIMIT) throw new Error(`${file.name} is larger than the 100 MB limit.`);
    if (acceptsImages) {
      if (!IMAGE_TYPES.includes(file.type)) throw new Error(`${file.name} is not a JPG, PNG, or WebP image.`);
      return { id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, file, pages: 1 };
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) throw new Error(`${file.name} is not a PDF file.`);
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer(), { updateMetadata: false });
      return { id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`, file, pages: pdf.getPageCount() };
    } catch {
      throw new Error(`${file.name} could not be opened. It may be encrypted or damaged.`);
    }
  };

  const addFiles = async (fileList?: FileList | File[]) => {
    if (!fileList?.length) return;
    setError("");
    clearOutput();
    try {
      const selected = acceptsMultiple ? Array.from(fileList) : [Array.from(fileList)[0]];
      const inspected = await Promise.all(selected.map(inspectFile));
      const nextSize = (acceptsMultiple ? totalSize : 0) + inspected.reduce((sum, item) => sum + item.file.size, 0);
      if (nextSize > PDF_LIMIT) throw new Error("The selected files exceed the 100 MB combined limit.");
      setItems((current) => acceptsMultiple ? [...current, ...inspected] : inspected);
      if (!acceptsImages && inspected[0]?.pages) setPageRange(`1-${inspected[0].pages}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not read the selected files.");
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    void addFiles(event.target.files || undefined);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void addFiles(event.dataTransfer.files);
  };

  const move = (index: number, direction: -1 | 1) => {
    setItems((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    clearOutput();
  };

  const remove = (id: string) => { setItems((current) => current.filter((item) => item.id !== id)); clearOutput(); };

  const publish = (blob: Blob, name: string, summary: string) => {
    const url = URL.createObjectURL(blob);
    setOutput({ blob, url, name, summary });
  };

  const mergePdfs = async () => {
    if (items.length < 2) throw new Error("Add at least two PDF files to merge.");
    const result = await PDFDocument.create();
    for (let index = 0; index < items.length; index += 1) {
      const source = await PDFDocument.load(await items[index].file.arrayBuffer());
      const pages = await result.copyPages(source, source.getPageIndices());
      pages.forEach((page) => result.addPage(page));
      setProgress(Math.round(((index + 1) / items.length) * 100));
    }
    const bytes = await result.save({ useObjectStreams: true });
    publish(createPdfBlob(bytes), "devkitlab-merged.pdf", `${result.getPageCount()} pages combined`);
  };

  const splitPdf = async () => {
    const item = items[0];
    if (!item?.pages) throw new Error("Choose a PDF first.");
    const selected = parsePageRange(pageRange, item.pages);
    const source = await PDFDocument.load(await item.file.arrayBuffer());
    const result = await PDFDocument.create();
    const pages = await result.copyPages(source, selected);
    pages.forEach((page) => result.addPage(page));
    const bytes = await result.save({ useObjectStreams: true });
    publish(createPdfBlob(bytes), `${item.file.name.replace(/\.pdf$/i, "")}-pages.pdf`, `${pages.length} page${pages.length === 1 ? "" : "s"} extracted`);
  };

  const organizePdf = async () => {
    const item = items[0];
    if (!item?.pages) throw new Error("Choose a PDF first.");
    const selected = parsePageRange(pageRange, item.pages);
    const source = await PDFDocument.load(await item.file.arrayBuffer());
    const result = await PDFDocument.create();
    const pages = await result.copyPages(source, selected);
    pages.forEach((page) => {
      if (rotation) page.setRotation(degrees((page.getRotation().angle + rotation) % 360));
      result.addPage(page);
    });
    const bytes = await result.save({ useObjectStreams: true });
    publish(createPdfBlob(bytes), `${item.file.name.replace(/\.pdf$/i, "")}-organized.pdf`, `${pages.length} pages organized${rotation ? ` and rotated ${rotation}°` : ""}`);
  };

  const imagesToPdf = async () => {
    if (!items.length) throw new Error("Add at least one image.");
    const result = await PDFDocument.create();
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const { bytes, width, height } = await normalizeImage(item.file);
      const image = await result.embedJpg(bytes);
      const landscape = width > height;
      const dimensions: [number, number] = pageSize === "a4" ? (landscape ? [841.89, 595.28] : [595.28, 841.89]) : [width, height];
      const page = result.addPage(dimensions);
      const margin = pageSize === "a4" ? 24 : 0;
      const scale = Math.min((dimensions[0] - margin * 2) / width, (dimensions[1] - margin * 2) / height);
      const drawWidth = width * scale;
      const drawHeight = height * scale;
      page.drawImage(image, { x: (dimensions[0] - drawWidth) / 2, y: (dimensions[1] - drawHeight) / 2, width: drawWidth, height: drawHeight });
      setProgress(Math.round(((index + 1) / items.length) * 100));
    }
    const bytes = await result.save({ useObjectStreams: true });
    publish(createPdfBlob(bytes), "devkitlab-images.pdf", `${items.length} image${items.length === 1 ? "" : "s"} converted`);
  };

  const pdfToImages = async () => {
    const item = items[0];
    if (!item?.pages) throw new Error("Choose a PDF first.");
    const selected = parsePageRange(pageRange, item.pages);
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await item.file.arrayBuffer()) }).promise;
    const zip = new JSZip();
    for (let index = 0; index < selected.length; index += 1) {
      const pageNumber = selected[index] + 1;
      const { canvas } = await renderPdfPage(pdf, pageNumber, renderScale);
      const mime = imageFormat === "png" ? "image/png" : "image/jpeg";
      const blob = await canvasToBlob(canvas, mime, 0.9);
      zip.file(`page-${String(pageNumber).padStart(3, "0")}.${imageFormat === "png" ? "png" : "jpg"}`, blob);
      setProgress(Math.round(((index + 1) / selected.length) * 90));
    }
    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
    setProgress(100);
    publish(blob, `${item.file.name.replace(/\.pdf$/i, "")}-images.zip`, `${selected.length} page image${selected.length === 1 ? "" : "s"} in ZIP`);
  };

  const compressPdf = async () => {
    const item = items[0];
    if (!item?.pages) throw new Error("Choose a PDF first.");
    const pdfjs = await getPdfJs();
    const source = await pdfjs.getDocument({ data: new Uint8Array(await item.file.arrayBuffer()) }).promise;
    const result = await PDFDocument.create();
    const settings = compression === "balanced" ? { scale: 1.3, quality: 0.7 } : { scale: 0.9, quality: 0.48 };
    for (let pageNumber = 1; pageNumber <= source.numPages; pageNumber += 1) {
      const { canvas, page } = await renderPdfPage(source, pageNumber, settings.scale);
      const blob = await canvasToBlob(canvas, "image/jpeg", settings.quality);
      const image = await result.embedJpg(await blob.arrayBuffer());
      const original = page.getViewport({ scale: 1 });
      const outputPage = result.addPage([original.width, original.height]);
      outputPage.drawImage(image, { x: 0, y: 0, width: original.width, height: original.height });
      setProgress(Math.round((pageNumber / source.numPages) * 100));
    }
    const bytes = await result.save({ useObjectStreams: true });
    const blob = createPdfBlob(bytes);
    const change = Math.round((1 - blob.size / item.file.size) * 100);
    publish(blob, `${item.file.name.replace(/\.pdf$/i, "")}-compressed.pdf`, change > 0 ? `${change}% smaller (${formatBytes(blob.size)})` : `Output is ${formatBytes(blob.size)}; this PDF was already well optimized`);
  };

  const run = async () => {
    setBusy(true); setProgress(0); setError(""); clearOutput();
    try {
      if (tool.slug === "pdf-merger") await mergePdfs();
      else if (tool.slug === "pdf-splitter") await splitPdf();
      else if (tool.slug === "pdf-organizer") await organizePdf();
      else if (tool.slug === "images-to-pdf") await imagesToPdf();
      else if (tool.slug === "pdf-to-images") await pdfToImages();
      else if (tool.slug === "pdf-compressor") await compressPdf();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PDF processing failed.");
    } finally { setBusy(false); }
  };

  const actionLabel = tool.slug === "pdf-merger" ? "Merge PDFs" : tool.slug === "pdf-splitter" ? "Extract pages" : tool.slug === "pdf-organizer" ? "Organize PDF" : tool.slug === "images-to-pdf" ? "Create PDF" : tool.slug === "pdf-to-images" ? "Convert pages" : "Compress PDF";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <span className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300"><ShieldCheck className="h-5 w-5" /> Files stay in your browser</span>
        <span className="text-xs text-emerald-700 dark:text-emerald-400">No uploads · no watermark · 100 MB limit</span>
      </div>

      <div onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => inputRef.current?.click()} className={`cursor-pointer rounded-2xl border-2 border-dashed p-7 text-center transition ${dragging ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30" : "border-gray-300 bg-gray-50 hover:border-brand-400 dark:border-gray-700 dark:bg-gray-900/50"}`}>
        <UploadCloud className="mx-auto h-9 w-9 text-brand-600" />
        <h2 className="mt-3 font-bold text-gray-900 dark:text-white">{acceptsImages ? "Drop JPG, PNG, or WebP images" : `Drop ${acceptsMultiple ? "PDF files" : "a PDF"}`}</h2>
        <p className="mt-1 text-xs text-gray-500">or click to browse your device</p>
      </div>
      <input ref={inputRef} type="file" multiple={acceptsMultiple} accept={acceptsImages ? "image/jpeg,image/png,image/webp" : "application/pdf,.pdf"} onChange={handleInput} className="hidden" />

      {items.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><h3 className="font-bold text-gray-900 dark:text-white">Selected files</h3><span className="text-xs text-gray-500">{items.length} file{items.length === 1 ? "" : "s"} · {formatBytes(totalSize)}{!acceptsImages && totalPages ? ` · ${totalPages} pages` : ""}</span></div>
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/50">{acceptsImages ? <FileImage className="h-5 w-5" /> : <FileText className="h-5 w-5" />}</div>
                <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-gray-900 dark:text-white">{item.file.name}</div><div className="text-xs text-gray-500">{formatBytes(item.file.size)}{item.pages && !acceptsImages ? ` · ${item.pages} pages` : ""}</div></div>
                {acceptsMultiple && <div className="flex"><button disabled={index === 0} onClick={(event) => { event.stopPropagation(); move(index, -1); }} className="p-2 text-gray-400 hover:text-brand-600 disabled:opacity-25"><ArrowUp className="h-4 w-4" /></button><button disabled={index === items.length - 1} onClick={(event) => { event.stopPropagation(); move(index, 1); }} className="p-2 text-gray-400 hover:text-brand-600 disabled:opacity-25"><ArrowDown className="h-4 w-4" /></button></div>}
                <button onClick={(event) => { event.stopPropagation(); remove(item.id); }} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>

          <div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/70">
            {(tool.slug === "pdf-splitter" || tool.slug === "pdf-to-images" || tool.slug === "pdf-organizer") && <Setting label={tool.slug === "pdf-organizer" ? "Output page order" : "Pages"}><input value={pageRange} onChange={(event) => { setPageRange(event.target.value); clearOutput(); }} placeholder="1-3,5 or all" className="control" /><p className="mt-1 text-[11px] text-gray-500">{tool.slug === "pdf-organizer" ? "Reorder with 3,1,2; omit a page to delete it." : "Examples: 1-3,5 or all"}</p></Setting>}
            {tool.slug === "pdf-organizer" && <Setting label="Rotate output pages"><select value={rotation} onChange={(event) => setRotation(Number(event.target.value))} className="control"><option value="0">No rotation</option><option value="90">90° clockwise</option><option value="180">180°</option><option value="270">270° clockwise</option></select></Setting>}
            {tool.slug === "pdf-to-images" && <><Setting label="Image format"><select value={imageFormat} onChange={(event) => setImageFormat(event.target.value as "png" | "jpeg")} className="control"><option value="png">PNG</option><option value="jpeg">JPEG</option></select></Setting><Setting label="Render quality"><select value={renderScale} onChange={(event) => setRenderScale(Number(event.target.value))} className="control"><option value="1">1x - Smaller</option><option value="1.5">1.5x - Balanced</option><option value="2">2x - Sharp</option></select></Setting></>}
            {tool.slug === "images-to-pdf" && <Setting label="Page layout"><select value={pageSize} onChange={(event) => setPageSize(event.target.value as "a4" | "original")} className="control"><option value="a4">Fit to A4</option><option value="original">Match image size</option></select></Setting>}
            {tool.slug === "pdf-compressor" && <><Setting label="Compression"><select value={compression} onChange={(event) => setCompression(event.target.value as "balanced" | "maximum")} className="control"><option value="balanced">Balanced quality</option><option value="maximum">Maximum compression</option></select></Setting><div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"><AlertTriangle className="h-4 w-4 shrink-0" /> Compression flattens pages. Text selection, links, forms, and annotations will be removed.</div></>}
            <button onClick={() => void run()} disabled={busy || !items.length} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-700 disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? `${progress}%` : actionLabel}</button>
            {busy && <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} /></div>}
          </div>
        </div>
      )}

      {error && <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"><AlertTriangle className="h-5 w-5 shrink-0" />{error}</div>}
      {output && <div className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/60 dark:bg-emerald-950/20"><div className="flex gap-3"><CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" /><div><div className="font-bold text-emerald-900 dark:text-emerald-200">Ready to download</div><div className="text-xs text-emerald-700 dark:text-emerald-400">{output.summary} · {formatBytes(output.blob.size)}</div></div></div><a href={output.url} download={output.name} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"><Download className="h-4 w-4" /> Download</a></div>}
      <style jsx>{`.control{width:100%;border:1px solid rgb(229 231 235);border-radius:.5rem;background:white;padding:.625rem .75rem;font-size:.875rem;outline:none}.control:focus{box-shadow:0 0 0 2px rgb(59 130 246)}:global(.dark) .control{border-color:rgb(55 65 81);background:rgb(3 7 18);color:white}`}</style>
    </div>
  );
}

function Setting({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block space-y-2"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>{children}</label>; }

async function normalizeImage(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas processing is unavailable.");
    context.fillStyle = "white"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0);
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    return { bytes: await blob.arrayBuffer(), width: image.naturalWidth, height: image.naturalHeight };
  } finally { URL.revokeObjectURL(url); }
}
