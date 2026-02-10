interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorJsonLdProps {
  name: string;
  description: string;
  url: string;
  category?: "FinanceApplication" | "HealthApplication" | "UtilityApplication";
  faqs?: FAQ[];
}

/**
 * Componente para agregar JSON-LD estructurado a calculadoras
 * Incluye WebApplication y opcionalmente FAQPage schema
 */
export function CalculatorJsonLd({
  name,
  description,
  url,
  category = "UtilityApplication",
  faqs,
}: CalculatorJsonLdProps) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "VidaEnCifras",
      url: "https://vidaencifras.com",
    },
  };

  const faqJsonLd = faqs && faqs.length > 0 ? {
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
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
