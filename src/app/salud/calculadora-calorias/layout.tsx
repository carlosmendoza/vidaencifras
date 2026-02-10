import { Metadata } from "next";

const siteUrl = "https://calculatodo.app";

export const metadata: Metadata = {
  title: "Calculadora de Calorías TDEE Online Gratis - Gasto Calórico Diario",
  description:
    "Calcula tu TDEE (gasto calórico diario), TMB y macronutrientes gratis. Calculadora de calorías personalizada según tu edad, peso, altura y nivel de actividad.",
  keywords: [
    "calculadora calorias",
    "TDEE calculadora",
    "calculadora gasto calorico",
    "TMB calculadora",
    "metabolismo basal",
    "cuantas calorias necesito",
    "calculadora macros",
    "calorias diarias",
    "calculadora deficit calorico",
    "calorias para bajar de peso",
  ],
  openGraph: {
    title: "Calculadora de Calorías TDEE Online Gratis",
    description: "Calcula tu gasto calórico diario (TDEE), metabolismo basal y macronutrientes.",
    url: `${siteUrl}/calorias`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/calorias`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Calorías TDEE",
    description: "Calcula tu gasto calórico diario, metabolismo basal y macronutrientes personalizados.",
    url: `${siteUrl}/calorias`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2340",
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
