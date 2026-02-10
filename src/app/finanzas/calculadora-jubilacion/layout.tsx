import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-jubilacion`;

export const metadata: Metadata = {
  title: "Calculadora de Jubilación Colombia - Planifica tu Retiro",
  description:
    "Calcula cuánto necesitas ahorrar para jubilarte tranquilo. Incluye inflación, retorno de inversión y pensión estimada.",
  keywords: [
    "calculadora jubilacion",
    "pension Colombia",
    "cuanto ahorrar para jubilarse",
    "planificar retiro",
    "pension voluntaria",
    "ahorro jubilacion",
    "edad pension Colombia",
    "retiro anticipado",
    "independencia financiera",
  ],
  openGraph: {
    title: "Calculadora de Jubilación Colombia - Planifica tu Retiro",
    description:
      "Descubre cuánto necesitas ahorrar para mantener tu nivel de vida en la jubilación.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿A qué edad me puedo pensionar en Colombia?",
    answer:
      "La edad de pensión en Colombia es 57 años para mujeres y 62 para hombres. Además, debes haber cotizado mínimo 1.300 semanas (aproximadamente 25 años). Si no cumples las semanas, puedes acceder a una devolución de saldos o seguir cotizando.",
  },
  {
    question: "¿Cuánto debería ahorrar para mi jubilación?",
    answer:
      "Se recomienda ahorrar entre 10% y 15% de tu ingreso para la jubilación. Si empiezas tarde (después de los 40), considera aumentar a 20% o más. La clave es empezar lo antes posible para aprovechar el interés compuesto.",
  },
  {
    question: "¿Qué es la pensión voluntaria y cuáles son sus beneficios?",
    answer:
      "La pensión voluntaria es un ahorro adicional al obligatorio que ofrece beneficios tributarios: puedes deducir hasta el 30% de tu ingreso (máximo 3.800 UVT) de tu declaración de renta. Además, los rendimientos no pagan impuestos si cumples los requisitos de permanencia.",
  },
  {
    question: "¿Es mejor el régimen de prima media o el RAIS?",
    answer:
      "Prima Media (Colpensiones) suele ser mejor para salarios altos y carreras laborales estables. RAIS (fondos privados) puede ser mejor para salarios bajos o carreras cortas. Si tienes más de 750 semanas cotizadas, evalúa bien antes de cambiarte.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Jubilación",
    description:
      "Planifica tu retiro y calcula cuánto necesitas ahorrar para jubilarte tranquilo.",
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
