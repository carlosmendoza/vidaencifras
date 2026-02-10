import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/salud/calculadora-calorias`;

export const metadata: Metadata = {
  title: "Calculadora de Calorías TDEE y Macros Online",
  description:
    "Calcula tu gasto calórico diario (TDEE), metabolismo basal (TMB) y distribución de macronutrientes según tu objetivo: perder peso, mantener o ganar masa muscular.",
  keywords: [
    "calculadora TDEE",
    "calcular calorías diarias",
    "gasto calórico",
    "metabolismo basal",
    "TMB calculadora",
    "macronutrientes",
    "calorías para bajar de peso",
    "calorías mantenimiento",
    "déficit calórico",
  ],
  openGraph: {
    title: "Calculadora de Calorías TDEE y Macros Online",
    description:
      "Calcula cuántas calorías necesitas al día según tu actividad física y objetivo personal.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el TDEE y cómo se calcula?",
    answer:
      "TDEE (Total Daily Energy Expenditure) es el total de calorías que quemas al día, incluyendo actividad física. Se calcula multiplicando tu TMB (metabolismo basal) por un factor de actividad.",
  },
  {
    question: "¿Qué es el metabolismo basal (TMB)?",
    answer:
      "El TMB son las calorías que tu cuerpo necesita en reposo absoluto para funciones vitales como respirar, bombear sangre y mantener la temperatura corporal. Representa aproximadamente el 60-75% de tu gasto total.",
  },
  {
    question: "¿Cuántas calorías debo comer para bajar de peso?",
    answer:
      "Para perder peso de forma saludable, se recomienda un déficit de 300-500 calorías diarias respecto a tu TDEE. Esto permite perder aproximadamente 0.5 kg por semana sin afectar tu metabolismo.",
  },
  {
    question: "¿Qué son los macronutrientes y por qué importan?",
    answer:
      "Los macronutrientes son proteínas, carbohidratos y grasas. Su distribución afecta tus resultados: más proteína ayuda a mantener músculo, los carbohidratos dan energía, y las grasas son esenciales para hormonas.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Calorías TDEE",
    description:
      "Calcula tu gasto calórico diario, metabolismo basal y macronutrientes personalizados.",
    url: pageUrl,
    applicationCategory: "HealthApplication",
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
