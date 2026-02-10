"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categorias = [
  { nombre: "Salud", href: "/salud", emoji: "❤️" },
  { nombre: "Finanzas", href: "/finanzas", emoji: "💰" },
  { nombre: "Productividad", href: "/productividad", emoji: "⏱️" },
  { nombre: "Utilidades", href: "/herramientas", emoji: "🔧" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-lg">
          <nav className="flex flex-col p-4 space-y-1">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Herramientas
            </div>
            {categorias.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                  pathname.startsWith(cat.href)
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.nombre}
              </Link>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
            <Link
              href="/blog"
              onClick={closeMenu}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname.startsWith("/blog")
                  ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
