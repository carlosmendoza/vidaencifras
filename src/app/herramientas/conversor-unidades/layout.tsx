import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/conversor-unidades`;

export const metadata: Metadata = {
  title: "Conversor de Unidades Online: Longitud, Peso, Temperatura",
  description:
    "Convierte entre diferentes unidades de medida: metros a pies, kilogramos a libras, Celsius a Fahrenheit y más. Conversor rápido y preciso.",
  keywords: [
    "conversor unidades",
    "convertir metros a pies",
    "kilogramos a libras",
    "celsius a fahrenheit",
    "conversor de medidas",
    "convertir unidades online",
    "pulgadas a centímetros",
    "millas a kilómetros",
    "conversor temperatura",
  ],
  openGraph: {
    title: "Conversor de Unidades Online",
    description:
      "Convierte longitud, peso, temperatura y más. Herramienta rápida y gratuita.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuántos centímetros hay en una pulgada?",
    answer:
      "Una pulgada equivale a 2.54 centímetros exactos. Para convertir pulgadas a centímetros, multiplica por 2.54. Para el inverso, divide entre 2.54.",
  },
  {
    question: "¿Cómo convertir Celsius a Fahrenheit?",
    answer:
      "Usa la fórmula: °F = (°C × 9/5) + 32. Por ejemplo, 25°C = (25 × 9/5) + 32 = 77°F. Para el inverso: °C = (°F - 32) × 5/9.",
  },
  {
    question: "¿Cuántos kilogramos hay en una libra?",
    answer:
      "Una libra equivale a 0.453592 kilogramos. Para convertir libras a kg, multiplica por 0.4536. Un kilogramo equivale a 2.205 libras.",
  },
  {
    question: "¿Cuántos kilómetros hay en una milla?",
    answer:
      "Una milla equivale a 1.60934 kilómetros. Para convertir millas a km, multiplica por 1.609. Un kilómetro equivale a 0.621 millas.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Conversor de Unidades",
    description:
      "Convierte entre diferentes unidades de longitud, peso, temperatura, volumen y más.",
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
