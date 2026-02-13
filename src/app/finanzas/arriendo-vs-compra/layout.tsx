import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Arriendo vs Compra | ¿Qué Conviene Más?",
  description:
    "Compara si te conviene más arrendar o comprar vivienda. Calcula costos totales, punto de equilibrio y patrimonio final con nuestra calculadora gratuita.",
  keywords: [
    "arriendo vs compra",
    "comprar o arrendar vivienda",
    "arrendar o comprar",
    "calculadora hipoteca",
    "crédito hipotecario",
    "punto de equilibrio vivienda",
    "inversión inmobiliaria",
    "cuota inicial vivienda",
    "alquilar o comprar",
    "rentar o comprar casa",
  ],
  openGraph: {
    title: "Calculadora Arriendo vs Compra - ¿Arrendar o Comprar?",
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
