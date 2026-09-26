"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Download,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  Unlock,
  UploadCloud,
} from "lucide-react";
import { ToolMetadata } from "@/types/tool";

interface ImageToolShellProps {
  tool: ToolMetadata;
}

interface LoadedImage {
  file: File;
  url: string;
  width: number;
  height: number;
}

interface ProcessedImage {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  mimeType: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unit).toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`;
};

const extensionFor = (mimeType: string) => {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  return "webp";
};

export default function ImageToolShell({ tool }: ImageToolShellProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<LoadedImage | null>(null);
  const [result, setResult] = useState<ProcessedImage | null>(null);
  const [format, setFormat] = useState("image/webp");
  const [quality, setQuality] = useState(82);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [locked, setLocked] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const isResizer = tool.slug === "image-resizer";
  const actionLabel = tool.slug === "image-compressor" ? "Compress image" : tool.slug === "image-converter" ? "Convert image" : "Resize image";

  useEffect(() => {
    const sourceUrl = source?.url;
    return () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    };
  }, [source?.url]);

  useEffect(() => {
    const resultUrl = result?.url;
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [result?.url]);

  const clearResult = () => {
    setResult((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
  };

  const loadFile = (file?: File) => {
    setError("");
    if (!file) return;
    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("This image is larger than 25 MB. Choose a smaller file.");
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setSource((current) => {
        if (current?.url) URL.revokeObjectURL(current.url);
        return { file, url, width: image.naturalWidth, height: image.naturalHeight };
      });
      clearResult();
      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
      setFormat(tool.slug === "image-converter" ? (file.type === "image/png" ? "image/webp" : "image/png") : "image/webp");
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("The browser could not read this image. It may be damaged or unsupported.");
    };
    image.src = url;
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    loadFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    loadFile(event.dataTransfer.files?.[0]);
  };

  const updateWidth = (value: number) => {
    const next = Math.min(Math.max(value || 1, 1), 12000);
    setWidth(next);
    if (locked && source) setHeight(Math.max(1, Math.round(next / (source.width / source.height))));
    clearResult();
  };

  const updateHeight = (value: number) => {
    const next = Math.min(Math.max(value || 1, 1), 12000);
    setHeight(next);
    if (locked && source) setWidth(Math.max(1, Math.round(next * (source.width / source.height))));
    clearResult();
  };

  const processImage = async () => {
    if (!source) return;
    setIsProcessing(true);
    setError("");
    clearResult();

    try {
      const image = new Image();
      image.src = source.url;
      await image.decode();

      const outputWidth = isResizer ? width : source.width;
      const outputHeight = isResizer ? height : source.height;
      if (!outputWidth || !outputHeight || outputWidth > 12000 || outputHeight > 12000) {
        throw new Error("Width and height must be between 1 and 12,000 pixels.");
      }

      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas processing is unavailable in this browser.");

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      if (format === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, outputWidth, outputHeight);
      }
      context.drawImage(image, 0, 0, outputWidth, outputHeight);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (value) => value ? resolve(value) : reject(new Error("The browser could not export this image.")),
          format,
          quality / 100
        );
      });

      const resultUrl = URL.createObjectURL(blob);
      setResult({ blob, url: resultUrl, width: outputWidth, height: outputHeight, mimeType: format });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Image processing failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!source || !result) return;
    const anchor = document.createElement("a");
    const baseName = source.file.name.replace(/\.[^.]+$/, "");
    anchor.href = result.url;
    anchor.download = `${baseName}-${tool.slug.replace("image-", "")}.${extensionFor(result.mimeType)}`;
    anchor.click();
  };

  const reset = () => {
    setSource((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
    clearResult();
    setError("");
    setWidth(0);
    setHeight(0);
  };

  const savings = source && result ? Math.round((1 - result.blob.size / source.file.size) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="h-5 w-5" />
          Your image stays on this device
        </div>
        <span className="text-xs text-emerald-700 dark:text-emerald-400">JPG, PNG or WebP · up to 25 MB</span>
      </div>

      {!source ? (
        <div
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${isDragging ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30" : "border-gray-300 bg-gray-50 hover:border-brand-400 dark:border-gray-700 dark:bg-gray-900/50"}`}
          onClick={() => inputRef.current?.click()}
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Drop an image here</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">or click to choose one from your device</p>
          <button type="button" className="mt-6 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
            Choose image
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <PreviewCard label="Original" url={source.url} details={`${source.width} × ${source.height} · ${formatBytes(source.file.size)}`} />
              {result ? (
                <PreviewCard label="Result" url={result.url} details={`${result.width} × ${result.height} · ${formatBytes(result.blob.size)}`} />
              ) : (
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-900/50">
                  <ImageIcon className="mb-3 h-8 w-8" />
                  <span className="text-sm">Your result will appear here</span>
                </div>
              )}
            </div>

            {result && (
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <Metric label="Original" value={formatBytes(source.file.size)} />
                <Metric label="Result" value={formatBytes(result.blob.size)} />
                <Metric label={savings >= 0 ? "Smaller" : "Change"} value={`${savings >= 0 ? savings : Math.abs(savings)}%`} accent={savings > 0} />
              </div>
            )}
          </div>

          <div className="h-fit space-y-5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><SlidersHorizontal className="h-4 w-4" /> Settings</div>
              <button onClick={reset} className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30" title="Remove image"><Trash2 className="h-4 w-4" /></button>
            </div>

            {isResizer && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Dimensions</label>
                  <button onClick={() => setLocked(!locked)} className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                    {locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />} {locked ? "Ratio locked" : "Ratio unlocked"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <NumberField label="Width" value={width} onChange={updateWidth} />
                  <NumberField label="Height" value={height} onChange={updateHeight} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Output format</label>
              <select value={format} onChange={(event) => { setFormat(event.target.value); clearResult(); }} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                <option value="image/webp">WebP</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500"><span>Quality</span><span>{format === "image/png" ? "Lossless" : `${quality}%`}</span></div>
              <input type="range" min="10" max="100" step="1" value={quality} disabled={format === "image/png"} onChange={(event) => { setQuality(Number(event.target.value)); clearResult(); }} className="w-full accent-brand-600 disabled:opacity-40" />
            </div>

            <button onClick={processImage} disabled={isProcessing} className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-70">
              {isProcessing ? "Processing…" : actionLabel}
            </button>
            {result && (
              <button onClick={downloadResult} className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-700 hover:bg-brand-100 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-300">
                <Download className="h-4 w-4" /> Download result
              </button>
            )}
          </div>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleInput} className="hidden" />
      {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}
    </div>
  );
}

function PreviewCard({ label, url, details }: { label: string; url: string; details: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span>
        <span className="text-xs text-gray-500">{details}</span>
      </div>
      <div className="flex min-h-[240px] items-center justify-center bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] p-4 dark:bg-gray-900">
        {/* Canvas-generated object URLs cannot use Next Image optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={`${label} preview`} className="max-h-[360px] max-w-full rounded object-contain shadow-sm" />
      </div>
    </div>
  );
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div><div className={`text-base font-bold ${accent ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>{value}</div><div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div></div>;
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="space-y-1 text-xs text-gray-500"><span>{label} (px)</span><input type="number" min="1" max="12000" value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white" /></label>;
}
