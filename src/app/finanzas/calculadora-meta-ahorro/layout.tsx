import { Metadata } from "next";

const CANONICAL_URL = "https://vidaencifras.com/finanzas/calculadora-meta-ahorro";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro | Meta, Tiempo y Tasa Personalizada",
  description:
    "Calcula cuánto ahorrar mensualmente o cuánto tiempo necesitas para tu meta. Compara Ualá, Nu, Pibank y más cuentas en Colombia. Opción sin rendimiento y tasa personalizada.",
  keywords: [
    "calculadora ahorro",
    "meta de ahorro",
    "cuánto ahorrar mensualmente",
    "cuánto tiempo ahorrar",
    "calculadora ahorro mensual",
    "plan de ahorro colombia",
    "objetivo de ahorro",
    "ahorro programado",
    "interés compuesto ahorro",
    "fondo de emergencia",
    "ahorro sin intereses",
    "alcancía",
    "ahorro efectivo",
  ],
  openGraph: {
    title: "Calculadora de Ahorro Colombia | Meta y Tiempo",
    description:
      "Descubre cuánto ahorrar o cuánto tiempo necesitas para alcanzar tu meta. Compara cuentas o usa tu propia tasa.",
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
