import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daniel Hurtado — Software Engineer | Backend, Fintech & ML";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#050505",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#00C878",
          }}
        />
        <span
          style={{
            color: "#00C878",
            fontSize: "18px",
            letterSpacing: "3px",
            textTransform: "uppercase" as const,
            fontWeight: 600,
          }}
        >
          danih.dev
        </span>
      </div>

      <h1
        style={{
          color: "#FAFAFA",
          fontSize: "64px",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-2px",
          margin: "0 0 16px 0",
        }}
      >
        Daniel Hurtado
      </h1>

      <p
        style={{
          color: "#A0A0A0",
          fontSize: "28px",
          fontWeight: 400,
          margin: "0 0 40px 0",
        }}
      >
        Software Engineer | Backend, Fintech & ML
      </p>

      <div style={{ display: "flex", gap: "24px" }}>
        {[
          { value: "$300M+", label: "Processed" },
          { value: "4", label: "Regions" },
          { value: "99.9%", label: "Uptime" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 24px",
              border: "1px solid #1a1a1a",
              borderRadius: "8px",
              background: "#0a0a0a",
            }}
          >
            <span
              style={{
                color: "#00C878",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              {stat.value}
            </span>
            <span style={{ color: "#666", fontSize: "14px" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
