import Link from "next/link";
import { Icon, getIconName } from "@/lib/icons";

interface Calculator {
  name: string;
  href: string;
  description: string;
  emoji?: string;
  icon?: string;
}

interface RelatedCalculatorsProps {
  calculators: Calculator[];
  title?: string;
}

export function RelatedCalculators({
  calculators,
  title = "Calculadoras Relacionadas",
}: RelatedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
        <span className="w-8 h-8 bg-indigo-50 dark:bg-indigo-950 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Icon name="link" className="w-4 h-4" />
        </span>
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {calculators.map((calc) => {
          const iconName = calc.icon || (calc.emoji ? getIconName(calc.emoji) : "calculator");
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 ring-1 ring-slate-100 dark:ring-slate-700 hover:ring-indigo-200 dark:hover:ring-indigo-800 transition-all group flex items-center gap-3"
            >
              <span className="text-indigo-600 dark:text-indigo-400">
                <Icon name={iconName} className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {calc.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {calc.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
