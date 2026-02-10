interface BlogPostJsonLdProps {
  title: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
}

const siteUrl = "https://vidaencifras.com";

/**
 * Componente para agregar JSON-LD BlogPosting a artículos del blog
 * No incluye fecha para evitar mostrar información temporal
 */
export function BlogPostJsonLd({
  title,
  description,
  slug,
  category,
  image,
}: BlogPostJsonLdProps) {
  const articleUrl = `${siteUrl}/blog/${slug}`;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: articleUrl,
    image: image || `${siteUrl}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "VidaEnCifras",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "VidaEnCifras",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: category,
    inLanguage: "es",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
