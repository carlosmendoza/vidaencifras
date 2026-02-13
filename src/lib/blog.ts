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

export const calculadoraNames: Record<string, string> = {
  "/finanzas/calculadora-salario-neto": "Salario Neto",
  "/finanzas/calculadora-prestamos": "Préstamos",
  "/finanzas/calculadora-interes-compuesto": "Interés Compuesto",
  "/finanzas/calculadora-liquidacion": "Liquidación",
  "/finanzas/calculadora-prima": "Prima",
  "/finanzas/calculadora-cesantias": "Cesantías",
  "/finanzas/calculadora-horas-extras": "Horas Extras",
  "/finanzas/calculadora-vacaciones": "Vacaciones",
  "/finanzas/calculadora-impuesto-renta": "Impuesto de Renta",
  "/finanzas/calculadora-retencion-fuente": "Retención en la Fuente",
  "/finanzas/calculadora-4x1000": "4x1000",
  "/finanzas/calculadora-inflacion": "Inflación",
  "/finanzas/calculadora-jubilacion": "Jubilación",
  "/finanzas/calculadora-meta-ahorro": "Meta de Ahorro",
  "/finanzas/calculadora-presupuesto": "Presupuesto 50/30/20",
  "/finanzas/calculadora-prestacion-servicios": "Prestación de Servicios",
  "/finanzas/calculadora-subsidio-vivienda": "Subsidio Mi Casa Ya",
  "/finanzas/calculadora-impuesto-vehicular": "Impuesto Vehicular",
  "/finanzas/comparador-cdt": "Comparador de CDTs",
  "/finanzas/comparador-prestamos": "Comparador de Préstamos",
  "/finanzas/simulador-tarjeta-credito": "Tarjeta de Crédito",
  "/finanzas/simulador-cuenta-ahorro": "Cuentas de Ahorro",
  "/finanzas/arriendo-vs-compra": "Arrendar o Comprar",
  "/salud/calculadora-imc": "IMC",
  "/salud/calculadora-calorias": "Calorías",
  "/salud/calculadora-hidratacion": "Hidratación",
  "/salud/calculadora-frecuencia-cardiaca": "Frecuencia Cardíaca",
  "/salud/calculadora-sueno": "Sueño",
  "/productividad": "Productividad",
  "/productividad/valor-hora": "Valor de tu Hora",
  "/productividad/calculadora-habitos": "Hábitos",
  "/productividad/calculadora-pomodoro": "Pomodoro",
  "/productividad/matriz-eisenhower": "Matriz Eisenhower",
  "/productividad/vida-en-semanas": "Vida en Semanas",
  "/productividad/auditoria-tiempo": "Auditoría de Tiempo",
  "/herramientas/calculadora-descuentos": "Descuentos",
  "/herramientas/calculadora-dias-vividos": "Días Vividos",
  "/herramientas/calculadora-diferencia-fechas": "Diferencia entre Fechas",
  "/herramientas/calculadora-dividir-cuenta": "Dividir Cuenta",
  "/herramientas/calculadora-iva": "IVA",
  "/herramientas/calculadora-porcentajes": "Porcentajes",
  "/herramientas/conversor-unidades": "Conversor de Unidades",
};
