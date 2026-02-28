import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const categoryColors: Record<string, { bg: string; accent: string }> = {
  salud: { bg: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%)", accent: "#ef4444" },
  finanzas: { bg: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #14b8a6 100%)", accent: "#14b8a6" },
  productividad: { bg: "linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #f97316 100%)", accent: "#f97316" },
  herramientas: { bg: "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #a855f7 100%)", accent: "#a855f7" },
};

const defaultColors = {
  bg: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)",
  accent: "#4f46e5",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  const category = searchParams.get("category");

  // Si no hay título, devolver la OG genérica del sitio
  if (!title) {
    return generateDefaultOG();
  }

  const colors = (category && categoryColors[category]) || defaultColors;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.bg,
          fontFamily: "system-ui, sans-serif",
          padding: 60,
        }}
      >
        {/* Header: Logo + marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>VC</span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "-0.02em",
            }}
          >
            VidaEnCifras
          </span>
        </div>

        {/* Título de la calculadora */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: title.length > 40 ? 48 : 56,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {title}
          </span>
          {category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  padding: "8px 20px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 999,
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {category}
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 999,
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                100% Gratis
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            vidaencifras.com
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                padding: "6px 16px",
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: 999,
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Sin Registro
            </span>
            <span
              style={{
                padding: "6px 16px",
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: 999,
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Privado
            </span>
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

function generateDefaultOG() {
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
