"use client";

import { Icon } from "@/lib/icons";

export default function SearchTrigger() {
    const handleOpen = () => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
    };

    return (
        <button
            onClick={handleOpen}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors hidden sm:block"
            aria-label="Buscar herramienta"
        >
            <Icon name="search" className="w-5 h-5" />
        </button>
    );
}
