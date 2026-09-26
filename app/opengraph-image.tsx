import { ImageResponse } from "next/og";

export const alt = "DevKitLab - Free Online Tools for Everyday Work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72, background: "#f8fafc", color: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: 16, background: "#0f172a", color: "white" }}>D</div>DevKitLab</div>
      <div style={{ marginTop: 52, maxWidth: 940, fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>Free online tools for everyday work</div>
      <div style={{ marginTop: 30, fontSize: 28, color: "#475569" }}>Developers · Creators · Businesses · Students · Everyone</div>
    </div>,
    size
  );
}
