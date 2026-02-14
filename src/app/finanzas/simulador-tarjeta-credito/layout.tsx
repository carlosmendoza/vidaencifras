import { generarMetadata, CalculatorLayout } from "@/lib/calculator-layout";

const HREF = "/finanzas/simulador-tarjeta-credito";

export const metadata = generarMetadata(HREF);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CalculatorLayout href={HREF}>{children}</CalculatorLayout>;
}
