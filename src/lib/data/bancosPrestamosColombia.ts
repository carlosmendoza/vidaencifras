// Datos de referencia de préstamos de bancos colombianos
// NOTA: Estas tasas son aproximadas y deben verificarse con cada entidad
// Última actualización: Enero 2025

export interface BancoPrestamo {
  nombre: string;
  logo?: string;
  tasasLibreInversion: {
    min: number;
    max: number;
    tipica: number;
  };
  tasasVehiculo: {
    min: number;
    max: number;
    tipica: number;
  };
  tasasVivienda: {
    min: number;
    max: number;
    tipica: number;
  };
  plazosLibreInversion: number[]; // en meses
  plazosVehiculo: number[];
  plazosVivienda: number[]; // en años
  montoMinimo: number;
  montoMaximo: number;
  seguroVida: number; // porcentaje sobre saldo
  administracion: number; // costo mensual aproximado
  estudio: number; // costo estudio de crédito
}

export const BANCOS_PRESTAMOS: BancoPrestamo[] = [
  {
    nombre: "Bancolombia",
    tasasLibreInversion: { min: 18.5, max: 26.5, tipica: 22.5 },
    tasasVehiculo: { min: 14.0, max: 20.0, tipica: 17.0 },
    tasasVivienda: { min: 10.5, max: 14.0, tipica: 12.0 },
    plazosLibreInversion: [12, 24, 36, 48, 60, 72],
    plazosVehiculo: [12, 24, 36, 48, 60, 72, 84],
    plazosVivienda: [5, 10, 15, 20],
    montoMinimo: 1000000,
    montoMaximo: 500000000,
    seguroVida: 0.05,
    administracion: 15000,
    estudio: 0,
  },
  {
    nombre: "Davivienda",
    tasasLibreInversion: { min: 19.0, max: 27.0, tipica: 23.0 },
    tasasVehiculo: { min: 14.5, max: 21.0, tipica: 17.5 },
    tasasVivienda: { min: 10.8, max: 14.5, tipica: 12.5 },
    plazosLibreInversion: [12, 24, 36, 48, 60],
    plazosVehiculo: [12, 24, 36, 48, 60, 72],
    plazosVivienda: [5, 10, 15, 20],
    montoMinimo: 500000,
    montoMaximo: 400000000,
    seguroVida: 0.048,
    administracion: 12000,
    estudio: 0,
  },
  {
    nombre: "Banco de Bogotá",
    tasasLibreInversion: { min: 18.0, max: 25.0, tipica: 21.5 },
    tasasVehiculo: { min: 13.5, max: 19.5, tipica: 16.5 },
    tasasVivienda: { min: 10.2, max: 13.5, tipica: 11.8 },
    plazosLibreInversion: [12, 24, 36, 48, 60, 72],
    plazosVehiculo: [12, 24, 36, 48, 60, 72, 84],
    plazosVivienda: [5, 10, 15, 20, 25],
    montoMinimo: 1000000,
    montoMaximo: 600000000,
    seguroVida: 0.045,
    administracion: 14000,
    estudio: 0,
  },
  {
    nombre: "BBVA",
    tasasLibreInversion: { min: 17.5, max: 24.5, tipica: 21.0 },
    tasasVehiculo: { min: 13.0, max: 19.0, tipica: 16.0 },
    tasasVivienda: { min: 10.0, max: 13.0, tipica: 11.5 },
    plazosLibreInversion: [12, 24, 36, 48, 60],
    plazosVehiculo: [12, 24, 36, 48, 60, 72],
    plazosVivienda: [5, 10, 15, 20],
    montoMinimo: 500000,
    montoMaximo: 300000000,
    seguroVida: 0.042,
    administracion: 10000,
    estudio: 0,
  },
  {
    nombre: "Scotiabank Colpatria",
    tasasLibreInversion: { min: 19.5, max: 27.5, tipica: 23.5 },
    tasasVehiculo: { min: 15.0, max: 21.5, tipica: 18.0 },
    tasasVivienda: { min: 11.0, max: 14.5, tipica: 12.5 },
    plazosLibreInversion: [12, 24, 36, 48, 60],
    plazosVehiculo: [12, 24, 36, 48, 60, 72],
    plazosVivienda: [5, 10, 15, 20],
    montoMinimo: 1000000,
    montoMaximo: 350000000,
    seguroVida: 0.05,
    administracion: 16000,
    estudio: 0,
  },
  {
    nombre: "Banco de Occidente",
    tasasLibreInversion: { min: 18.5, max: 26.0, tipica: 22.0 },
    tasasVehiculo: { min: 14.0, max: 20.5, tipica: 17.0 },
    tasasVivienda: { min: 10.5, max: 14.0, tipica: 12.0 },
    plazosLibreInversion: [12, 24, 36, 48, 60],
    plazosVehiculo: [12, 24, 36, 48, 60, 72],
    plazosVivienda: [5, 10, 15, 20],
    montoMinimo: 1000000,
    montoMaximo: 400000000,
    seguroVida: 0.048,
    administracion: 13000,
    estudio: 0,
  },
  {
    nombre: "Nu Colombia",
    tasasLibreInversion: { min: 20.0, max: 28.0, tipica: 24.0 },
    tasasVehiculo: { min: 0, max: 0, tipica: 0 }, // No ofrece
    tasasVivienda: { min: 0, max: 0, tipica: 0 }, // No ofrece
    plazosLibreInversion: [6, 12, 18, 24, 36],
    plazosVehiculo: [],
    plazosVivienda: [],
    montoMinimo: 100000,
    montoMaximo: 50000000,
    seguroVida: 0,
    administracion: 0,
    estudio: 0,
  },
  {
    nombre: "Banco Falabella",
    tasasLibreInversion: { min: 21.0, max: 28.5, tipica: 25.0 },
    tasasVehiculo: { min: 0, max: 0, tipica: 0 }, // No ofrece
    tasasVivienda: { min: 0, max: 0, tipica: 0 }, // No ofrece
    plazosLibreInversion: [12, 24, 36, 48],
    plazosVehiculo: [],
    plazosVivienda: [],
    montoMinimo: 500000,
    montoMaximo: 100000000,
    seguroVida: 0.05,
    administracion: 8000,
    estudio: 0,
  },
];

