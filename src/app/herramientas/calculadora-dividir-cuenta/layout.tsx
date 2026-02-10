import { Metadata } from "next";

const siteUrl = "https://vidaencifras.com";
const pageUrl = `${siteUrl}/herramientas/calculadora-dividir-cuenta`;

export const metadata: Metadata = {
  title: "Calculadora para Dividir Cuenta entre Amigos",
  description:
    "Divide gastos de forma justa entre varias personas. Perfecta para viajes, cenas o gastos compartidos. Calcula quién debe a quién automáticamente.",
  keywords: [
    "dividir cuenta",
    "dividir gastos",
    "split bill",
    "dividir entre amigos",
    "gastos compartidos",
    "calculadora gastos viaje",
    "dividir cena",
    "quién debe a quién",
    "repartir gastos",
  ],
  openGraph: {
    title: "Calculadora para Dividir Cuenta entre Amigos",
    description:
      "Divide gastos de forma justa. Perfecta para viajes, cenas o cualquier gasto compartido.",
    url: pageUrl,
    type: "website",
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqs = [
  {
    question: "¿Cómo dividir una cuenta de restaurante entre amigos?",
    answer:
      "Puedes dividir en partes iguales el total (incluyendo propina) entre el número de personas. Si cada quien consumió diferente, suma lo de cada uno y agrega la propina proporcional.",
  },
  {
    question: "¿Cómo calcular gastos compartidos en un viaje?",
    answer:
      "Registra todos los gastos y quién los pagó. Al final, suma el total, divide entre el número de personas para obtener el gasto promedio, y calcula quién debe pagar a quién para equilibrar.",
  },
  {
    question: "¿Cuánto debería dejar de propina?",
    answer:
      "La propina estándar varía por país: en Colombia suele ser el 10%, en México entre 10-15%, en Estados Unidos 15-20%, y en algunos países europeos no es obligatoria.",
  },
  {
    question: "¿Es mejor dividir en partes iguales o por consumo?",
    answer:
      "Dividir por consumo es más justo cuando hay grandes diferencias en lo que cada persona pidió. Partes iguales funciona bien cuando todos consumieron algo similar.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora para Dividir Cuenta",
    description:
      "Divide la cuenta entre amigos fácilmente, con propinas incluidas.",
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
