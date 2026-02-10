import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, categoryLabels, categoryColors } from "@/lib/blog";
import { useMDXComponents } from "../../../../mdx-components";

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
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/blog"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            ← Volver al blog
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${
              categoryColors[post.category] || "from-slate-500 to-slate-600"
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
        <div className="mt-12 p-6 card-glass bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            Prueba la calculadora
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Aplica lo que aprendiste con nuestra herramienta gratuita.
          </p>
          <Link
            href={post.calculadora}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Ir a la calculadora →
          </Link>
        </div>
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
  );
}
