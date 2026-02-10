import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-ahorro`;

export const metadata: Metadata = {
  title: "Calculadora de Ahorro - Planifica tus Metas Financieras",
  description:
    "Calcula cuánto necesitas ahorrar mensualmente para alcanzar tus metas. Planifica vacaciones, cuota inicial, fondo de emergencia y más.",
  keywords: [
    "calculadora ahorro",
    "como ahorrar dinero",
    "meta de ahorro",
    "planificar ahorro",
    "cuanto ahorrar al mes",
    "ahorro mensual",
    "fondo de emergencia",
    "ahorro Colombia",
    "calcular ahorro",
  ],
  openGraph: {
    title: "Calculadora de Ahorro - Planifica tus Metas Financieras",
    description:
      "Calcula cuánto ahorrar al mes para alcanzar tus metas. Incluye intereses de cuenta de ahorros o CDT.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuánto debería tener en mi fondo de emergencia?",
    answer:
      "Se recomienda tener entre 3 y 6 meses de gastos mensuales. Si tienes un trabajo estable, 3 meses puede ser suficiente. Si eres independiente o tienes ingresos variables, apunta a 6 meses o más.",
  },
  {
    question: "¿Es mejor ahorrar en cuenta de ahorros o CDT?",
    answer:
      "Depende de cuándo necesites el dinero. La cuenta de ahorros te da liquidez inmediata pero menor rentabilidad (3-4% anual). Un CDT ofrece mejor tasa (10-12% anual) pero no puedes retirar hasta el vencimiento.",
  },
  {
    question: "¿Cuánto debería ahorrar de mi salario?",
    answer:
      "La regla general es ahorrar mínimo el 20% de tu ingreso neto. Si apenas empiezas, comienza con 10% y ve aumentando. Lo importante es crear el hábito de ahorrar algo cada mes.",
  },
  {
    question: "¿Cómo puedo ahorrar si no me alcanza el dinero?",
    answer:
      "Empieza con montos pequeños (incluso $20.000 mensuales). Revisa tus gastos y elimina suscripciones que no uses. Automatiza la transferencia apenas recibas tu salario. El hábito importa más que el monto.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Ahorro",
    description:
      "Planifica cuánto ahorrar para alcanzar tus metas financieras.",
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
