import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
    ];
  },
};

export default nextConfig;
