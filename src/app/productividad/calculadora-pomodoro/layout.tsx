import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Pomodoro | Planifica tu Tiempo de Trabajo y Descanso",
  description:
    "Calcula cuántos pomodoros necesitas para completar tus tareas. Planifica sesiones de trabajo con la técnica Pomodoro y optimiza tu productividad.",
  keywords: [
    "técnica pomodoro",
    "calculadora pomodoro",
    "productividad",
    "gestión del tiempo",
    "trabajo enfocado",
    "descansos productivos",
    "planificador pomodoro",
    "método pomodoro",
  ],
  openGraph: {
    title: "Calculadora Pomodoro",
    description:
      "Planifica tus sesiones de trabajo con la técnica Pomodoro. Calcula tiempo total y descansos.",
    type: "website",
  },
};

export default function PomodoroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
