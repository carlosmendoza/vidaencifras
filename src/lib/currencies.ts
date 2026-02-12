export interface Moneda {
  codigo: string;
  simbolo: string;
  nombre: string;
  locale: string;
}

export const monedas: Moneda[] = [
  { codigo: "COP", simbolo: "$", nombre: "Peso colombiano", locale: "es-CO" },
  { codigo: "USD", simbolo: "$", nombre: "Dólar estadounidense", locale: "en-US" },
  { codigo: "EUR", simbolo: "€", nombre: "Euro", locale: "es-ES" },
  { codigo: "MXN", simbolo: "$", nombre: "Peso mexicano", locale: "es-MX" },
  { codigo: "ARS", simbolo: "$", nombre: "Peso argentino", locale: "es-AR" },
  { codigo: "CLP", simbolo: "$", nombre: "Peso chileno", locale: "es-CL" },
  { codigo: "PEN", simbolo: "S/", nombre: "Sol peruano", locale: "es-PE" },
  { codigo: "BRL", simbolo: "R$", nombre: "Real brasileño", locale: "pt-BR" },
  { codigo: "UYU", simbolo: "$", nombre: "Peso uruguayo", locale: "es-UY" },
  { codigo: "BOB", simbolo: "Bs", nombre: "Boliviano", locale: "es-BO" },
  { codigo: "PYG", simbolo: "₲", nombre: "Guaraní paraguayo", locale: "es-PY" },
  { codigo: "VES", simbolo: "Bs", nombre: "Bolívar venezolano", locale: "es-VE" },
  { codigo: "GTQ", simbolo: "Q", nombre: "Quetzal guatemalteco", locale: "es-GT" },
  { codigo: "HNL", simbolo: "L", nombre: "Lempira hondureño", locale: "es-HN" },
  { codigo: "NIO", simbolo: "C$", nombre: "Córdoba nicaragüense", locale: "es-NI" },
  { codigo: "CRC", simbolo: "₡", nombre: "Colón costarricense", locale: "es-CR" },
  { codigo: "PAB", simbolo: "B/.", nombre: "Balboa panameño", locale: "es-PA" },
  { codigo: "DOP", simbolo: "RD$", nombre: "Peso dominicano", locale: "es-DO" },
  { codigo: "CUP", simbolo: "$", nombre: "Peso cubano", locale: "es-CU" },
];

export const monedaDefault: Moneda = monedas[0]; // COP

export function detectarMoneda(): Moneda {
  if (typeof navigator === "undefined") return monedaDefault;

  const locale = navigator.language || "en-US";

  // Buscar coincidencia exacta por locale
  const encontrada = monedas.find(m => m.locale.toLowerCase() === locale.toLowerCase());
  if (encontrada) return encontrada;

  // Buscar por código de país
  const codigoPais = locale.split("-")[1]?.toUpperCase();
  if (codigoPais) {
    const porPais = monedas.find(m => m.locale.endsWith(codigoPais));
    if (porPais) return porPais;
  }

  // Buscar por idioma
  const idioma = locale.split("-")[0].toLowerCase();
  if (idioma === "es") return monedaDefault; // COP por defecto para español
  if (idioma === "pt") return monedas.find(m => m.codigo === "BRL") || monedaDefault;

  return monedaDefault;
}

export function formatMoney(num: number, moneda: Moneda, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 2;
  return new Intl.NumberFormat(moneda.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// --- Utilidades para formateo de inputs monetarios ---

const separatorCache = new Map<string, { thousands: string; decimal: string }>();

export function getSeparators(locale: string): { thousands: string; decimal: string } {
  const cached = separatorCache.get(locale);
  if (cached) return cached;

  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89);
  const thousands = parts.find(p => p.type === "group")?.value ?? ".";
  const decimal = parts.find(p => p.type === "decimal")?.value ?? ",";
  const result = { thousands, decimal };
  separatorCache.set(locale, result);
  return result;
}

export function getThousandSeparator(locale: string): string {
  return getSeparators(locale).thousands;
}

export function getDecimalSeparator(locale: string): string {
  return getSeparators(locale).decimal;
}

export function formatInputValue(rawValue: string, locale: string): string {
  if (!rawValue) return "";

  const { thousands, decimal } = getSeparators(locale);
  const hasDecimal = rawValue.includes(".");
  const [intPart, decPart] = rawValue.split(".");

  // Formatear parte entera con separadores de miles
  const digits = intPart.replace(/^0+(?=\d)/, ""); // quitar ceros al inicio
  let formatted = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) {
      formatted += thousands;
    }
    formatted += digits[i];
  }

  if (!formatted) formatted = "0";

  if (hasDecimal) {
    formatted += decimal + (decPart ?? "");
  }

  return formatted;
}

export function parseFormattedValue(displayValue: string, locale: string): string {
  if (!displayValue) return "";

  const { thousands, decimal } = getSeparators(locale);

  let result = displayValue;
  // Eliminar separadores de miles
  result = result.split(thousands).join("");
  // Convertir separador decimal a punto
  if (decimal !== ".") {
    result = result.replace(decimal, ".");
  }

  return result;
}

export function formatMoneyShort(num: number, moneda: Moneda): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)} mil millones`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(0)} millones`;
  }
  return formatMoney(num, moneda, { decimals: 0 });
}
