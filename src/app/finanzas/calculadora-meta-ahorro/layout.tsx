import { Metadata } from "next";

const CANONICAL_URL = "https://vidaencifras.com/finanzas/calculadora-meta-ahorro";

export const metadata: Metadata = {
  title: "Calculadora de Meta de Ahorro | ¿Cuánto Ahorrar Mensualmente?",
  description:
    "Calcula cuánto debes ahorrar cada mes para alcanzar tu meta. Compara entre Ualá, Nu, Pibank y más cuentas de ahorro en Colombia. Incluye interés compuesto.",
  keywords: [
    "meta de ahorro",
    "cuánto ahorrar mensualmente",
    "calculadora ahorro mensual",
    "plan de ahorro colombia",
    "objetivo de ahorro",
    "ahorro programado",
    "interés compuesto ahorro",
    "fondo de emergencia",
  ],
  openGraph: {
    title: "Calculadora de Meta de Ahorro Colombia",
    description:
      "Descubre cuánto debes ahorrar cada mes para alcanzar tu objetivo financiero.",
    type: "website",
    url: CANONICAL_URL,
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
};

export default function CalculadoraMetaAhorroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
