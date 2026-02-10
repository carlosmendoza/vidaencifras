import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-horas-extras`;

export const metadata: Metadata = {
  title: "Calculadora de Horas Extras Colombia 2026 - Recargos Laborales",
  description:
    "Calcula el valor de tus horas extras en Colombia: diurnas, nocturnas, dominicales y festivos. Incluye recargos nocturnos y dominicales según la ley.",
  keywords: [
    "calculadora horas extras",
    "horas extras colombia",
    "recargo nocturno",
    "recargo dominical",
    "hora extra diurna",
    "hora extra nocturna",
    "recargos laborales",
    "valor hora extra",
    "horas extras festivos",
    "calculo horas extras",
  ],
  openGraph: {
    title: "Calculadora de Horas Extras Colombia 2026",
    description:
      "Calcula el valor de tus horas extras y recargos laborales según la legislación colombiana.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo se calcula el valor de la hora extra?",
    answer:
      "El valor hora se calcula dividiendo el salario mensual entre las horas de la jornada mensual (182 horas para jornada de 42h/semana en 2026). Luego se aplica el recargo según el tipo de hora extra: 25% diurna, 75% nocturna, 100% dominical diurna, 150% dominical nocturna.",
  },
  {
    question: "¿Cuál es la diferencia entre hora extra y recargo?",
    answer:
      "La hora extra es tiempo adicional después de completar tu jornada laboral ordinaria. El recargo aplica cuando trabajas en horario nocturno (9pm-6am) o dominical/festivo dentro de tu jornada normal, sin ser tiempo adicional.",
  },
  {
    question: "¿Cuántas horas extras puedo trabajar al mes?",
    answer:
      "El máximo legal en Colombia es de 2 horas extras diarias y 12 semanales. El empleador debe solicitar autorización al Ministerio de Trabajo para que sus empleados trabajen horas extras de forma habitual.",
  },
  {
    question: "¿Las horas extras pagan aportes a salud y pensión?",
    answer:
      "Sí. Las horas extras hacen parte del salario y sobre ellas se calculan los aportes a salud (4%), pensión (4%) y parafiscales. También se incluyen en la base para calcular prestaciones sociales como prima, cesantías y vacaciones.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Horas Extras Colombia",
    description:
      "Calcula el valor de tus horas extras y recargos laborales en Colombia.",
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
