import { generarMetadata, CalculatorLayout } from "@/lib/calculator-layout";

const HREF = "/salud/calculadora-hidratacion";

export const metadata = generarMetadata(HREF);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CalculatorLayout href={HREF}>{children}</CalculatorLayout>;
}
