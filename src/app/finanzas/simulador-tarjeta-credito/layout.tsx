import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/simulador-tarjeta-credito`;

export const metadata: Metadata = {
  title: "Simulador de Tarjeta de Crédito Colombia - Pago Mínimo vs Cuota Fija",
  description:
    "Simula el pago de tu tarjeta de crédito en Colombia. Compara pagar el mínimo vs cuota fija. Calcula meses para saldar deuda y ahorro en intereses.",
  keywords: [
    "simulador tarjeta de crédito",
    "pago mínimo tarjeta",
    "calcular intereses tarjeta",
    "cuota fija tarjeta crédito",
    "deuda tarjeta de crédito",
    "cómo pagar tarjeta rápido",
    "interés tarjeta Colombia",
    "tasa usura Colombia",
    "comparar pagos tarjeta",
    "saldar deuda tarjeta",
  ],
  openGraph: {
    title: "Simulador de Tarjeta de Crédito Colombia - Pago Mínimo vs Cuota Fija",
    description:
      "Compara pagar el mínimo vs cuota fija en tu tarjeta de crédito. Calcula cuánto ahorras en intereses.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Por qué es malo pagar solo el mínimo de la tarjeta?",
    answer:
      "Pagar solo el mínimo puede tardar años en saldar la deuda y terminas pagando varias veces el monto original en intereses. El mínimo apenas cubre los intereses del mes, por lo que el capital casi no se reduce.",
  },
  {
    question: "¿Cuál es la tasa de usura en Colombia?",
    answer:
      "La tasa de usura es el máximo interés legal que pueden cobrar las entidades financieras. Para 2025, ronda entre el 28% y 32% efectivo anual para tarjetas de crédito. La Superfinanciera la actualiza mensualmente.",
  },
  {
    question: "¿Cómo se calcula el pago mínimo de la tarjeta?",
    answer:
      "El pago mínimo generalmente es un porcentaje del saldo (2% a 5%) más los intereses del período. Esto asegura que cubras los intereses pero reduzcas muy poco el capital.",
  },
  {
    question: "¿Cuánto debería pagar de mi tarjeta cada mes?",
    answer:
      "Lo ideal es pagar el total facturado para no generar intereses. Si no es posible, paga lo máximo que puedas. Una cuota fija superior al mínimo te ahorrará meses de pago e intereses significativos.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulador de Tarjeta de Crédito Colombia",
    description:
      "Simula el pago de tu tarjeta de crédito comparando pago mínimo vs cuota fija. Calcula ahorro en intereses.",
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
