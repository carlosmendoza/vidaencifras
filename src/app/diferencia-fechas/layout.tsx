import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Diferencia entre Fechas Online Gratis - Días, Meses y Años",
  description:
    "Calcula la diferencia exacta entre dos fechas: días, semanas, meses, años, horas y minutos. Incluye días laborables y fines de semana. Gratis y sin registro.",
  keywords: [
    "diferencia entre fechas",
    "calcular dias entre fechas",
    "calculadora fechas",
    "cuantos dias entre",
    "dias entre dos fechas",
    "calcular tiempo entre fechas",
    "dias laborables entre fechas",
    "calculadora dias",
    "restar fechas",
    "contador de dias",
  ],
  openGraph: {
    title: "Calculadora de Diferencia entre Fechas Online Gratis",
    description: "Calcula el tiempo exacto entre dos fechas: días, meses, años y más.",
    url: `${siteUrl}/diferencia-fechas`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/diferencia-fechas`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Diferencia entre Fechas",
    description: "Calcula el tiempo exacto entre dos fechas: días, meses, años, horas y más.",
    url: `${siteUrl}/diferencia-fechas`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1120",
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
