import { ImageResponse } from "next/og";

export const alt = "Stonehenge Trust — ISO, ACD & EPA Compliance for Industrial Operators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #061523 0%, #0F2A44 55%, #091B2C 100%)",
          color: "#FAFAF6",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#E5E2D8",
          }}
        >
          <div style={{ width: 12, height: 12, background: "#8A9970" }} />
          Stonehenge Trust
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            <div style={{ display: "flex" }}>Compliance,</div>
            <div style={{ display: "flex", color: "#8A9970" }}>
              built to hold.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#E5E2D8",
              maxWidth: 940,
              lineHeight: 1.35,
            }}
          >
            ISO 9001 / 14001 / 45001 · ACD Responsible Distribution · EPA regulatory programs — a boutique partner for chemical distributors, manufacturers, and bulk handlers.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#E5E2D8",
          }}
        >
          <div>EHS&S · United States</div>
          <div>stonehengetrust.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
