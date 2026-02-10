import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-cesantias`;

export const metadata: Metadata = {
  title: "Calculadora de Cesantías 2026 Colombia - Cesantías e Intereses",
  description:
    "Calcula tus cesantías e intereses sobre cesantías 2026. Incluye auxilio de transporte y cálculo proporcional por días trabajados.",
  keywords: [
    "calculadora cesantias",
    "cesantias 2026",
    "calcular cesantias Colombia",
    "intereses cesantias",
    "formula cesantias",
    "liquidacion cesantias",
    "fondo cesantias",
    "retiro cesantias",
    "cesantias proporcionales",
  ],
  openGraph: {
    title: "Calculadora de Cesantías 2024 Colombia",
    description:
      "Calcula tus cesantías e intereses. Incluye auxilio de transporte.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué son las cesantías?",
    answer:
      "Las cesantías son una prestación social equivalente a un mes de salario por cada año trabajado. Se pueden usar para vivienda, educación o al terminar el contrato.",
  },
  {
    question: "¿Cuándo se consignan las cesantías?",
    answer:
      "El empleador debe consignar las cesantías al fondo antes del 14 de febrero de cada año.",
  },
  {
    question: "¿Puedo retirar mis cesantías antes de renunciar?",
    answer:
      "Sí, puedes hacer retiros parciales para vivienda o educación, con autorización del empleador.",
  },
  {
    question: "¿Qué son los intereses sobre cesantías?",
    answer:
      "Son un pago adicional del 12% anual sobre las cesantías. El empleador debe pagarlos directamente al trabajador antes del 31 de enero.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Cesantías",
    description: "Calcula tus cesantías e intereses sobre cesantías en Colombia.",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "COP",
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
