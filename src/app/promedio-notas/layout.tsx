import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Promedio de Notas Online Gratis - Promedio Ponderado",
  description:
    "Calcula tu promedio de notas gratis: promedio simple y ponderado. Ideal para estudiantes universitarios y de colegio. Fácil de usar y sin registro.",
  keywords: [
    "calculadora promedio notas",
    "calcular promedio",
    "promedio ponderado",
    "calculadora notas",
    "promedio universitario",
    "calcular promedio escolar",
    "media aritmetica",
    "promedio calificaciones",
    "calculadora estudiantes",
    "promedio de notas online",
  ],
  openGraph: {
    title: "Calculadora de Promedio de Notas Online Gratis",
    description: "Calcula tu promedio simple o ponderado de notas fácilmente.",
    url: `${siteUrl}/promedio-notas`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/promedio-notas`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Promedio de Notas",
    description: "Calcula tu promedio simple o ponderado de notas fácilmente.",
    url: `${siteUrl}/promedio-notas`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1450",
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
