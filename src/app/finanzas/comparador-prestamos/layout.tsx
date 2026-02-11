import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/comparador-prestamos`;

export const metadata: Metadata = {
  title: "Comparador de Préstamos Colombia 2025 - Encuentra la Mejor Tasa",
  description:
    "Compara préstamos de los principales bancos en Colombia: Bancolombia, Davivienda, BBVA, Banco de Bogotá y más. Libre inversión, vehículo y vivienda. Tasas actualizadas 2025.",
  keywords: [
    "comparador préstamos Colombia",
    "mejor tasa préstamo",
    "préstamo libre inversión",
    "crédito vehículo Colombia",
    "crédito vivienda Colombia",
    "Bancolombia préstamos",
    "Davivienda crédito",
    "BBVA préstamo",
    "tasas préstamos 2025",
    "simulador crédito bancos",
  ],
  openGraph: {
    title: "Comparador de Préstamos Colombia 2025 - Encuentra la Mejor Tasa",
    description:
      "Compara préstamos de todos los bancos colombianos. Libre inversión, vehículo y vivienda. Tasas actualizadas.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo elijo el mejor préstamo?",
    answer:
      "Compara el Costo Total del Crédito (CTC), no solo la tasa de interés. El CTC incluye seguros, administración y otros cobros. Un préstamo con tasa más baja puede terminar siendo más caro por costos adicionales.",
  },
  {
    question: "¿Qué diferencia hay entre tasa nominal y efectiva?",
    answer:
      "La tasa nominal no considera capitalización de intereses. La tasa efectiva anual (EA) es la que realmente pagas. Siempre compara usando tasa EA para tener una comparación justa.",
  },
  {
    question: "¿Qué documentos necesito para solicitar un préstamo?",
    answer:
      "Generalmente: cédula, certificado de ingresos o desprendibles de nómina, extractos bancarios de los últimos 3 meses, y declaración de renta si aplica. Para vehículo o vivienda pueden pedir documentos adicionales del bien.",
  },
  {
    question: "¿Puedo pagar mi préstamo antes de tiempo?",
    answer:
      "Sí, por ley tienes derecho a prepagar parcial o totalmente sin penalización. Esto reduce los intereses totales. Algunos bancos cobran un pequeño cargo administrativo por prepago.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Comparador de Préstamos Colombia",
    description:
      "Compara préstamos de bancos colombianos: tasas, cuotas y costos totales para libre inversión, vehículo y vivienda.",
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
