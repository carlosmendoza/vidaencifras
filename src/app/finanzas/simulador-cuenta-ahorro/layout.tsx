import { Metadata } from "next";

const CANONICAL_URL = "https://vidaencifras.com/finanzas/simulador-cuenta-ahorro";

export const metadata: Metadata = {
  title: "Comparador de Cuentas de Ahorro Colombia | Mejores Tasas 2025",
  description:
    "Compara las mejores cuentas de ahorro en Colombia: Ualá, Nu, Pibank, Global66 y más. Simula rendimientos con interés compuesto y visualiza cuánto ganas vs guardar bajo el colchón.",
  keywords: [
    "cuentas de ahorro colombia",
    "mejor cuenta de ahorro",
    "comparador cuentas ahorro",
    "ualá colombia",
    "nu colombia cajitas",
    "pibank ahorro",
    "global66",
    "tasas de interés ahorro",
    "simulador ahorro",
    "interés compuesto",
  ],
  openGraph: {
    title: "Comparador de Cuentas de Ahorro Colombia 2025",
    description:
      "Encuentra la mejor cuenta de ahorro en Colombia. Compara tasas de Ualá, Nu, Pibank y más.",
    type: "website",
    url: CANONICAL_URL,
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
};

export default function SimuladorAhorroNuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
