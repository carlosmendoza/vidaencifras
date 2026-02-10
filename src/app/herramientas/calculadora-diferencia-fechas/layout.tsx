import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-diferencia-fechas`;

export const metadata: Metadata = {
  title: "Calculadora de Diferencia entre Fechas Online",
  description:
    "Calcula la diferencia exacta entre dos fechas en años, meses, semanas y días. Perfecta para calcular antigüedad, plazos o tiempo transcurrido.",
  keywords: [
    "diferencia entre fechas",
    "calcular días entre fechas",
    "cuántos días faltan",
    "calculadora de fechas",
    "tiempo entre fechas",
    "calcular antigüedad",
    "días transcurridos",
    "semanas entre fechas",
    "contador de días",
  ],
  openGraph: {
    title: "Calculadora de Diferencia entre Fechas Online",
    description:
      "Calcula el tiempo exacto entre dos fechas: años, meses, semanas y días.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo calcular los días entre dos fechas?",
    answer:
      "Convierte ambas fechas a días desde una fecha de referencia (como el 1 de enero del año 1) y resta. Nuestra calculadora hace esto automáticamente, considerando años bisiestos.",
  },
  {
    question: "¿Cuántos días tiene un año?",
    answer:
      "Un año normal tiene 365 días. Los años bisiestos tienen 366 días. Un año bisiesto ocurre cada 4 años, excepto los años divisibles por 100 pero no por 400.",
  },
  {
    question: "¿Cómo calcular la antigüedad laboral exacta?",
    answer:
      "Ingresa tu fecha de ingreso como fecha inicial y la fecha actual como fecha final. La calculadora te mostrará los años, meses y días exactos de antigüedad.",
  },
  {
    question: "¿Cuántas semanas tiene un año?",
    answer:
      "Un año tiene 52 semanas y 1 día (o 2 días en años bisiestos). Esto equivale a 365 o 366 días dependiendo del año.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Diferencia entre Fechas",
    description:
      "Calcula el tiempo exacto entre dos fechas: días, meses, años, horas y más.",
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
