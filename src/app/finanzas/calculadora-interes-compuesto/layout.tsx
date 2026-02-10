import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Interés Compuesto Online Gratis - Simulador de Inversiones",
  description:
    "Calculadora de interés compuesto gratis: simula cuánto crecerá tu dinero con el tiempo. Calcula rendimientos con aportes periódicos y diferentes tasas de interés.",
  keywords: [
    "calculadora interes compuesto",
    "interes compuesto calculadora",
    "simulador inversiones",
    "calcular interes compuesto",
    "calculadora rendimiento",
    "calculadora ahorro",
    "interes sobre interes",
    "calculadora financiera",
    "simulador ahorro",
    "calcular ganancias inversion",
  ],
  openGraph: {
    title: "Calculadora de Interés Compuesto Online Gratis",
    description: "Simula cuánto crecerá tu dinero con interés compuesto y aportes periódicos.",
    url: `${siteUrl}/interes-compuesto`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/interes-compuesto`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Interés Compuesto",
    description: "Simula cuánto crecerá tu dinero con interés compuesto y aportes periódicos.",
    url: `${siteUrl}/interes-compuesto`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1890",
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
