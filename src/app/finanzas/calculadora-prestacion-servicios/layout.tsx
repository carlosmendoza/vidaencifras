import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-prestacion-servicios`;

export const metadata: Metadata = {
  title: "Calculadora Prestación de Servicios 2026 Colombia | Independientes",
  description:
    "Calcula tus ingresos netos como independiente: retención en la fuente, aportes a salud, pensión y ARL. Actualizada con valores 2026 Colombia.",
  keywords: [
    "calculadora prestacion servicios",
    "calculadora independientes Colombia",
    "cuenta de cobro calculadora",
    "retencion en la fuente honorarios",
    "aportes seguridad social independientes",
    "IBC independientes",
    "salud pension independientes",
    "contrato prestacion servicios",
    "honorarios Colombia 2026",
    "calculadora freelancer Colombia",
  ],
  openGraph: {
    title: "Calculadora Prestación de Servicios 2026 Colombia",
    description:
      "Calcula tus ingresos netos como independiente: retención, salud, pensión y ARL.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el IBC (Ingreso Base de Cotización)?",
    answer:
      "El IBC es la base sobre la cual se calculan los aportes a seguridad social. Para independientes, corresponde al 40% del valor mensual del contrato.",
  },
  {
    question: "¿Cuánto debo pagar de seguridad social como independiente?",
    answer:
      "Debes pagar el 28.5% de tu IBC: 12.5% para salud y 16% para pensión. Además, dependiendo del riesgo, debes aportar a ARL.",
  },
  {
    question: "¿Cuál es la diferencia entre retención del 10% y 11%?",
    answer:
      "Si eres declarante de renta, la retención es del 11%. Si no eres declarante, la retención es del 10%.",
  },
  {
    question: "¿Los aportes a seguridad social son deducibles?",
    answer:
      "Sí, los aportes obligatorios a salud y pensión son 100% deducibles en tu declaración de renta.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora Prestación de Servicios Colombia",
    description: "Calcula tus ingresos netos como trabajador independiente en Colombia.",
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
