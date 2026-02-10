import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-vacaciones`;

export const metadata: Metadata = {
  title: "Calculadora de Vacaciones Colombia 2026 - Días y Dinero",
  description:
    "Calcula cuántos días de vacaciones te corresponden y su valor en dinero. 15 días hábiles por año trabajado según la ley colombiana.",
  keywords: [
    "calculadora vacaciones",
    "vacaciones colombia",
    "dias de vacaciones",
    "liquidacion vacaciones",
    "cuantos dias de vacaciones",
    "pago vacaciones",
    "vacaciones proporcionales",
    "vacaciones laborales",
    "compensacion vacaciones",
    "calcular vacaciones",
  ],
  openGraph: {
    title: "Calculadora de Vacaciones Colombia 2026",
    description:
      "Calcula tus días de vacaciones y su valor según la legislación colombiana.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cuántos días de vacaciones me corresponden en Colombia?",
    answer:
      "Por cada año trabajado tienes derecho a 15 días hábiles de vacaciones remuneradas. Si no has cumplido el año, se calculan proporcionalmente: aproximadamente 1.25 días hábiles por cada mes trabajado.",
  },
  {
    question: "¿Cómo se calcula el pago de vacaciones?",
    answer:
      "El valor de las vacaciones se calcula dividiendo tu salario mensual básico entre 30 y multiplicando por los días de vacaciones. El auxilio de transporte NO se incluye en este cálculo porque durante las vacaciones no hay desplazamiento al trabajo.",
  },
  {
    question: "¿Puedo acumular vacaciones?",
    answer:
      "Sí, puedes acumular hasta 2 años de vacaciones (máximo 30 días hábiles). Después de este límite, el empleador está obligado a concederte las vacaciones, incluso sin tu consentimiento.",
  },
  {
    question: "¿Me pueden pagar las vacaciones en dinero?",
    answer:
      "Durante la relación laboral, solo se puede compensar en dinero la mitad de las vacaciones (7.5 días por año). La otra mitad debe disfrutarse obligatoriamente como descanso. La compensación total en dinero solo aplica cuando termina el contrato laboral.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Vacaciones Colombia",
    description:
      "Calcula cuántos días de vacaciones te corresponden y su valor en dinero.",
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
