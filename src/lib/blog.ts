import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  calculadora?: string;
  image?: string;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  calculadora?: string;
  image?: string;
  readingTime: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "",
      calculadora: data.calculadora,
      image: data.image,
      readingTime: stats.text.replace("min read", "min de lectura"),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    calculadora: data.calculadora,
    image: data.image,
    readingTime: stats.text.replace("min read", "min de lectura"),
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export const categoryLabels: Record<string, string> = {
  finanzas: "Finanzas Personales",
  salud: "Salud y Bienestar",
  productividad: "Productividad",
  herramientas: "Herramientas",
};

export const categoryColors: Record<string, string> = {
  finanzas: "bg-teal-500",
  salud: "bg-red-500",
  productividad: "bg-orange-500",
  herramientas: "bg-purple-500",
};

// Derivado del registry centralizado — se genera una vez al importar el módulo
import { getCalculadora } from "./calculators";

export function getCalculadoraName(href: string): string {
  const calc = getCalculadora(href);
  return calc?.nombre || "Calculadora";
}

// Proxy para compatibilidad con código existente que usa calculadoraNames[href]
export const calculadoraNames = new Proxy<Record<string, string>>({}, {
  get(_target, prop: string) {
    return getCalculadoraName(prop);
  },
});
