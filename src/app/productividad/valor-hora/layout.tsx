import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/productividad/valor-hora`;

export const metadata: Metadata = {
  title: "Calculadora del Valor de tu Hora - ¿Cuánto Vale tu Tiempo?",
  description:
    "Calcula el valor real de una hora de tu trabajo. Descubre tu tarifa por hora considerando gastos de transporte, comida y tiempo de traslado.",
  keywords: [
    "valor hora trabajo",
    "cuanto vale mi hora",
    "calcular tarifa por hora",
    "valor tiempo trabajo",
    "salario por hora",
    "productividad personal",
    "costo oportunidad tiempo",
    "freelance tarifa hora",
  ],
  openGraph: {
    title: "Calculadora del Valor de tu Hora - ¿Cuánto Vale tu Tiempo?",
    description:
      "Descubre cuánto vale realmente una hora de tu trabajo considerando todos los costos ocultos.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Por qué es importante conocer el valor de mi hora?",
    answer:
      "Conocer el valor de tu hora te ayuda a tomar mejores decisiones sobre cómo invertir tu tiempo. Puedes evaluar si vale la pena hacer algo tú mismo o delegarlo, y establecer tarifas justas si eres freelancer o independiente.",
  },
  {
    question: "¿Qué gastos debo incluir en el cálculo?",
    answer:
      "Incluye todos los gastos asociados a trabajar: transporte (gasolina, pasajes, parqueadero), comida fuera de casa, ropa de trabajo, y el tiempo de traslado. Estos costos reducen tu ingreso real por hora.",
  },
  {
    question: "¿Cómo uso el valor de mi hora para tomar decisiones?",
    answer:
      "Si tu hora vale $50.000 y un servicio de aseo cobra $40.000 por 2 horas de trabajo, te conviene contratarlo y usar ese tiempo para trabajar o descansar. Aplica esta lógica a cualquier decisión de tiempo vs dinero.",
  },
  {
    question: "¿El valor bruto y neto de la hora son muy diferentes?",
    answer:
      "Sí, pueden diferir bastante. El valor bruto solo considera salario/horas. El valor neto descuenta gastos laborales y cuenta el tiempo total invertido (incluyendo traslados), dando una imagen más realista.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora del Valor de tu Hora",
    description:
      "Calcula el valor real de una hora de tu trabajo considerando todos los costos.",
    url: pageUrl,
    applicationCategory: "ProductivityApplication",
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
