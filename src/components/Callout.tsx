import { ReactNode } from "react";

type CalloutType = "tip" | "warning" | "info" | "example";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const styles: Record<
  CalloutType,
  { bg: string; border: string; icon: string; titleColor: string }
> = {
  tip: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-500",
    icon: "💡",
    titleColor: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-500",
    icon: "⚠️",
    titleColor: "text-amber-700 dark:text-amber-400",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-500",
    icon: "ℹ️",
    titleColor: "text-blue-700 dark:text-blue-400",
  },
  example: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-500",
    icon: "📝",
    titleColor: "text-purple-700 dark:text-purple-400",
  },
};

const defaultTitles: Record<CalloutType, string> = {
  tip: "Consejo",
  warning: "Importante",
  info: "Información",
  example: "Ejemplo",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = styles[type];
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={`my-6 p-4 rounded-xl border-l-4 ${style.bg} ${style.border}`}
    >
      <div className={`font-semibold mb-2 flex items-center gap-2 ${style.titleColor}`}>
        <span>{style.icon}</span>
        <span>{displayTitle}</span>
      </div>
      <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
}
