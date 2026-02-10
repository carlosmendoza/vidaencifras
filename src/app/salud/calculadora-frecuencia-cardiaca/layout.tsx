import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/salud/calculadora-frecuencia-cardiaca`;

export const metadata: Metadata = {
  title: "Calculadora de Frecuencia Cardíaca y Zonas de Entrenamiento",
  description:
    "Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas con el método Karvonen. Optimiza tu entrenamiento cardiovascular.",
  keywords: [
    "calculadora frecuencia cardiaca",
    "zonas de entrenamiento",
    "frecuencia cardiaca maxima",
    "metodo karvonen",
    "zonas cardiacas",
    "fc maxima",
    "entrenamiento por zonas",
    "frecuencia cardiaca reposo",
    "quema de grasa cardio",
  ],
  openGraph: {
    title: "Calculadora de Frecuencia Cardíaca y Zonas de Entrenamiento",
    description:
      "Calcula tu FC máxima y zonas de entrenamiento personalizadas para optimizar tu cardio.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo mido mi frecuencia cardíaca en reposo?",
    answer:
      "Mídela al despertar, antes de levantarte de la cama. Cuenta tus pulsaciones durante 60 segundos colocando dos dedos en la muñeca o el cuello. Hazlo varios días y promedia los resultados para mayor precisión.",
  },
  {
    question: "¿Qué es la frecuencia cardíaca máxima?",
    answer:
      "Es el número máximo de latidos por minuto que tu corazón puede alcanzar durante el ejercicio intenso. Disminuye con la edad y varía entre personas. La fórmula de Tanaka (208 - 0.7 × edad) es más precisa que la tradicional 220-edad.",
  },
  {
    question: "¿En qué zona debo entrenar?",
    answer:
      "Depende de tu objetivo. Zona 2 para quemar grasa y desarrollar resistencia base, Zona 3 para mejorar capacidad aeróbica, Zonas 4-5 para rendimiento deportivo y velocidad. La regla 80/20 sugiere 80% en zonas bajas y 20% en zonas altas.",
  },
  {
    question: "¿Qué es el método Karvonen?",
    answer:
      "Es un método preciso para calcular zonas de entrenamiento que considera tu frecuencia cardíaca en reposo, no solo tu edad. Usa la fórmula: FC objetivo = FC reposo + (FC reserva × % intensidad). Es más personalizado que la fórmula básica.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Frecuencia Cardíaca",
    description:
      "Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas.",
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
