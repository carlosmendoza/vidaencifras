import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador Cajita Nu vs Colchón | Calculadora de Ahorro Colombia",
  description:
    "Compara cuánto crece tu dinero en la Cajita de Nu vs guardarlo bajo el colchón. Visualiza el efecto de la inflación y el interés compuesto con gráficas interactivas.",
  keywords: [
    "cajita nu",
    "nubank colombia",
    "ahorro nu",
    "simulador ahorro",
    "inflación colombia",
    "interés compuesto",
    "dinero bajo el colchón",
    "cuenta de ahorros",
    "rendimiento ahorro",
  ],
  openGraph: {
    title: "Simulador Cajita Nu vs Colchón",
    description:
      "¿Cuánto pierdes guardando dinero bajo el colchón? Compara con la Cajita de Nu y visualiza la diferencia.",
    type: "website",
  },
};

export default function SimuladorAhorroNuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
