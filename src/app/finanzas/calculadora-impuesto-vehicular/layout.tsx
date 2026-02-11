import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-impuesto-vehicular`;

export const metadata: Metadata = {
  title: "Calculadora de Impuesto Vehicular Colombia 2025 - Todos los Departamentos",
  description:
    "Calcula el impuesto vehicular de tu carro o moto en Colombia. Tarifas por departamento, descuento por pronto pago. Bogotá, Antioquia, Valle y todos los departamentos.",
  keywords: [
    "impuesto vehicular Colombia",
    "calculadora impuesto carro",
    "impuesto moto Colombia",
    "impuesto vehicular Bogotá",
    "impuesto vehicular Antioquia",
    "descuento pronto pago vehicular",
    "tarifas impuesto vehicular 2025",
    "calcular impuesto carro",
    "impuesto automotor Colombia",
    "rodamiento vehicular",
  ],
  openGraph: {
    title: "Calculadora de Impuesto Vehicular Colombia 2025",
    description:
      "Calcula el impuesto de tu vehículo en cualquier departamento de Colombia. Incluye descuento por pronto pago.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo se calcula el impuesto vehicular?",
    answer:
      "El impuesto vehicular se calcula aplicando un porcentaje sobre el valor comercial del vehículo según tablas de la DIAN. Las tarifas varían según el tipo de vehículo (particular, moto, público, carga) y el rango de valor comercial.",
  },
  {
    question: "¿Qué pasa si no pago el impuesto vehicular?",
    answer:
      "Si no pagas el impuesto vehicular, acumulas intereses de mora y sanciones. Además, no podrás realizar trámites como el traspaso del vehículo, renovación de licencia de tránsito, ni pasar la revisión técnico-mecánica.",
  },
  {
    question: "¿Cuánto es el descuento por pronto pago?",
    answer:
      "La mayoría de departamentos ofrecen un descuento del 10% sobre el valor del impuesto si pagas antes de la fecha límite (generalmente en abril o mayo). Algunos departamentos ofrecen descuentos adicionales en los primeros meses del año.",
  },
  {
    question: "¿Dónde consulto el valor comercial de mi vehículo?",
    answer:
      "El valor comercial lo publica el Ministerio de Transporte anualmente en la Resolución de valores comerciales de vehículos. También puedes consultarlo en la página de tu Secretaría de Hacienda departamental.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Impuesto Vehicular Colombia",
    description:
      "Calcula el impuesto vehicular de carros y motos en todos los departamentos de Colombia.",
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
