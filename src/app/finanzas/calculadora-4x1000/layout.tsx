import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-4x1000`;

export const metadata: Metadata = {
  title: "Calculadora 4x1000 Colombia - Impuesto GMF Online",
  description:
    "Calcula el impuesto 4x1000 (GMF) de cualquier transacción. Descubre cuánto pagas al año y cómo deducirlo de tu declaración de renta.",
  keywords: [
    "calculadora 4x1000",
    "4 por mil",
    "GMF Colombia",
    "impuesto transacciones financieras",
    "gravamen movimientos financieros",
    "cuanto es el 4x1000",
    "calcular 4x1000",
    "exencion 4x1000",
    "impuestos Colombia",
  ],
  openGraph: {
    title: "Calculadora 4x1000 Colombia - Impuesto GMF Online",
    description:
      "Calcula el impuesto 4x1000 de cualquier monto. Incluye deducción de renta.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el 4x1000?",
    answer:
      "El 4x1000 (o GMF - Gravamen a los Movimientos Financieros) es un impuesto colombiano del 0.4% que se cobra sobre cada transacción financiera: retiros, transferencias, pagos con cheque, etc.",
  },
  {
    question: "¿Qué transacciones están exentas del 4x1000?",
    answer:
      "Puedes marcar UNA cuenta de ahorros o corriente como exenta del 4x1000 para retiros hasta 350 UVT mensuales. Los traslados entre cuentas del mismo titular en el mismo banco también están exentos.",
  },
  {
    question: "¿Cómo marco mi cuenta como exenta del 4x1000?",
    answer:
      "Debes solicitar la exención directamente en tu banco. Solo puedes tener UNA cuenta exenta en todo el sistema financiero.",
  },
  {
    question: "¿El 4x1000 se puede deducir de impuestos?",
    answer:
      "Sí. El 50% del GMF pagado durante el año es deducible del impuesto de renta.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora 4x1000",
    description: "Calcula el impuesto 4x1000 (GMF) de transacciones financieras en Colombia.",
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
