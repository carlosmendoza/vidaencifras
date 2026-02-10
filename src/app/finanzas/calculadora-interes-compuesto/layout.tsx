import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-interes-compuesto`;

export const metadata: Metadata = {
  title: "Calculadora de Interés Compuesto Online Gratis",
  description:
    "Calcula el interés compuesto de tus inversiones con aportes periódicos. Simula el crecimiento de tu dinero a 5, 10, 20 o 30 años con nuestra calculadora gratuita.",
  keywords: [
    "calculadora interés compuesto",
    "interés compuesto online",
    "calculadora inversiones",
    "simulador interés compuesto",
    "calcular interés compuesto",
    "inversión a largo plazo",
    "rendimiento inversión",
    "aportes periódicos",
    "capitalización compuesta",
  ],
  openGraph: {
    title: "Calculadora de Interés Compuesto Online Gratis",
    description:
      "Simula el crecimiento de tu dinero con interés compuesto. Incluye aportes periódicos y diferentes frecuencias de capitalización.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el interés compuesto?",
    answer:
      "El interés compuesto es el interés que se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores. Es decir, ganas intereses sobre tus intereses, lo que genera un crecimiento exponencial de tu dinero.",
  },
  {
    question: "¿Cuál es la fórmula del interés compuesto?",
    answer:
      "La fórmula básica es: M = C × (1 + r)^t, donde M es el monto final, C es el capital inicial, r es la tasa de interés por período, y t es el número de períodos.",
  },
  {
    question: "¿Qué es la capitalización y por qué importa?",
    answer:
      "La capitalización es la frecuencia con la que se añaden los intereses al capital (mensual, trimestral, anual). A mayor frecuencia de capitalización, mayor será el rendimiento final de tu inversión.",
  },
  {
    question: "¿Los aportes periódicos aumentan el interés compuesto?",
    answer:
      "Sí, hacer aportes periódicos (mensuales, trimestrales, anuales) potencia significativamente el efecto del interés compuesto, ya que cada aporte también genera sus propios intereses.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Interés Compuesto",
    description:
      "Simula cuánto crecerá tu dinero con interés compuesto y aportes periódicos.",
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
