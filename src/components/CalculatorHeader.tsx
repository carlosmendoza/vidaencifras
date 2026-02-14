import { gradients, shadowColors } from "@/lib/colors";
import { Icon } from "@/lib/icons";

type CategoryKey = keyof typeof gradients;

interface CalculatorHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
  gradient: CategoryKey;
}

export function CalculatorHeader({
  title,
  subtitle,
  icon,
  gradient,
}: CalculatorHeaderProps) {
  const gradientClass = gradients[gradient];
  const shadowClass = shadowColors[gradient];

  return (
    <div className="text-center mb-10">
      <div
        className={`w-20 h-20 ${gradientClass} rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg ${shadowClass}`}
      >
        <Icon name={icon} className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 font-medium">
        {subtitle}
      </p>
    </div>
  );
}
