import { Metadata } from "next";
import { getAllPosts, categoryLabels, categoryColors } from "@/lib/blog";
import { BlogFilters } from "./BlogFilters";

export const metadata: Metadata = {
  title: "Blog - Guías y Consejos",
  description:
    "Artículos sobre finanzas personales, salud, productividad y más. Aprende a interpretar tus cifras y tomar mejores decisiones.",
  openGraph: {
    title: "Blog - VidaEnCifras",
    description:
      "Artículos sobre finanzas personales, salud, productividad y más.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          Blog
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          Guías, consejos y artículos para entender tus cifras y tomar mejores decisiones.
        </p>
      </header>

      <BlogFilters
        posts={posts}
        categoryLabels={categoryLabels}
        categoryColors={categoryColors}
      />
    </div>
  );
}
