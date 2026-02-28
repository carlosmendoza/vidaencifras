import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import {
  calculadorasSalud,
  calculadorasFinanzas,
  calculadorasProductividad,
  calculadorasHerramientas,
} from "@/lib/calculators";

const siteUrl = "https://vidaencifras.com";

// Prioridades por categoría (las finanzas y salud tienen mayor volumen de búsqueda)
const categoryPriority: Record<string, number> = {
  salud: 0.7,
  finanzas: 0.7,
  productividad: 0.6,
  herramientas: 0.6,
};

// Calculadoras con mayor volumen de búsqueda reciben prioridad extra
const highPriorityHrefs = new Set([
  "/finanzas/calculadora-salario-neto",
  "/finanzas/calculadora-interes-compuesto",
  "/finanzas/calculadora-prestamos",
  "/finanzas/calculadora-prestacion-servicios",
  "/finanzas/calculadora-prima",
  "/finanzas/calculadora-cesantias",
  "/finanzas/calculadora-liquidacion",
  "/salud/calculadora-calorias",
  "/salud/calculadora-imc",
  "/herramientas/calculadora-porcentajes",
  "/herramientas/conversor-unidades",
  "/herramientas/calculadora-trm",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Páginas principales
  const mainPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/finanzas`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/salud`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/herramientas`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/productividad`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // Todas las calculadoras — derivadas del registry centralizado
  const allCalculadoras = [
    ...calculadorasSalud,
    ...calculadorasFinanzas,
    ...calculadorasProductividad,
    ...calculadorasHerramientas,
  ];

  const calculadorasUrls = allCalculadoras.map((calc) => ({
    url: `${siteUrl}${calc.href}`,
    changeFrequency: "monthly" as const,
    priority: highPriorityHrefs.has(calc.href)
      ? (categoryPriority[calc.categoria] ?? 0.5) + 0.05
      : categoryPriority[calc.categoria] ?? 0.5,
  }));

  // Artículos del blog — usa la fecha real del post
  const blogUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Páginas legales
  const legalPages = [
    { url: `${siteUrl}/privacidad`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/terminos`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/contacto`, priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...mainPages,
    ...calculadorasUrls,
    ...blogUrls,
    ...legalPages,
  ];
}
