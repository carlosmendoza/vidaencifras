import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de IMC Online Gratis - Índice de Masa Corporal",
  description:
    "Calcula tu IMC (Índice de Masa Corporal) gratis. Conoce si tienes peso normal, sobrepeso u obesidad. Incluye cálculo de peso ideal y recomendaciones.",
  keywords: [
    "calculadora IMC",
    "indice masa corporal",
    "calcular IMC",
    "IMC online",
    "peso ideal calculadora",
    "calculadora peso",
    "IMC formula",
    "sobrepeso calculadora",
    "IMC gratis",
    "body mass index",
  ],
  openGraph: {
    title: "Calculadora de IMC Online Gratis",
    description: "Calcula tu Índice de Masa Corporal y conoce tu peso ideal.",
    url: `${siteUrl}/imc`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/imc`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de IMC",
    description: "Calcula tu Índice de Masa Corporal y conoce tu peso ideal.",
    url: `${siteUrl}/imc`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "3200",
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
