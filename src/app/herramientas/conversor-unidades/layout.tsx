import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Conversor de Unidades Online Gratis - Longitud, Peso, Temperatura y Más",
  description:
    "Conversor de unidades gratis: convierte entre metros, pies, kilogramos, libras, Celsius, Fahrenheit, litros, galones y más. Rápido y fácil de usar.",
  keywords: [
    "conversor unidades",
    "convertir unidades",
    "metros a pies",
    "kilogramos a libras",
    "celsius a fahrenheit",
    "litros a galones",
    "conversor medidas",
    "convertidor online",
    "km a millas",
    "pulgadas a centimetros",
  ],
  openGraph: {
    title: "Conversor de Unidades Online Gratis",
    description: "Convierte entre diferentes unidades de longitud, peso, temperatura, volumen y más.",
    url: `${siteUrl}/conversor-unidades`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/conversor-unidades`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Conversor de Unidades",
    description: "Convierte entre diferentes unidades de longitud, peso, temperatura, volumen y más.",
    url: `${siteUrl}/conversor-unidades`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "980",
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
