"use client";

import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const positionClasses = position === "top"
    ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
    : "top-full left-1/2 -translate-x-1/2 mt-2";

  const arrowClasses = position === "top"
    ? "top-full left-1/2 -translate-x-1/2 border-t-slate-800 dark:border-t-slate-700 border-l-transparent border-r-transparent border-b-transparent"
    : "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 dark:border-b-slate-700 border-l-transparent border-r-transparent border-t-transparent";

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isMounted && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`
            absolute z-50 ${positionClasses}
            px-3 py-2 text-sm text-white
            bg-slate-800 dark:bg-slate-700
            rounded-lg shadow-lg
            whitespace-nowrap max-w-xs
            transition-all duration-150 ease-out
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          {content}
          <div
            className={`
              absolute w-0 h-0
              border-[6px] ${arrowClasses}
            `}
          />
        </div>
      )}
    </div>
  );
}

interface TooltipIconProps {
  content: string;
  position?: "top" | "bottom";
}

export function TooltipIcon({ content, position = "top" }: TooltipIconProps) {
  return (
    <Tooltip content={content} position={position}>
      <button
        type="button"
        className="ml-1.5 w-5 h-5 inline-flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Más información"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </Tooltip>
  );
}
