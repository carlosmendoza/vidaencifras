import Image from "next/image";
import {
  mascotPaths,
  mascotNames,
  type PilarConMascota,
  type MascotVariant,
} from "@/lib/mascots";

const sizePresets = {
  xs: { width: 48, height: 48, className: "w-12 h-12" },
  sm: {
    width: 80,
    height: 80,
    className: "w-16 h-16 md:w-20 md:h-20",
  },
  md: {
    width: 140,
    height: 140,
    className: "w-[120px] h-[120px] md:w-[140px] md:h-[140px]",
  },
  lg: {
    width: 200,
    height: 200,
    className: "w-[85px] h-[85px] md:w-[180px] md:h-[180px]",
  },
} as const;

type MascotSize = keyof typeof sizePresets;

interface PilarMascotProps {
  pilar: PilarConMascota;
  variant?: MascotVariant;
  size?: MascotSize;
  className?: string;
}

export function PilarMascot({
  pilar,
  variant = "default",
  size = "md",
  className = "",
}: PilarMascotProps) {
  const preset = sizePresets[size];
  const src = mascotPaths[pilar][variant];
  const alt = mascotNames[pilar];

  return (
    <Image
      src={src}
      alt={alt}
      width={preset.width}
      height={preset.height}
      className={`${preset.className} object-contain drop-shadow-lg ${className}`}
      priority={size === "lg"}
    />
  );
}
