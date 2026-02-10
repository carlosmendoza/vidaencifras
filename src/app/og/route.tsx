import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 800, color: "white" }}>VC</span>
          </div>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.05em",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            VidaEnCifras
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 36,
              color: "rgba(255, 255, 255, 0.95)",
              fontWeight: 600,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Calculadoras Online Gratis
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 500,
            }}
          >
            Finanzas · Salud · Productividad
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 999,
              color: "white",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            100% Gratis
          </div>
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 999,
              color: "white",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Sin Registro
          </div>
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: 999,
              color: "white",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Privado
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
