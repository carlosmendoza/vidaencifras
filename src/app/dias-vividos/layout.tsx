import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Días Vividos Online Gratis - Edad Exacta en Días",
  description:
    "Descubre cuántos días has vivido desde tu nacimiento. Calcula tu edad exacta en días, horas, minutos, semanas y meses. Incluye signo zodiacal y generación.",
  keywords: [
    "dias vividos",
    "cuantos dias tengo",
    "calculadora edad",
    "edad en dias",
    "cuantos dias he vivido",
    "calculadora dias vividos",
    "mi edad en dias",
    "horas vividas",
    "edad exacta",
    "calculadora cumpleaños",
  ],
  openGraph: {
    title: "Calculadora de Días Vividos Online Gratis",
    description: "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento.",
    url: `${siteUrl}/dias-vividos`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/dias-vividos`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Días Vividos",
    description: "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento.",
    url: `${siteUrl}/dias-vividos`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "890",
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
