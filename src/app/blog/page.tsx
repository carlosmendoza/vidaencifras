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
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black gradient-text">Blog</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Guías, consejos y artículos para entender tus cifras y tomar mejores
          decisiones
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
