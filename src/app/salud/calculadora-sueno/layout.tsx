import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/salud/calculadora-sueno`;

export const metadata: Metadata = {
  title: "Calculadora de Sueño - Ciclos y Horas Óptimas para Dormir",
  description:
    "Calcula la mejor hora para dormir o despertar según los ciclos de sueño. Despierta descansado completando ciclos de 90 minutos.",
  keywords: [
    "calculadora de sueño",
    "ciclos de sueño",
    "hora para dormir",
    "hora para despertar",
    "sueño REM",
    "cuantas horas dormir",
    "dormir bien",
    "fases del sueño",
    "sueño profundo",
  ],
  openGraph: {
    title: "Calculadora de Sueño - Ciclos y Horas Óptimas",
    description:
      "Calcula la mejor hora para dormir o despertar según los ciclos de sueño de 90 minutos.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es un ciclo de sueño?",
    answer:
      "Un ciclo de sueño dura aproximadamente 90 minutos y pasa por diferentes fases: sueño ligero (N1, N2), sueño profundo (N3) y sueño REM. Despertar al final de un ciclo, después del REM, te hace sentir más descansado.",
  },
  {
    question: "¿Cuántas horas de sueño necesito?",
    answer:
      "La mayoría de adultos necesitan entre 7-9 horas (4-6 ciclos). Sin embargo, lo más importante es despertar al final de un ciclo completo, no la cantidad exacta de horas. Dormir 6 horas y despertar bien es mejor que 8 horas y despertar aturdido.",
  },
  {
    question: "¿Por qué me siento cansado aunque dormí 8 horas?",
    answer:
      "Probablemente despertaste en medio de un ciclo de sueño profundo (N3). Despertar durante esta fase causa inercia del sueño, esa sensación de aturdimiento. Despertar entre ciclos te hace sentir más descansado, incluso con menos horas totales.",
  },
  {
    question: "¿Qué pasa si duermo menos de 4 ciclos?",
    answer:
      "Dormir menos de 6 horas (4 ciclos) regularmente puede afectar tu salud, concentración, memoria y sistema inmune. La privación crónica de sueño está relacionada con problemas cardiovasculares, obesidad y deterioro cognitivo.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Sueño",
    description:
      "Calcula la mejor hora para dormir o despertar según los ciclos de sueño de 90 minutos.",
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
