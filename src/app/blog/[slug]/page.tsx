import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, categoryLabels, categoryColors } from "@/lib/blog";
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
            Usar calculadora
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
          aria-label="Ir a la calculadora"
          className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110 active:scale-95 ${
            post.category === "salud" ? "bg-red-500"
              : post.category === "productividad" ? "bg-orange-500"
              : post.category === "herramientas" ? "bg-purple-500"
              : "bg-teal-500"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
        </Link>
      )}
    </>
  );
}
