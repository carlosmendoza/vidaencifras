import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Arriendo vs Compra | ¿Qué Conviene Más en Colombia?",
  description:
    "Compara si te conviene más arrendar o comprar vivienda en Colombia. Calcula costos totales, punto de equilibrio y patrimonio final con nuestra calculadora gratuita.",
  keywords: [
    "arriendo vs compra",
    "comprar vivienda colombia",
    "arrendar o comprar",
    "calculadora hipoteca",
    "crédito hipotecario colombia",
    "punto de equilibrio vivienda",
    "inversión inmobiliaria",
    "cuota inicial vivienda",
  ],
  openGraph: {
    title: "Calculadora Arriendo vs Compra Colombia",
    description:
      "¿Arrendar o comprar? Calcula cuál opción te conviene más según tu situación financiera.",
    type: "website",
  },
};

export default function ArriendoVsCompraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
