import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/finanzas/calculadora-inflacion`;

export const metadata: Metadata = {
  title: "Calculadora de Inflación Colombia - IPC Histórico y Proyección",
  description:
    "Calcula cómo la inflación afecta tu dinero. Usa datos históricos del IPC Colombia o proyecta el impacto futuro en tus ahorros.",
  keywords: [
    "calculadora inflacion",
    "inflacion Colombia",
    "IPC Colombia",
    "poder adquisitivo",
    "devaluacion peso",
    "ajuste inflacion",
    "DANE inflacion",
    "costo de vida Colombia",
    "perdida valor dinero",
  ],
  openGraph: {
    title: "Calculadora de Inflación Colombia - IPC Histórico y Proyección",
    description:
      "Entiende cómo la inflación afecta tu dinero. Datos oficiales del DANE.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Qué es la inflación y cómo me afecta?",
    answer:
      "La inflación es el aumento general de los precios. Te afecta porque el dinero que tienes hoy compra menos cosas mañana. Por ejemplo, si la inflación es 10% anual, algo que hoy cuesta $100.000 costará $110.000 el próximo año.",
  },
  {
    question: "¿Qué es el IPC y quién lo mide en Colombia?",
    answer:
      "El IPC (Índice de Precios al Consumidor) mide la variación de precios de una canasta de bienes y servicios. En Colombia lo calcula el DANE mensualmente, midiendo precios en 38 ciudades del país.",
  },
  {
    question: "¿Cómo puedo proteger mi dinero de la inflación?",
    answer:
      "Para proteger tu dinero, busca inversiones que rindan por encima de la inflación: CDTs a tasa fija, fondos de inversión, acciones, finca raíz, o bonos indexados a la inflación (TES UVR).",
  },
  {
    question: "¿Por qué el Banco de la República tiene meta de inflación del 3%?",
    answer:
      "Una inflación baja y estable (alrededor del 3%) favorece el crecimiento económico, facilita la planificación financiera de familias y empresas, y protege el poder adquisitivo de los colombianos, especialmente de los más vulnerables.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Inflación Colombia",
    description:
      "Calcula el impacto de la inflación en tu dinero usando datos históricos del IPC.",
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
