import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-subsidio-vivienda`;

export const metadata: Metadata = {
  title: "Calculadora Subsidio Mi Casa Ya 2025 - Verifica si Eres Elegible",
  description:
    "Verifica si calificas para el subsidio de vivienda Mi Casa Ya en Colombia. Calcula tu subsidio VIP o VIS, requisitos y documentos necesarios. Actualizado 2025.",
  keywords: [
    "Mi Casa Ya 2025",
    "subsidio vivienda Colombia",
    "calculadora subsidio vivienda",
    "vivienda VIP Colombia",
    "vivienda VIS Colombia",
    "requisitos Mi Casa Ya",
    "subsidio primera vivienda",
    "cómo aplicar Mi Casa Ya",
    "monto subsidio vivienda",
    "elegibilidad Mi Casa Ya",
  ],
  openGraph: {
    title: "Calculadora Subsidio Mi Casa Ya 2025 - Verifica si Eres Elegible",
    description:
      "Verifica si calificas para el subsidio de vivienda Mi Casa Ya. Calcula tu subsidio y requisitos.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es el programa Mi Casa Ya?",
    answer:
      "Mi Casa Ya es un programa del Gobierno de Colombia que otorga subsidios para la compra de vivienda nueva de interés social (VIS) y prioritario (VIP) a familias de bajos ingresos. Incluye subsidio a la cuota inicial y cobertura a la tasa de interés.",
  },
  {
    question: "¿Cuánto es el subsidio de Mi Casa Ya?",
    answer:
      "El subsidio varía según tus ingresos y el tipo de vivienda. Para ingresos hasta 2 SMMLV: hasta 30 SMMLV para VIP y 20 SMMLV para VIS. Para ingresos de 2-4 SMMLV: 20 SMMLV para ambos tipos de vivienda.",
  },
  {
    question: "¿Cuáles son los requisitos de Mi Casa Ya?",
    answer:
      "Los requisitos principales son: ser colombiano mayor de edad, ingresos familiares hasta 4 SMMLV, no ser propietario de vivienda, no haber recibido subsidio antes, y tener aprobación de crédito hipotecario.",
  },
  {
    question: "¿Puedo usar Mi Casa Ya para vivienda usada?",
    answer:
      "No, el programa Mi Casa Ya solo aplica para vivienda nueva. Si buscas comprar vivienda usada, puedes consultar otras opciones de subsidio del FNA (Fondo Nacional del Ahorro) o cajas de compensación.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Subsidio Mi Casa Ya Colombia",
    description:
      "Verifica elegibilidad y calcula el subsidio de vivienda Mi Casa Ya para VIP y VIS en Colombia.",
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
