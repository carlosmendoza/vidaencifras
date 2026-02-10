"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  calculadora?: string;
  readingTime: string;
}

interface Props {
  posts: BlogPostMeta[];
  categoryLabels: Record<string, string>;
  categoryColors: Record<string, string>;
}

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "finanzas", label: "Finanzas" },
  { id: "salud", label: "Salud" },
  { id: "productividad", label: "Productividad" },
  { id: "herramientas", label: "Herramientas" },
];

export function BlogFilters({ posts, categoryLabels, categoryColors }: Props) {
  const [filtro, setFiltro] = useState("todos");

  const postsFiltrados =
    filtro === "todos" ? posts : posts.filter((p) => p.category === filtro);

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFiltro(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filtro === cat.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {postsFiltrados.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {filtro === "todos"
              ? "Próximamente nuevos artículos..."
              : `No hay artículos de ${categoryLabels[filtro] || filtro} todavía`}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {postsFiltrados.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="card-glass p-6 h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${
                        categoryColors[post.category] ||
                        "from-slate-500 to-slate-600"
                      } text-white`}
                    >
                      {categoryLabels[post.category] || post.category}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {post.calculadora && (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        + Calculadora incluida
                      </span>
                    )}
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm ml-auto group-hover:translate-x-1 transition-transform">
                      Leer más →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
