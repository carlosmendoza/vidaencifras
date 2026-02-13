import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de CDT Colombia 2026 | Mejores Tasas y Rendimientos",
  description:
    "Compara tasas de CDT en Colombia (febrero 2026). Encuentra los mejores rendimientos de bancos como Bancolombia, Davivienda, Nu, Tuya, Bold y más. Simulador gratuito.",
  keywords: [
    "CDT colombia",
    "mejores CDT 2026",
    "tasas CDT",
    "comparador CDT",
    "simulador CDT",
    "rendimiento CDT",
    "inversión CDT",
    "certificado depósito término",
    "mejores CDT febrero 2026",
    "tasas CDT Colombia hoy",
  ],
  openGraph: {
    title: "Comparador de CDT Colombia 2026",
    description:
      "Encuentra el CDT con mejor tasa en febrero 2026. Compara rendimientos de los principales bancos en Colombia.",
    type: "website",
  },
};

export default function ComparadorCDTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
