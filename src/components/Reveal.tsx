"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    threshold?: number;
}

export default function Reveal({ children, className = "", threshold = 0.1 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div ref={ref} className={`reveal ${className}`}>
            {children}
        </div>
    );
}
