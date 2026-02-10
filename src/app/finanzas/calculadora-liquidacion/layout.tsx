import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-liquidacion`;

export const metadata: Metadata = {
  title: "Calculadora de Liquidación Laboral 2024 Colombia",
  description:
    "Calcula tu liquidación laboral completa: prima, cesantías, intereses, vacaciones e indemnización por despido. Actualizada 2024.",
  keywords: [
    "calculadora liquidacion",
    "liquidacion laboral Colombia",
    "calcular liquidacion",
    "indemnizacion despido",
    "prima cesantias vacaciones",
    "liquidacion 2024",
    "cuanto me toca de liquidacion",
    "despido sin justa causa",
    "liquidacion contrato",
  ],
  openGraph: {
    title: "Calculadora de Liquidación Laboral 2024 Colombia",
    description:
      "Calcula tu liquidación completa: prima, cesantías, vacaciones e indemnización.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué incluye la liquidación laboral?",
    answer:
      "La liquidación incluye: prima de servicios, cesantías, intereses sobre cesantías, vacaciones no disfrutadas. Si el despido es sin justa causa, también incluye indemnización.",
  },
  {
    question: "¿Cuándo me deben pagar la liquidación?",
    answer:
      "El empleador debe pagar la liquidación al momento de terminar el contrato. Si no paga, debe pagar un día de salario por cada día de mora.",
  },
  {
    question: "¿Cómo se calcula la indemnización?",
    answer:
      "Para contratos indefinidos: 30 días por el primer año + 20 días por cada año adicional. Para salarios altos, los días adicionales son 15.",
  },
  {
    question: "¿Si renuncio tengo derecho a indemnización?",
    answer:
      "No. La indemnización solo aplica cuando el empleador termina el contrato sin justa causa.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Liquidación Laboral",
    description: "Calcula tu liquidación laboral completa en Colombia.",
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
