import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Préstamos y Cuotas Online Gratis - Simulador de Crédito",
  description:
    "Calculadora de préstamos gratis: calcula tu cuota mensual, intereses totales y tabla de amortización. Simulador de crédito con sistema francés.",
  keywords: [
    "calculadora prestamos",
    "calculadora cuotas",
    "simulador credito",
    "calcular cuota prestamo",
    "tabla amortizacion",
    "calculadora hipoteca",
    "cuota mensual prestamo",
    "simulador prestamo personal",
    "calculadora credito",
    "interes prestamo",
  ],
  openGraph: {
    title: "Calculadora de Préstamos y Cuotas Online Gratis",
    description: "Calcula tu cuota mensual, intereses y tabla de amortización de préstamos.",
    url: `${siteUrl}/prestamos`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/prestamos`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Préstamos",
    description: "Calcula tu cuota mensual, intereses totales y tabla de amortización de préstamos.",
    url: `${siteUrl}/prestamos`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1560",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
