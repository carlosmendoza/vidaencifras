import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-prima`;

export const metadata: Metadata = {
  title: "Calculadora de Prima 2024 Colombia - Calcula tu Prima de Servicios",
  description:
    "Calcula tu prima de servicios de junio y diciembre 2024. Incluye auxilio de transporte y días proporcionales. Fórmula oficial actualizada.",
  keywords: [
    "calculadora prima",
    "prima de servicios 2024",
    "calcular prima Colombia",
    "prima junio",
    "prima diciembre",
    "prima proporcional",
    "auxilio transporte prima",
    "como calcular prima",
    "formula prima servicios",
  ],
  openGraph: {
    title: "Calculadora de Prima 2024 Colombia",
    description:
      "Calcula tu prima de servicios. Incluye auxilio de transporte y cálculo proporcional.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es la prima de servicios?",
    answer:
      "La prima de servicios es una prestación social equivalente a un mes de salario al año, pagada en dos cuotas: junio y diciembre.",
  },
  {
    question: "¿Quiénes tienen derecho a la prima?",
    answer:
      "Todos los trabajadores con contrato laboral, incluyendo empleadas domésticas. Los contratistas por prestación de servicios no tienen derecho.",
  },
  {
    question: "¿El auxilio de transporte se incluye en la prima?",
    answer:
      "Sí. Si ganas hasta 2 SMMLV y recibes auxilio de transporte, este se suma al salario para calcular la prima.",
  },
  {
    question: "¿Cuándo se paga la prima?",
    answer:
      "La prima de junio se paga máximo el 30 de junio. La de diciembre máximo el 20 de diciembre.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Prima de Servicios",
    description: "Calcula tu prima de servicios de junio y diciembre en Colombia.",
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
