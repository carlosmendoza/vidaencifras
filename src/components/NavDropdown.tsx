"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categorias = [
  {
    nombre: "Salud",
    descripcion: "Calorías, IMC y bienestar",
    href: "/salud",
    emoji: "❤️",
    color: "text-red-500",
  },
  {
    nombre: "Finanzas",
    descripcion: "Inversiones, préstamos y gastos",
    href: "/finanzas",
    emoji: "💰",
    color: "text-emerald-500",
  },
  {
    nombre: "Productividad",
    descripcion: "Tiempo, hábitos y metas",
    href: "/productividad",
    emoji: "⏱️",
    color: "text-amber-500",
  },
  {
    nombre: "Utilidades",
    descripcion: "Porcentajes, conversiones y más",
    href: "/herramientas",
    emoji: "🔧",
    color: "text-indigo-500",
  },
];

export function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = categorias.some(
    (cat) => pathname.startsWith(cat.href) || pathname === cat.href
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={`flex items-center gap-1 transition-colors ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        }`}
      >
        Herramientas
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          {categorias.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                pathname.startsWith(cat.href)
                  ? "bg-slate-50 dark:bg-slate-800"
                  : ""
              }`}
            >
              <span className={`text-xl ${cat.color}`}>{cat.emoji}</span>
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                  {cat.nombre}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {cat.descripcion}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
