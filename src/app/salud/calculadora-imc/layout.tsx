import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/salud/calculadora-imc`;

export const metadata: Metadata = {
  title: "Calculadora de IMC (Índice de Masa Corporal) Online",
  description:
    "Calcula tu Índice de Masa Corporal (IMC) y conoce tu peso ideal. Incluye clasificación OMS, indicador visual y recomendaciones personalizadas.",
  keywords: [
    "calculadora IMC",
    "índice masa corporal",
    "calcular IMC",
    "peso ideal",
    "IMC adultos",
    "clasificación IMC",
    "sobrepeso",
    "obesidad calculadora",
    "IMC OMS",
  ],
  openGraph: {
    title: "Calculadora de IMC (Índice de Masa Corporal) Online",
    description:
      "Calcula tu IMC y conoce si estás en tu peso ideal. Incluye clasificación y peso recomendado.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el IMC y cómo se calcula?",
    answer:
      "El IMC (Índice de Masa Corporal) es una medida que relaciona tu peso con tu altura. Se calcula dividiendo tu peso en kilogramos entre tu altura en metros al cuadrado: IMC = peso / (altura × altura).",
  },
  {
    question: "¿Cuáles son los rangos normales de IMC?",
    answer:
      "Según la OMS: bajo peso es menos de 18.5, peso normal es 18.5-24.9, sobrepeso es 25-29.9, y obesidad es 30 o más. Estos rangos son para adultos y pueden variar según etnia y edad.",
  },
  {
    question: "¿El IMC es preciso para todas las personas?",
    answer:
      "El IMC es una referencia general pero tiene limitaciones. No distingue entre masa muscular y grasa, por lo que atletas musculosos pueden tener IMC alto sin exceso de grasa. También varía su interpretación por edad y sexo.",
  },
  {
    question: "¿Cuál es mi peso ideal según el IMC?",
    answer:
      "Tu peso ideal es el rango donde tu IMC está entre 18.5 y 24.9. Para calcularlo: peso mínimo = 18.5 × altura² y peso máximo = 24.9 × altura² (altura en metros).",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de IMC",
    description:
      "Calcula tu Índice de Masa Corporal y conoce tu peso ideal.",
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
