import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Impuesto de Renta Colombia 2025 | Personas Naturales",
  description:
    "Calcula tu impuesto de renta en Colombia para personas naturales. Incluye tabla de tarifas actualizada, deducciones y retención en la fuente.",
  keywords: [
    "impuesto de renta colombia",
    "calculadora renta 2025",
    "declaración de renta",
    "personas naturales",
    "tabla impuesto renta",
    "UVT 2025",
    "retención en la fuente",
    "deducciones renta",
  ],
  openGraph: {
    title: "Calculadora Impuesto de Renta Colombia 2025",
    description:
      "Calcula cuánto debes pagar de impuesto de renta según tus ingresos. Incluye tabla de tarifas y deducciones.",
    type: "website",
  },
};

export default function ImpuestoRentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
