import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matriz de Eisenhower | Prioriza Tareas por Urgencia e Importancia",
  description:
    "Organiza tus tareas con la Matriz de Eisenhower. Clasifica actividades por urgencia e importancia para mejorar tu productividad y enfoque.",
  keywords: [
    "matriz eisenhower",
    "priorización tareas",
    "urgente importante",
    "gestión del tiempo",
    "productividad personal",
    "organización tareas",
    "método eisenhower",
    "cuadrantes eisenhower",
  ],
  openGraph: {
    title: "Matriz de Eisenhower",
    description:
      "Prioriza tus tareas por urgencia e importancia. Organiza tu día de forma efectiva.",
    type: "website",
  },
};

export default function MatrizEisenhowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
