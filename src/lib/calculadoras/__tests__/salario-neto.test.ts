import { describe, it, expect } from "vitest";
import { calcularSalarioNeto } from "../salario-neto";
import { SMMLV, AUXILIO_TRANSPORTE, UVT_2026 } from "../constantes";

describe("calcularSalarioNeto", () => {
  it("retorna null si el salario es 0", () => {
    expect(calcularSalarioNeto({
      salario: 0,
      incluyeTransporte: true,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })).toBeNull();
  });

  it("calcula descuentos básicos para SMMLV", () => {
    const res = calcularSalarioNeto({
      salario: SMMLV,
      incluyeTransporte: true,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;

    expect(res.descuentoSalud).toBeCloseTo(SMMLV * 0.04, 0);
    expect(res.descuentoPension).toBeCloseTo(SMMLV * 0.04, 0);
    expect(res.fondoSolidaridad).toBe(0); // SMMLV < 4 SMMLV
    expect(res.auxilioTransporte).toBe(AUXILIO_TRANSPORTE);
    expect(res.salarioNeto).toBeCloseTo(SMMLV - SMMLV * 0.08 + AUXILIO_TRANSPORTE, 0);
  });

  it("no aplica auxilio para salarios mayores a 2 SMMLV", () => {
    const res = calcularSalarioNeto({
      salario: SMMLV * 3,
      incluyeTransporte: true,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    expect(res.auxilioTransporte).toBe(0);
  });

  it("aplica fondo de solidaridad desde 4 SMMLV", () => {
    const salario = SMMLV * 5;
    const res = calcularSalarioNeto({
      salario,
      incluyeTransporte: false,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    expect(res.fondoSolidaridad).toBeCloseTo(salario * 0.01, 0);
  });

  it("aplica 2% fondo solidaridad desde 16 SMMLV", () => {
    const salario = SMMLV * 16;
    const res = calcularSalarioNeto({
      salario,
      incluyeTransporte: false,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    expect(res.fondoSolidaridad).toBeCloseTo(salario * 0.02, 0);
  });

  it("no aplica retención si no se activa", () => {
    const res = calcularSalarioNeto({
      salario: SMMLV * 10,
      incluyeTransporte: false,
      calcularRetencion: false,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    expect(res.retencionFuente).toBe(0);
  });

  it("calcula retención para salarios altos", () => {
    const salario = SMMLV * 8;
    const res = calcularSalarioNeto({
      salario,
      incluyeTransporte: false,
      calcularRetencion: true,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    expect(res.retencionFuente).toBeGreaterThan(0);
    expect(res.baseGravable).toBeGreaterThan(0);
  });

  it("no aplica retención para SMMLV", () => {
    const res = calcularSalarioNeto({
      salario: SMMLV,
      incluyeTransporte: true,
      calcularRetencion: true,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    // SMMLV está por debajo de 95 UVT de base gravable
    expect(res.retencionFuente).toBe(0);
  });

  it("deducciones reducen la retención", () => {
    const salario = SMMLV * 8;
    const sinDeducciones = calcularSalarioNeto({
      salario,
      incluyeTransporte: false,
      calcularRetencion: true,
      dependientes: 0,
      medicinaPrepagada: 0,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;

    const conDeducciones = calcularSalarioNeto({
      salario,
      incluyeTransporte: false,
      calcularRetencion: true,
      dependientes: 2,
      medicinaPrepagada: 500000,
      interesesVivienda: 1000000,
      aportesAfc: 1000000,
    })!;

    expect(conDeducciones.retencionFuente).toBeLessThan(sinDeducciones.retencionFuente);
    expect(conDeducciones.salarioNeto).toBeGreaterThan(sinDeducciones.salarioNeto);
  });

  it("totalDescuentos es la suma de todos los descuentos", () => {
    const res = calcularSalarioNeto({
      salario: SMMLV * 5,
      incluyeTransporte: false,
      calcularRetencion: true,
      dependientes: 1,
      medicinaPrepagada: 200000,
      interesesVivienda: 0,
      aportesAfc: 0,
    })!;
    const suma = res.descuentoSalud + res.descuentoPension + res.fondoSolidaridad + res.retencionFuente;
    expect(res.totalDescuentos).toBeCloseTo(suma, 0);
  });
});
