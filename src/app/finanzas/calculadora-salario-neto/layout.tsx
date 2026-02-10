import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-salario-neto`;

export const metadata: Metadata = {
  title: "Calculadora de Salario Neto Colombia 2026 - ¿Cuánto Recibes?",
  description:
    "Calcula tu salario neto en Colombia. Descubre cuánto recibes después de descuentos de salud, pensión y fondo de solidaridad. Incluye auxilio de transporte.",
  keywords: [
    "calculadora salario neto",
    "salario neto colombia",
    "cuanto me queda de sueldo",
    "descuentos nomina colombia",
    "salario bruto a neto",
    "descuento salud pension",
    "auxilio transporte",
    "calculadora nomina",
    "sueldo neto",
    "descuentos salariales colombia",
  ],
  openGraph: {
    title: "Calculadora de Salario Neto Colombia 2026",
    description:
      "Calcula cuánto recibes realmente después de los descuentos de nómina.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué descuentos se hacen al salario en Colombia?",
    answer:
      "Los descuentos obligatorios son: salud (4%) y pensión (4%), ambos calculados sobre el salario básico. Si ganas más de 4 SMMLV ($7,003,620 en 2026), también se descuenta el Fondo de Solidaridad Pensional (1% adicional).",
  },
  {
    question: "¿El auxilio de transporte tiene descuentos?",
    answer:
      "No. El auxilio de transporte ($249,095 en 2026) no tiene descuentos de salud ni pensión. Se suma íntegro al salario neto. Aplica para quienes ganan hasta 2 SMMLV ($3,501,810).",
  },
  {
    question: "¿Qué es el Fondo de Solidaridad Pensional?",
    answer:
      "Es un aporte adicional del 1% que deben hacer los trabajadores que ganan 4 SMMLV o más ($7,003,620 en 2026). Este dinero se destina a subsidiar las pensiones de adultos mayores de escasos recursos.",
  },
  {
    question: "¿La retención en la fuente se descuenta del salario?",
    answer:
      "Sí, pero solo aplica para salarios altos (generalmente desde 4.5 SMMLV). El valor depende de deducciones personales como dependientes, medicina prepagada, intereses de vivienda, AFC y pensiones voluntarias.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Salario Neto Colombia",
    description:
      "Calcula tu salario neto en Colombia después de descuentos de salud, pensión y fondo de solidaridad.",
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
