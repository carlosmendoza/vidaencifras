"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/lib/icons";
import {
    calculadorasFinanzas,
    calculadorasSalud,
    calculadorasProductividad,
    utilidadesDestacadas,
    Calculadora
} from "@/lib/calculators";

const ALL_TOOLS: Calculadora[] = Array.from(
    new Map(
        [
            ...calculadorasFinanzas,
            ...calculadorasSalud,
            ...calculadorasProductividad,
            ...utilidadesDestacadas
        ].map(item => [item.href, item])
    ).values()
);

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredTools = query === ""
        ? ALL_TOOLS.slice(0, 5)
        : ALL_TOOLS.filter(tool =>
            tool.nombre.toLowerCase().includes(query.toLowerCase()) ||
            tool.descripcion.toLowerCase().includes(query.toLowerCase()) ||
            tool.categoria.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const handleSelect = (tool: Calculadora) => {
        router.push(tool.href);
        setIsOpen(false);
        setQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev + 1) % filteredTools.length);
        } else if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev - 1 + filteredTools.length) % filteredTools.length);
        } else if (e.key === "Enter") {
            if (filteredTools[selectedIndex]) {
                handleSelect(filteredTools[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-slate-900/20 dark:bg-slate-950/40 animate-fade-in" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative flex items-center p-4 border-b border-slate-100 dark:border-slate-800">
                    <Icon name="search" className="w-5 h-5 text-slate-400 absolute left-6" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-none focus:ring-0 text-lg pl-10 pr-4 py-2 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                        placeholder="Buscar herramienta..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-400 border border-slate-200 dark:border-slate-700">
                        ESC
                    </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {filteredTools.length > 0 ? (
                        <div className="space-y-1">
                            {filteredTools.map((tool, index) => (
                                <button
                                    key={tool.href}
                                    className={`w-full text-left flex items-center gap-4 p-3 rounded-2xl transition-colors ${index === selectedIndex
                                            ? "bg-indigo-50 dark:bg-indigo-900/40 ring-1 ring-indigo-100 dark:ring-indigo-800"
                                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        }`}
                                    onClick={() => handleSelect(tool)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                                        <Icon name={tool.icon} className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-slate-800 dark:text-slate-100 truncate">{tool.nombre}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{tool.categoria}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{tool.descripcion}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center space-y-2">
                            <Icon name="warning" className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="text-slate-500 dark:text-slate-400">No encontramos herramientas con ese nombre</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[8px]">ENTER</kbd> seleccionar</span>
                        <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[8px]">↑↓</kbd> navegar</span>
                    </div>
                    <span>Búsqueda rápida</span>
                </div>
            </div>
        </div>
    );
}
