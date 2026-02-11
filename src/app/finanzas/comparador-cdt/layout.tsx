import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de CDT Colombia 2025 | Mejores Tasas y Rendimientos",
  description:
    "Compara tasas de CDT en Colombia. Encuentra los mejores rendimientos de bancos como Bancolombia, Davivienda, Nu, Pibank y más. Simulador gratuito.",
  keywords: [
    "CDT colombia",
    "mejores CDT 2025",
    "tasas CDT",
    "comparador CDT",
    "simulador CDT",
    "rendimiento CDT",
    "inversión CDT",
    "certificado depósito término",
  ],
  openGraph: {
    title: "Comparador de CDT Colombia 2025",
    description:
      "Encuentra el CDT con mejor tasa. Compara rendimientos de los principales bancos en Colombia.",
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
