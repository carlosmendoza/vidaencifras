import { describe, it, expect } from "vitest";
import { calcularLiquidacion } from "../liquidacion";
import { AUXILIO_TRANSPORTE, SMMLV } from "../constantes";

describe("calcularLiquidacion", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularLiquidacion({
      salario: 0,
      incluyeTransporte: true,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })).toBeNull();
  });

  it("retorna null si faltan fechas", () => {
    expect(calcularLiquidacion({
      salario: 2000000,
      incluyeTransporte: true,
      fechaIngreso: "",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })).toBeNull();
  });

  it("aplica auxilio de transporte solo hasta 2 SMMLV", () => {
    const conAuxilio = calcularLiquidacion({
      salario: SMMLV,
      incluyeTransporte: true,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-06-30",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    expect(conAuxilio.aplicaAuxilio).toBe(true);
    expect(conAuxilio.salarioBase).toBe(SMMLV + AUXILIO_TRANSPORTE);

    const sinAuxilio = calcularLiquidacion({
      salario: SMMLV * 3,
      incluyeTransporte: true,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-06-30",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    expect(sinAuxilio.aplicaAuxilio).toBe(false);
    expect(sinAuxilio.salarioBase).toBe(SMMLV * 3);
  });

  it("calcula prima proporcional al semestre", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-06-30",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    // 180 días de semestre, prima = (3000000 * 180) / 360 = 1500000
    expect(res.prima).toBeCloseTo(1500000, -1);
  });

  it("calcula cesantías proporcional al año", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    // 360 días de año, cesantías = (3000000 * ~360) / 360 ≈ 3000000
    expect(res.cesantias).toBeCloseTo(3000000, -2);
  });

  it("calcula intereses sobre cesantías al 12%", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    // Intereses = cesantías * 0.12 * días / 360
    expect(res.interesesCesantias).toBeCloseTo(res.cesantias * 0.12, -2);
  });

  it("no incluye indemnización por renuncia", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2023-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
    })!;
    expect(res.indemnizacion).toBe(0);
  });

  it("calcula indemnización por despido sin justa causa (menos de 1 año)", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-06-01",
      fechaSalida: "2024-12-01",
      tipoTerminacion: "despido_sin_justa_causa",
      tipoContrato: "indefinido",
    })!;
    // Menos de 1 año: 30 días de salario
    expect(res.indemnizacion).toBeCloseTo(3000000, -1);
  });

  it("calcula indemnización por despido sin justa causa (más de 1 año, salario normal)", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2021-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "despido_sin_justa_causa",
      tipoContrato: "indefinido",
    })!;
    // >1 año: 30 días primer año + 20 días por año adicional
    expect(res.indemnizacion).toBeGreaterThan(3000000);
  });

  it("usa 15 días por año adicional para salarios altos (≥10 SMMLV)", () => {
    const res = calcularLiquidacion({
      salario: SMMLV * 10,
      incluyeTransporte: false,
      fechaIngreso: "2021-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "despido_sin_justa_causa",
      tipoContrato: "indefinido",
    })!;

    const resNormal = calcularLiquidacion({
      salario: SMMLV * 3,
      incluyeTransporte: false,
      fechaIngreso: "2021-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "despido_sin_justa_causa",
      tipoContrato: "indefinido",
    })!;

    // El ratio de indemnización/salarioDia debería ser menor para salarios altos
    const ratioAlto = res.indemnizacion / (SMMLV * 10 / 30);
    const ratioNormal = resNormal.indemnizacion / (SMMLV * 3 / 30);
    expect(ratioAlto).toBeLessThan(ratioNormal);
  });

  it("usa días de vacaciones pendientes personalizados", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "renuncia",
      tipoContrato: "indefinido",
      diasVacacionesPendientes: 10,
    })!;
    expect(res.diasVacaciones).toBe(10);
    expect(res.vacaciones).toBeCloseTo(1000000, -1);
  });

  it("totalLiquidacion es la suma de todos los componentes", () => {
    const res = calcularLiquidacion({
      salario: 3000000,
      incluyeTransporte: false,
      fechaIngreso: "2024-01-01",
      fechaSalida: "2024-12-31",
      tipoTerminacion: "despido_sin_justa_causa",
      tipoContrato: "indefinido",
    })!;
    const suma = res.prima + res.cesantias + res.interesesCesantias + res.vacaciones + res.indemnizacion;
    expect(res.totalLiquidacion).toBeCloseTo(suma, 0);
  });
});
