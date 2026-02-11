import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Salud
      {
        source: "/calorias",
        destination: "/salud/calculadora-calorias",
        permanent: true,
      },
      {
        source: "/imc",
        destination: "/salud/calculadora-imc",
        permanent: true,
      },
      // Finanzas
      {
        source: "/interes-compuesto",
        destination: "/finanzas/calculadora-interes-compuesto",
        permanent: true,
      },
      {
        source: "/prestamos",
        destination: "/finanzas/calculadora-prestamos",
        permanent: true,
      },
      {
        source: "/dividir-cuenta",
        destination: "/finanzas/calculadora-dividir-cuenta",
        permanent: true,
      },
      // Herramientas de tiempo
      {
        source: "/dias-vividos",
        destination: "/herramientas/calculadora-dias-vividos",
        permanent: true,
      },
      {
        source: "/diferencia-fechas",
        destination: "/herramientas/calculadora-diferencia-fechas",
        permanent: true,
      },
      // Redirect de vida a productividad
      {
        source: "/vida",
        destination: "/productividad",
        permanent: true,
      },
      // Herramientas
      {
        source: "/porcentajes",
        destination: "/herramientas/calculadora-porcentajes",
        permanent: true,
      },
      {
        source: "/conversor-unidades",
        destination: "/herramientas/conversor-unidades",
        permanent: true,
      },
      // Promedio notas eliminado - redirect a herramientas
      {
        source: "/promedio-notas",
        destination: "/herramientas",
        permanent: true,
      },
      // Calculadora de ahorro unificada con meta de ahorro
      {
        source: "/finanzas/calculadora-ahorro",
        destination: "/finanzas/calculadora-meta-ahorro",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
