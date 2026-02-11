import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-retencion-fuente`;

export const metadata: Metadata = {
  title: "Calculadora de Retención en la Fuente Colombia 2025",
  description:
    "Calcula la retención en la fuente en Colombia. Servicios profesionales, honorarios, compras, arrendamientos. Tasas actualizadas 2025. Calcula el neto a recibir.",
  keywords: [
    "retención en la fuente Colombia",
    "calculadora retención",
    "retefuente servicios",
    "retención honorarios",
    "retención compras",
    "retención arrendamiento",
    "DIAN retención",
    "base retención fuente",
    "porcentaje retención",
    "calcular retención 2025",
  ],
  openGraph: {
    title: "Calculadora de Retención en la Fuente Colombia 2025",
    description:
      "Calcula la retención en la fuente para servicios, honorarios, compras y arriendos. Tasas actualizadas.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es la retención en la fuente?",
    answer:
      "La retención en la fuente es un mecanismo de recaudo anticipado del impuesto de renta. El pagador (agente retenedor) descuenta un porcentaje del pago y lo transfiere a la DIAN a nombre del beneficiario del pago.",
  },
  {
    question: "¿Cuándo aplica la retención en la fuente?",
    answer:
      "Aplica cuando el pagador es agente retenedor (empresas o personas con ingresos superiores a ciertos topes) y el pago supera las bases mínimas establecidas por la DIAN para cada concepto.",
  },
  {
    question: "¿Qué pasa si soy declarante de renta?",
    answer:
      "Si eres declarante de renta, las tasas de retención suelen ser menores. Por ejemplo, en servicios profesionales la tasa es del 10% en lugar del 11% para no declarantes.",
  },
  {
    question: "¿Puedo recuperar la retención en la fuente?",
    answer:
      "Sí, la retención se cruza con tu impuesto de renta al presentar la declaración anual. Si te retuvieron más de lo que debes pagar, puedes solicitar devolución del saldo a favor.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Retención en la Fuente Colombia",
    description:
      "Calcula la retención en la fuente para servicios, honorarios, compras y arrendamientos en Colombia.",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
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
