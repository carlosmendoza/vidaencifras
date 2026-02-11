export interface PrestamoInput {
  monto: number;
  tasaAnual: number; // Porcentaje (ej: 12 para 12%)
  plazoMeses: number;
}

export interface AmortizacionFila {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
}

export interface PrestamoOutput {
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  amortizacion: AmortizacionFila[];
}

export function calcularPrestamo(input: PrestamoInput): PrestamoOutput | null {
  const { monto, tasaAnual, plazoMeses } = input;

  if (monto <= 0 || plazoMeses <= 0 || isNaN(monto) || isNaN(tasaAnual) || isNaN(plazoMeses)) return null;

  const r = tasaAnual / 100 / 12;

  let cuotaMensual: number;
  if (r === 0) {
    cuotaMensual = monto / plazoMeses;
  } else {
    cuotaMensual = monto * (r * Math.pow(1 + r, plazoMeses)) / (Math.pow(1 + r, plazoMeses) - 1);
  }

  const totalPagar = cuotaMensual * plazoMeses;
  const totalIntereses = totalPagar - monto;

  const amortizacion: AmortizacionFila[] = [];
  let saldo = monto;

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const interesMes = saldo * r;
    const capitalMes = cuotaMensual - interesMes;
    saldo -= capitalMes;

    amortizacion.push({
      mes,
      cuota: cuotaMensual,
      capital: capitalMes,
      interes: interesMes,
      saldo: Math.max(0, saldo),
    });
  }

  return {
    cuotaMensual,
    totalPagar,
    totalIntereses,
    amortizacion,
  };
}
