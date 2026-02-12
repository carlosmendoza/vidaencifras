// Tipos de pilar que tienen mascota (herramientas no tiene)
export type PilarConMascota = "salud" | "finanzas" | "productividad";

// Variantes de expresión para futuro uso
export type MascotVariant =
  | "default"
  | "happy"
  | "thinking"
  | "concerned"
  | "celebrating";

// Mapeo pilar → archivo SVG por variante (todas apuntan al mismo SVG por ahora)
export const mascotPaths: Record<
  PilarConMascota,
  Record<MascotVariant, string>
> = {
  salud: {
    default: "/heart.svg",
    happy: "/heart-happy.svg",
    thinking: "/heart.svg",
    concerned: "/heart.svg",
    celebrating: "/heart.svg",
  },
  finanzas: {
    default: "/coin.svg",
    happy: "/coin.svg",
    thinking: "/coin.svg",
    concerned: "/coin.svg",
    celebrating: "/coin.svg",
  },
  productividad: {
    default: "/clock.svg",
    happy: "/clock.svg",
    thinking: "/clock.svg",
    concerned: "/clock.svg",
    celebrating: "/clock.svg",
  },
};

// Alt text descriptivo por pilar
export const mascotNames: Record<PilarConMascota, string> = {
  salud: "Corazón, mascota de Salud",
  finanzas: "Moneda, mascota de Finanzas",
  productividad: "Reloj, mascota de Productividad",
};

// Helper para determinar pilar desde pathname
export function getPilarFromPathname(
  pathname: string
): PilarConMascota | null {
  const segment = pathname.split("/")[1];
  if (
    segment === "salud" ||
    segment === "finanzas" ||
    segment === "productividad"
  ) {
    return segment;
  }
  return null;
}
