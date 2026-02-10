import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-prestamos`;

export const metadata: Metadata = {
  title: "Calculadora de Préstamos y Cuotas Online Gratis",
  description:
    "Calcula la cuota mensual de tu préstamo, el total de intereses y visualiza la tabla de amortización completa. Sistema francés de cuotas fijas.",
  keywords: [
    "calculadora préstamos",
    "calculadora cuotas",
    "calcular cuota mensual",
    "tabla amortización",
    "simulador préstamo",
    "calcular intereses préstamo",
    "préstamo personal",
    "cuota fija",
    "sistema francés",
  ],
  openGraph: {
    title: "Calculadora de Préstamos y Cuotas Online Gratis",
    description:
      "Calcula tu cuota mensual, total a pagar y tabla de amortización. Gratis y sin registro.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo se calcula la cuota mensual de un préstamo?",
    answer:
      "La cuota mensual se calcula usando la fórmula del sistema francés: Cuota = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el monto del préstamo, r es la tasa mensual y n es el número de cuotas.",
  },
  {
    question: "¿Qué es el sistema de amortización francés?",
    answer:
      "El sistema francés es el más común en préstamos personales. Se caracteriza por cuotas fijas durante todo el plazo. Al inicio pagas más intereses y menos capital, pero esto se invierte gradualmente.",
  },
  {
    question: "¿Qué incluye cada cuota del préstamo?",
    answer:
      "Cada cuota incluye dos componentes: el capital (la parte que reduce tu deuda) y los intereses (el costo del préstamo). En el sistema francés, la suma de ambos siempre da la misma cuota.",
  },
  {
    question: "¿Cómo puedo pagar menos intereses en un préstamo?",
    answer:
      "Para pagar menos intereses puedes: elegir un plazo más corto (cuotas más altas pero menos intereses totales), hacer abonos extra al capital, o buscar tasas de interés más bajas.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Préstamos",
    description:
      "Calcula tu cuota mensual, intereses totales y tabla de amortización de préstamos.",
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