export type TipoPrestamo = "libre_inversion" | "vehiculo" | "vivienda";

export const TIPOS_PRESTAMO = [
  { valor: "libre_inversion" as TipoPrestamo, nombre: "Libre inversión", descripcion: "Para cualquier propósito" },
  { valor: "vehiculo" as TipoPrestamo, nombre: "Vehículo", descripcion: "Compra de carro o moto" },
  { valor: "vivienda" as TipoPrestamo, nombre: "Vivienda", descripcion: "Crédito hipotecario" },
];

export function getTasaTipica(banco: BancoPrestamo, tipo: TipoPrestamo): number {
  switch (tipo) {
    case "libre_inversion":
      return banco.tasasLibreInversion.tipica;
    case "vehiculo":
      return banco.tasasVehiculo.tipica;
    case "vivienda":
      return banco.tasasVivienda.tipica;
  }
}

export function getPlazos(banco: BancoPrestamo, tipo: TipoPrestamo): number[] {
  switch (tipo) {
    case "libre_inversion":
      return banco.plazosLibreInversion;
    case "vehiculo":
      return banco.plazosVehiculo;
    case "vivienda":
      return banco.plazosVivienda.map((a) => a * 12); // Convertir años a meses
  }
}

export function bancoOfreceProducto(banco: BancoPrestamo, tipo: TipoPrestamo): boolean {
  switch (tipo) {
    case "libre_inversion":
      return banco.tasasLibreInversion.tipica > 0;
    case "vehiculo":
      return banco.tasasVehiculo.tipica > 0;
    case "vivienda":
      return banco.tasasVivienda.tipica > 0;
  }
}
