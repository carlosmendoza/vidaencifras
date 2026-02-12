import { PilarMascot } from "./PilarMascot";
import type { PilarConMascota, MascotVariant } from "@/lib/mascots";

interface CategoryHeroProps {
  pilar: PilarConMascota;
  variant?: MascotVariant;
  title: React.ReactNode;
  description: string;
  accentBarColor: string;
}

export function CategoryHero({
  pilar,
  variant = "default",
  title,
  description,
  accentBarColor,
}: CategoryHeroProps) {
  return (
    <section className="relative flex items-center justify-between gap-6">
      <div className="space-y-4 flex-1 min-w-0">
        <div className={`w-12 h-1.5 ${accentBarColor} rounded-full`} />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          {title}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          {description}
        </p>
      </div>

      <div className="hidden sm:block flex-shrink-0">
        <PilarMascot
          pilar={pilar}
          variant={variant}
          size="lg"
          className="opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
        />
      </div>
    </section>
  );
}
