import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, categoryLabels, categoryColors } from "@/lib/blog";

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

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Próximamente nuevos artículos...
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="card-glass p-6 h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
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
                    <time className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    {post.calculadora && (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        + Calculadora
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
