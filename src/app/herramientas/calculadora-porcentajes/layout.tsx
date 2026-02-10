import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-porcentajes`;

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes Online Gratis",
  description:
    "Calcula cualquier porcentaje fácilmente: porcentaje de un número, qué porcentaje es, aumentos, descuentos y diferencias porcentuales. Rápida y sin registro.",
  keywords: [
    "calculadora porcentajes",
    "calcular porcentaje",
    "porcentaje de descuento",
    "calcular aumento porcentual",
    "qué porcentaje es",
    "diferencia porcentual",
    "porcentaje online",
    "calculadora descuentos",
    "porcentaje de un número",
  ],
  openGraph: {
    title: "Calculadora de Porcentajes Online Gratis",
    description:
      "Calcula porcentajes, descuentos, aumentos y diferencias porcentuales al instante.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo calcular el porcentaje de un número?",
    answer:
      "Para calcular el X% de un número Y, multiplica Y por X y divide entre 100. Ejemplo: el 15% de 200 es (200 × 15) / 100 = 30.",
  },
  {
    question: "¿Cómo saber qué porcentaje es un número de otro?",
    answer:
      "Divide el número menor entre el mayor y multiplica por 100. Ejemplo: para saber qué porcentaje es 30 de 200: (30 / 200) × 100 = 15%.",
  },
  {
    question: "¿Cómo calcular un descuento porcentual?",
    answer:
      "Multiplica el precio original por (1 - descuento/100). Ejemplo: un producto de $100 con 25% de descuento: 100 × (1 - 0.25) = $75.",
  },
  {
    question: "¿Cómo calcular un aumento porcentual?",
    answer:
      "Multiplica el valor original por (1 + aumento/100). Ejemplo: un salario de $1000 con aumento del 10%: 1000 × (1 + 0.10) = $1100.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Porcentajes",
    description:
      "Calcula cualquier porcentaje: % de un número, aumentos, descuentos y diferencia porcentual.",
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
