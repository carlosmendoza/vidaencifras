// Tarifas de impuesto vehicular por departamento en Colombia
// Las tarifas varían según el valor comercial y tipo de vehículo
// Última actualización: Enero 2026

export interface TarifaVehiculo {
  rangoMin: number;
  rangoMax: number;
  tarifa: number; // porcentaje
}

export interface DepartamentoConfig {
  nombre: string;
  codigo: string;
  tarifasParticular: TarifaVehiculo[];
  tarifasMoto: TarifaVehiculo[];
  tarifasPublico: TarifaVehiculo[];
  tarifasCarga: TarifaVehiculo[];
  descuentoProntoPago: number; // porcentaje
  fechaLimiteProntoPago: string; // descripción
}

// Tarifas estándar usadas por la mayoría de departamentos
const TARIFAS_ESTANDAR_PARTICULAR: TarifaVehiculo[] = [
  { rangoMin: 0, rangoMax: 45000000, tarifa: 1.5 },
  { rangoMin: 45000001, rangoMax: 90000000, tarifa: 2.5 },
  { rangoMin: 90000001, rangoMax: Infinity, tarifa: 3.5 },
];

const TARIFAS_ESTANDAR_MOTO: TarifaVehiculo[] = [
  { rangoMin: 0, rangoMax: 5000000, tarifa: 1.0 },
  { rangoMin: 5000001, rangoMax: 15000000, tarifa: 1.5 },
  { rangoMin: 15000001, rangoMax: Infinity, tarifa: 2.0 },
];

const TARIFAS_ESTANDAR_PUBLICO: TarifaVehiculo[] = [
  { rangoMin: 0, rangoMax: Infinity, tarifa: 0.5 },
];

const TARIFAS_ESTANDAR_CARGA: TarifaVehiculo[] = [
  { rangoMin: 0, rangoMax: 45000000, tarifa: 1.0 },
  { rangoMin: 45000001, rangoMax: Infinity, tarifa: 1.5 },
];

export const DEPARTAMENTOS: DepartamentoConfig[] = [
  {
    nombre: "Bogotá D.C.",
    codigo: "BOG",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 24 de abril",
  },
  {
    nombre: "Antioquia",
    codigo: "ANT",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Valle del Cauca",
    codigo: "VAL",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Cundinamarca",
    codigo: "CUN",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 24 de abril",
  },
  {
    nombre: "Atlántico",
    codigo: "ATL",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 31 de mayo",
  },
  {
    nombre: "Santander",
    codigo: "SAN",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Bolívar",
    codigo: "BOL",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "Norte de Santander",
    codigo: "NOS",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Tolima",
    codigo: "TOL",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Risaralda",
    codigo: "RIS",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Caldas",
    codigo: "CAL",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Huila",
    codigo: "HUI",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Boyacá",
    codigo: "BOY",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Meta",
    codigo: "MET",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Nariño",
    codigo: "NAR",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Córdoba",
    codigo: "COR",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "Magdalena",
    codigo: "MAG",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "Cesar",
    codigo: "CES",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "Cauca",
    codigo: "CAU",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Quindío",
    codigo: "QUI",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Sucre",
    codigo: "SUC",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "La Guajira",
    codigo: "GUA",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de junio",
  },
  {
    nombre: "Casanare",
    codigo: "CAS",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Arauca",
    codigo: "ARA",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Putumayo",
    codigo: "PUT",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Caquetá",
    codigo: "CAQ",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Chocó",
    codigo: "CHO",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Amazonas",
    codigo: "AMA",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Guainía",
    codigo: "GUN",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Guaviare",
    codigo: "GUV",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Vaupés",
    codigo: "VAU",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "Vichada",
    codigo: "VIC",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
  {
    nombre: "San Andrés",
    codigo: "SAP",
    tarifasParticular: TARIFAS_ESTANDAR_PARTICULAR,
    tarifasMoto: TARIFAS_ESTANDAR_MOTO,
    tarifasPublico: TARIFAS_ESTANDAR_PUBLICO,
    tarifasCarga: TARIFAS_ESTANDAR_CARGA,
    descuentoProntoPago: 10,
    fechaLimiteProntoPago: "Hasta el 30 de abril",
  },
];

export type TipoVehiculo = "particular" | "moto" | "publico" | "carga";

export const TIPOS_VEHICULO = [
  { valor: "particular" as TipoVehiculo, nombre: "Particular", descripcion: "Automóvil o camioneta particular" },
  { valor: "moto" as TipoVehiculo, nombre: "Motocicleta", descripcion: "Moto de cualquier cilindraje" },
  { valor: "publico" as TipoVehiculo, nombre: "Público", descripcion: "Taxi, bus, transporte público" },
  { valor: "carga" as TipoVehiculo, nombre: "Carga", descripcion: "Camión, furgón de carga" },
];

export function getTarifas(departamento: DepartamentoConfig, tipo: TipoVehiculo): TarifaVehiculo[] {
  switch (tipo) {
    case "particular":
      return departamento.tarifasParticular;
    case "moto":
      return departamento.tarifasMoto;
    case "publico":
      return departamento.tarifasPublico;
    case "carga":
      return departamento.tarifasCarga;
  }
}

export function calcularImpuesto(valorComercial: number, tarifas: TarifaVehiculo[]): { impuesto: number; tarifa: number } {
  const tarifaAplicable = tarifas.find(
    (t) => valorComercial >= t.rangoMin && valorComercial <= t.rangoMax
  );
  if (!tarifaAplicable) {
    return { impuesto: 0, tarifa: 0 };
  }
  return {
    impuesto: valorComercial * (tarifaAplicable.tarifa / 100),
    tarifa: tarifaAplicable.tarifa,
  };
}
