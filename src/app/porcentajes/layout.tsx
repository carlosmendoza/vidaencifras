import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online Gratis - Calcular %, Aumento y Descuento",
  description:
    "Calculadora de porcentajes gratis: calcula el % de un número, qué porcentaje es X de Y, aumentos, descuentos y diferencia porcentual. Fácil, rápida y sin registro.",
  keywords: [
    "calculadora porcentajes",
    "calcular porcentaje",
    "porcentaje de un numero",
    "calculadora descuento",
    "calcular aumento porcentual",
    "diferencia porcentual",
    "que porcentaje es",
    "calculadora % online",
    "porcentaje gratis",
  ],
  openGraph: {
    title: "Calculadora de Porcentajes Online Gratis",
    description: "Calcula cualquier porcentaje: % de un número, aumentos, descuentos y más.",
    url: `${siteUrl}/porcentajes`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/porcentajes`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Porcentajes",
    description: "Calcula cualquier porcentaje: % de un número, aumentos, descuentos y diferencia porcentual.",
    url: `${siteUrl}/porcentajes`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
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
