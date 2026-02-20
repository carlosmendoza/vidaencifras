import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, categoryLabels, categoryColors, calculadoraNames } from "@/lib/blog";
import { useMDXComponents } from "../../../../mdx-components";
import { BlogPostJsonLd } from "@/components/BlogPostJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
    alternates: {
      canonical: `https://vidaencifras.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({}, post.category);

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        slug={slug}
        category={post.category}
        image={post.image}
      />
      <article className="max-w-3xl mx-auto">
        <header className="mb-10">
        <Breadcrumbs />

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              categoryColors[post.category] || "bg-slate-500"
            } text-white`}
          >
            {categoryLabels[post.category] || post.category}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-300">
          {post.description}
        </p>

        {post.calculadora && (
          <Link
            href={post.calculadora}
            data-track="cta_click"
            data-track-blog={slug}
            data-track-destino={post.calculadora}
            data-track-posicion="header"
            className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:gap-3 ${
              post.category === "salud"
                ? "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                : post.category === "productividad"
                ? "bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400"
                : post.category === "herramientas"
                ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"
                : "bg-teal-500/10 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
            Calculadora de {calculadoraNames[post.calculadora] || "Calculadora"}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        )}
      </header>

      <div className="prose-custom">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [],
            },
          }}
        />
      </div>

      {post.calculadora && (
        <section className={`mt-12 rounded-2xl p-6 sm:p-8 border ${
          post.category === "salud"
            ? "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50"
            : post.category === "productividad"
            ? "bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900/50"
            : post.category === "herramientas"
            ? "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900/50"
            : "bg-teal-50 border-teal-200 dark:bg-teal-950/30 dark:border-teal-900/50"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white ${
              post.category === "salud" ? "bg-red-500"
                : post.category === "productividad" ? "bg-orange-500"
                : post.category === "herramientas" ? "bg-purple-500"
                : "bg-teal-500"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                Ponlo en práctica
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Usa la calculadora de <strong>{calculadoraNames[post.calculadora] || "Calculadora"}</strong> para aplicar lo que aprendiste en este artículo.
              </p>
            </div>
            <Link
              href={post.calculadora}
              data-track="cta_click"
              data-track-blog={slug}
              data-track-destino={post.calculadora}
              data-track-posicion="final_articulo"
              className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:gap-3 hover:shadow-md ${
                post.category === "salud" ? "bg-red-500 hover:bg-red-600"
                  : post.category === "productividad" ? "bg-orange-500 hover:bg-orange-600"
                  : post.category === "herramientas" ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Ir a la calculadora
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      )}

      <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <Link
          href="/blog"
          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          ← Ver más artículos
        </Link>
      </footer>
      </article>

      {post.calculadora && (
        <Link
          href={post.calculadora}
          aria-label={`Ir a calculadora de ${calculadoraNames[post.calculadora] || "Calculadora"}`}
          data-track="cta_click"
          data-track-blog={slug}
          data-track-destino={post.calculadora}
          data-track-posicion="flotante"
          className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 ${
            post.category === "salud" ? "bg-red-500"
              : post.category === "productividad" ? "bg-orange-500"
              : post.category === "herramientas" ? "bg-purple-500"
              : "bg-teal-500"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          <span className="hidden sm:inline">{calculadoraNames[post.calculadora] || "Calculadora"}</span>
          <span className="sm:hidden">Calcular</span>
        </Link>
      )}
    </>
  );
}
