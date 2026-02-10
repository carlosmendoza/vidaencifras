import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-dias-vividos`;

export const metadata: Metadata = {
  title: "Calculadora de Días Vividos: ¿Cuántos Días Tienes de Vida?",
  description:
    "Descubre cuántos días, horas y minutos has vivido desde que naciste. Una perspectiva única de tu vida en números que te hará reflexionar.",
  keywords: [
    "días vividos",
    "cuántos días tengo",
    "calculadora edad en días",
    "horas vividas",
    "minutos de vida",
    "mi vida en números",
    "cuánto tiempo he vivido",
    "edad exacta",
    "calculadora de edad",
  ],
  openGraph: {
    title: "¿Cuántos Días Has Vivido? - Calculadora de Días de Vida",
    description:
      "Descubre tu vida en números: días, horas y minutos desde tu nacimiento.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuántos días tiene una persona de 30 años?",
    answer:
      "Una persona de 30 años ha vivido aproximadamente 10,950 días (30 × 365). Con años bisiestos incluidos, serían alrededor de 10,958 días.",
  },
  {
    question: "¿Cuántas horas hay en una vida promedio?",
    answer:
      "Con una esperanza de vida de 80 años, una persona vive aproximadamente 700,800 horas (80 × 365 × 24). Cada día son 24 horas, cada año son 8,760 horas.",
  },
  {
    question: "¿Cuántos latidos tiene el corazón en una vida?",
    answer:
      "El corazón late aproximadamente 100,000 veces al día. En una vida de 80 años, son aproximadamente 2,920 millones de latidos.",
  },
  {
    question: "¿Por qué es útil saber cuántos días he vivido?",
    answer:
      "Conocer tu vida en días te da una perspectiva diferente del tiempo. Te ayuda a valorar cada día, establecer metas concretas y reflexionar sobre cómo inviertes tu tiempo.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Días Vividos",
    description:
      "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento.",
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
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
