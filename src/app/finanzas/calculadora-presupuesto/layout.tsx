import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-presupuesto`;

export const metadata: Metadata = {
  title: "Calculadora Presupuesto 50/30/20 - Organiza tus Finanzas",
  description:
    "Aplica la regla 50/30/20 para organizar tu dinero. Calcula cuánto destinar a necesidades, deseos y ahorro según tu ingreso mensual.",
  keywords: [
    "calculadora presupuesto",
    "regla 50 30 20",
    "presupuesto personal",
    "organizar finanzas",
    "distribuir salario",
    "presupuesto mensual",
    "finanzas personales Colombia",
    "como ahorrar dinero",
    "planificación financiera",
  ],
  openGraph: {
    title: "Calculadora Presupuesto 50/30/20 - Organiza tus Finanzas",
    description:
      "Organiza tu plata con la regla 50/30/20. Calcula cuánto destinar a necesidades, deseos y ahorro.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es la regla 50/30/20?",
    answer:
      "Es un método de presupuesto creado por Elizabeth Warren que divide tu ingreso neto en tres categorías: 50% para necesidades esenciales (arriendo, servicios, mercado), 30% para deseos (entretenimiento, salidas), y 20% para ahorro e inversión.",
  },
  {
    question: "¿Cómo saber qué es una necesidad y qué es un deseo?",
    answer:
      "Una necesidad es un gasto que no puedes evitar sin afectar tu calidad de vida básica: vivienda, alimentación, transporte al trabajo, salud. Un deseo es algo que mejora tu vida pero podrías vivir sin ello: Netflix, restaurantes, ropa de marca.",
  },
  {
    question: "¿Puedo ajustar los porcentajes 50/30/20?",
    answer:
      "Sí. Si vives en una ciudad costosa, quizás necesites 60/20/20. Si quieres ahorrar más agresivamente, podrías usar 50/20/30 (destinando 30% al ahorro). Lo importante es que los porcentajes sumen 100% y sean realistas para ti.",
  },
  {
    question: "¿Qué debo incluir en el 20% de ahorro?",
    answer:
      "El 20% incluye: fondo de emergencia (3-6 meses de gastos), ahorro para metas específicas (vacaciones, carro), inversiones, aportes a pensión voluntaria, y pagos extra para eliminar deudas más rápido.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Presupuesto 50/30/20",
    description:
      "Organiza tu dinero con la regla 50/30/20. Calcula la distribución ideal de tu ingreso mensual.",
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
