"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";

// Cuentas de ahorro disponibles en Colombia (tasas actualizadas febrero 2025)
const CUENTAS_AHORRO = [
  {
    id: "uala",
    nombre: "Ualá",
    tasa: 12.0,
    color: "#8B5CF6",
    nota: "Máximo $10M (depósito de bajo monto)",
    limite: 10000000,
  },
  {
    id: "global66",
    nombre: "Global66",
    tasa: 11.0,
    color: "#06B6D4",
    nota: "Sin límite de saldo",
    limite: null,
  },
  {
    id: "pibank",
    nombre: "Pibank",
    tasa: 11.0,
    color: "#F59E0B",
    nota: "Banco Pichincha, sin costos",
    limite: null,
  },
  {
    id: "rappipay",
    nombre: "RappiPay",
    tasa: 10.0,
    color: "#EF4444",
    nota: "10% con 4+ transacciones/mes, base 9%",
    limite: null,
  },
  {
    id: "lulo-pro",
    nombre: "Lulo Bank Pro",
    tasa: 9.25,
    color: "#10B981",
    nota: "Requiere nómina o $3M ingresos/mes",
    limite: null,
  },
  {
    id: "banco-popular",
    nombre: "Banco Popular",
    tasa: 9.0,
    color: "#3B82F6",
    nota: "Cuenta Plateada",
    limite: null,
  },
  {
    id: "nu",
    nombre: "Nu Colombia",
    tasa: 8.25,
    color: "#A855F7",
    nota: "Cajitas, sin monto mínimo",
    limite: null,
  },
  {
    id: "lulo",
    nombre: "Lulo Bank",
    tasa: 7.5,
    color: "#84CC16",
    nota: "Bolsillos cuenta básica",
    limite: null,
  },
  {
    id: "colchon",
    nombre: "Bajo el colchón",
    tasa: 0,
    color: "#94A3B8",
    nota: "Pierde valor por inflación",
    limite: null,
  },
] as const;

type CuentaId = (typeof CUENTAS_AHORRO)[number]["id"];

const INFLACION_DEFECTO = 5.5;

const faqs = [
  {
    question: "¿Cuál es la mejor cuenta de ahorro en Colombia?",
    answer:
      "Depende de tu situación. Ualá ofrece la mejor tasa (12% EA) pero tiene límite de $10M. Pibank y Global66 ofrecen 11% sin límites. Para montos grandes, considera diversificar entre varias opciones.",
  },
  {
    question: "¿Qué significa tasa EA (Efectiva Anual)?",
    answer:
      "La tasa EA representa el rendimiento real que obtienes en un año, incluyendo el efecto del interés compuesto. Una tasa del 12% EA significa que $1.000.000 se convertirán en $1.120.000 después de un año.",
  },
  {
    question: "¿Por qué guardar dinero bajo el colchón es mala idea?",
    answer:
      "Por la inflación. Si la inflación es del 5% anual, tu dinero pierde poder de compra cada día. Un millón de pesos hoy comprará menos cosas en un año, aunque nominalmente siga siendo un millón.",
  },
  {
    question: "¿Las cuentas de ahorro digitales son seguras?",
    answer:
      "Sí, las entidades listadas están vigiladas por la Superintendencia Financiera de Colombia. Los depósitos están protegidos por Fogafin hasta $50 millones por persona. Puedes retirar tu dinero en cualquier momento.",
  },
  {
    question: "¿Por qué Ualá tiene límite de $10 millones?",
    answer:
      "Ualá opera como SEDPE (Sociedad Especializada en Depósitos y Pagos Electrónicos), lo que le permite ofrecer tasas más altas pero con límite de saldo. Es ideal para tu fondo de emergencia.",
  },
  {
    question: "¿Debo pagar impuestos sobre los intereses ganados?",
    answer:
      "Los intereses de cuentas de ahorro están sujetos a retención en la fuente del 4% para montos mayores a cierto umbral. Sin embargo, esto ya está aplicado por la entidad, así que la tasa que ves es neta.",
  },
];

interface DatoEvolucion {
  mes: number;
  label: string;
  [key: string]: number | string;
}

const CUENTAS_DEFECTO: CuentaId[] = ["uala", "pibank", "nu", "colchon"];

function parseCuentasFromParam(param: string | null): Set<CuentaId> {
  if (!param) return new Set(CUENTAS_DEFECTO);
  const ids = param.split(",").filter((id) =>
    CUENTAS_AHORRO.some((c) => c.id === id)
  ) as CuentaId[];
  return ids.length > 0 ? new Set(ids) : new Set(CUENTAS_DEFECTO);
}

function SimuladorCuentaAhorroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [montoInicial, setMontoInicial] = useState<string>(
    searchParams.get("monto") || "1000000"
  );
  const [inflacion, setInflacion] = useState<string>(
    searchParams.get("inflacion") || INFLACION_DEFECTO.toString()
  );
  const [meses, setMeses] = useState<string>(
    searchParams.get("meses") || "12"
  );
  const [aporteMensual, setAporteMensual] = useState<string>(
    searchParams.get("aporte") || "0"
  );
  const [mostrarAvanzado, setMostrarAvanzado] = useState<boolean>(
    !!searchParams.get("aporte") && searchParams.get("aporte") !== "0"
  );
  const [cuentasSeleccionadas, setCuentasSeleccionadas] = useState<Set<CuentaId>>(
    parseCuentasFromParam(searchParams.get("cuentas"))
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const buildShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams();
    params.set("monto", montoInicial);
    params.set("meses", meses);
    if (inflacion !== INFLACION_DEFECTO.toString()) {
      params.set("inflacion", inflacion);
    }
    if (aporteMensual && aporteMensual !== "0") {
      params.set("aporte", aporteMensual);
    }
    const cuentasArray = [...cuentasSeleccionadas].sort();
    const cuentasDefectoOrdenadas = [...CUENTAS_DEFECTO].sort();
    if (JSON.stringify(cuentasArray) !== JSON.stringify(cuentasDefectoOrdenadas)) {
      params.set("cuentas", cuentasArray.join(","));
    }
    return `${window.location.origin}${pathname}?${params.toString()}`;
  }, [montoInicial, meses, inflacion, aporteMensual, cuentasSeleccionadas, pathname]);

  useEffect(() => {
    if (!isClient) return;
    const params = new URLSearchParams();
    if (montoInicial && montoInicial !== "1000000") {
      params.set("monto", montoInicial);
    }
    if (meses && meses !== "12") {
      params.set("meses", meses);
    }
    if (inflacion && inflacion !== INFLACION_DEFECTO.toString()) {
      params.set("inflacion", inflacion);
    }
    if (aporteMensual && aporteMensual !== "0") {
      params.set("aporte", aporteMensual);
    }
    const cuentasArray = [...cuentasSeleccionadas].sort();
    const cuentasDefectoOrdenadas = [...CUENTAS_DEFECTO].sort();
    if (JSON.stringify(cuentasArray) !== JSON.stringify(cuentasDefectoOrdenadas)) {
      params.set("cuentas", cuentasArray.join(","));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [montoInicial, meses, inflacion, aporteMensual, cuentasSeleccionadas, isClient, pathname, router]);

  const toggleCuenta = (id: CuentaId) => {
    const nuevas = new Set(cuentasSeleccionadas);
    if (nuevas.has(id)) {
      if (nuevas.size > 1) {
        nuevas.delete(id);
      }
    } else {
      nuevas.add(id);
    }
    setCuentasSeleccionadas(nuevas);
  };

  const resultado = useMemo(() => {
    const capital = parseFloat(montoInicial) || 0;
    const inf = parseFloat(inflacion) || 0;
    const periodos = parseInt(meses) || 0;
    const aporte = parseFloat(aporteMensual) || 0;

    if (capital <= 0 || periodos <= 0) return null;

    const tasaMensualInflacion = Math.pow(1 + inf / 100, 1 / 12) - 1;

    const evolucion: DatoEvolucion[] = [];
    const cuentasActivas = CUENTAS_AHORRO.filter((c) => cuentasSeleccionadas.has(c.id));

    // Inicializar saldos
    const saldos: Record<string, number> = {};
    cuentasActivas.forEach((c) => {
      saldos[c.id] = capital;
    });
    let saldoColchonReal = capital;
    let totalAportado = capital;

    // Mes 0 (inicial)
    const datoInicial: DatoEvolucion = { mes: 0, label: "Inicio" };
    cuentasActivas.forEach((c) => {
      datoInicial[c.id] = capital;
    });
    evolucion.push(datoInicial);

    for (let i = 1; i <= periodos; i++) {
      const dato: DatoEvolucion = { mes: i, label: "" };

      cuentasActivas.forEach((c) => {
        if (c.id === "colchon") {
          // El colchón pierde poder adquisitivo
          saldoColchonReal = (saldoColchonReal + aporte) / (1 + tasaMensualInflacion);
          dato[c.id] = saldoColchonReal;
        } else {
          // Calcular interés compuesto
          const tasaMensual = Math.pow(1 + c.tasa / 100, 1 / 12) - 1;
          saldos[c.id] = saldos[c.id] * (1 + tasaMensual) + aporte;
          dato[c.id] = saldos[c.id];
        }
      });

      totalAportado += aporte;

      const label = i <= 12 ? `Mes ${i}` : `Año ${Math.floor(i / 12)}${i % 12 > 0 ? `.${i % 12}` : ""}`;
      dato.label = i % (periodos <= 12 ? 1 : Math.ceil(periodos / 12)) === 0 || i === periodos ? label : "";

      evolucion.push(dato);
    }

    // Calcular resumen por cuenta
    const resumenCuentas = cuentasActivas.map((c) => {
      const montoFinal = evolucion[evolucion.length - 1][c.id] as number;
      const ganancia = montoFinal - totalAportado;
      const rendimiento = (ganancia / totalAportado) * 100;

      return {
        ...c,
        montoFinal,
        ganancia,
        rendimiento,
      };
    });

    // Ordenar por rendimiento
    resumenCuentas.sort((a, b) => b.rendimiento - a.rendimiento);

    // Calcular dominio Y
    const todosLosValores = evolucion.flatMap((e) =>
      Object.entries(e)
        .filter(([key]) => key !== "mes" && key !== "label")
        .map(([, val]) => val as number)
    );
    todosLosValores.push(totalAportado);

    const minValor = Math.min(...todosLosValores);
    const maxValor = Math.max(...todosLosValores);
    const padding = (maxValor - minValor) * 0.15;

    const rango = maxValor - minValor;
    const redondeo = rango > 5000000 ? 500000 : rango > 1000000 ? 100000 : rango > 500000 ? 50000 : 10000;
    let minRedondeado = Math.floor((minValor - padding) / redondeo) * redondeo;
    const maxRedondeado = Math.ceil((maxValor + padding) / redondeo) * redondeo;

    if (totalAportado < minRedondeado) minRedondeado = Math.floor(totalAportado / redondeo) * redondeo;

    return {
      evolucion,
      resumenCuentas,
      totalAportado,
      dominioY: [minRedondeado, maxRedondeado] as [number, number],
      cuentasActivas,
    };
  }, [montoInicial, inflacion, meses, aporteMensual, cuentasSeleccionadas]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatMoneyShort = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num.toFixed(0)}`;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-bold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
          {sortedPayload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: ${formatMoney(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const mejorCuenta = resultado?.resumenCuentas[0];

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-5xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            🏦
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Comparador de Cuentas de Ahorro
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Compara rendimientos de las mejores cuentas remuneradas en Colombia
          </p>
        </div>

        <div className="space-y-6">
          {/* Selector de cuentas */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Selecciona las cuentas a comparar
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CUENTAS_AHORRO.map((cuenta) => (
                <button
                  key={cuenta.id}
                  onClick={() => toggleCuenta(cuenta.id)}
                  className={`p-3 rounded-xl text-left transition-all border-2 ${
                    cuentasSeleccionadas.has(cuenta.id)
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cuenta.color }}
                    />
                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                      {cuenta.nombre}
                    </span>
                  </div>
                  <div className="text-lg font-black" style={{ color: cuenta.color }}>
                    {cuenta.tasa}% EA
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{cuenta.nota}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Monto inicial */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuánto vas a guardar?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={montoInicial}
                onChange={(e) => setMontoInicial(e.target.value)}
                placeholder="1.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[1000000, 5000000, 10000000, 20000000].map((monto) => (
                <button
                  key={monto}
                  onClick={() => setMontoInicial(monto.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    montoInicial === monto.toString()
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ${formatMoney(monto)}
                </button>
              ))}
            </div>
          </div>

          {/* Tiempo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Por cuánto tiempo?
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              {[6, 12, 24, 36].map((m) => (
                <button
                  key={m}
                  onClick={() => setMeses(m.toString())}
                  className={`flex-1 px-4 py-4 font-semibold transition-colors ${
                    meses === m.toString()
                      ? "bg-emerald-500 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  {m < 12 ? `${m} meses` : m === 12 ? "1 año" : `${m / 12} años`}
                </button>
              ))}
            </div>
          </div>

          {/* Inflación */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Inflación proyectada (% anual)
            </label>
            <div className="relative max-w-xs">
              <input
                type="number"
                value={inflacion}
                onChange={(e) => setInflacion(e.target.value)}
                step="0.1"
                className="w-full px-6 py-4 rounded-2xl text-lg font-semibold pr-12"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
            </div>
            <p className="text-xs text-slate-400 ml-1">Meta del Banco de la República: 3%. Actual ~5%</p>
          </div>

          {/* Opciones avanzadas */}
          <button
            onClick={() => setMostrarAvanzado(!mostrarAvanzado)}
            className="w-full py-3 rounded-xl font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {mostrarAvanzado ? "Ocultar opciones avanzadas" : "Agregar aportes mensuales"}
            <span className={`transition-transform text-xs ${mostrarAvanzado ? "rotate-180" : ""}`}>▼</span>
          </button>

          {mostrarAvanzado && (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-700">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Aporte mensual adicional
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    value={aporteMensual}
                    onChange={(e) => setAporteMensual(e.target.value)}
                    placeholder="100.000"
                    className="w-full pl-10 pr-6 py-3 rounded-xl text-base font-semibold"
                  />
                </div>
                <p className="text-xs text-slate-400">Monto que agregarás cada mes a tu ahorro</p>
              </div>
            </div>
          )}

          {/* Resultados */}
          {resultado && (
            <div className="mt-10 space-y-6 animate-result-appear">
              {/* Gráfica comparativa */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-700">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <span>📈</span> Comparación de rendimientos
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={resultado.evolucion} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} interval="preserveStartEnd" />
                    <YAxis
                      domain={resultado.dominioY}
                      tickFormatter={formatMoneyShort}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <ReferenceLine
                      y={resultado.totalAportado}
                      stroke="#94a3b8"
                      strokeDasharray="5 5"
                      label={{ value: "Tu inversión", position: "insideBottomRight", fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                    />
                    {resultado.cuentasActivas.map((cuenta) => (
                      <Line
                        key={cuenta.id}
                        type="monotone"
                        dataKey={cuenta.id}
                        name={cuenta.nombre}
                        stroke={cuenta.color}
                        strokeWidth={cuenta.id === "colchon" ? 2 : 3}
                        dot={false}
                        strokeDasharray={cuenta.id === "colchon" ? "5 5" : undefined}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Ranking de cuentas */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl ring-1 ring-emerald-100 dark:ring-emerald-900">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <span>🏆</span> Ranking de rendimientos
                </h3>
                <div className="space-y-3">
                  {resultado.resumenCuentas.map((cuenta, index) => (
                    <div
                      key={cuenta.id}
                      className={`p-4 rounded-2xl flex items-center justify-between ${
                        index === 0
                          ? "bg-white dark:bg-slate-800 ring-2 ring-emerald-500"
                          : "bg-white/60 dark:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? "bg-emerald-500" : index === 1 ? "bg-slate-400" : "bg-slate-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: cuenta.color }}
                            />
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                              {cuenta.nombre}
                            </span>
                            <span className="text-xs text-slate-400">{cuenta.tasa}% EA</span>
                          </div>
                          <p className="text-xs text-slate-400">{cuenta.nota}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-lg" style={{ color: cuenta.color }}>
                          ${formatMoney(cuenta.montoFinal)}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            cuenta.ganancia >= 0 ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {cuenta.ganancia >= 0 ? "+" : ""}${formatMoney(cuenta.ganancia)} (
                          {cuenta.rendimiento >= 0 ? "+" : ""}
                          {cuenta.rendimiento.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen ganador */}
              {mejorCuenta && (
                <div className="p-8 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-3xl text-center">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    La mejor opción para tu ahorro
                  </p>
                  <p className="text-3xl font-black text-emerald-600 mb-2">{mejorCuenta.nombre}</p>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                    En {parseInt(meses) <= 12 ? `${meses} meses` : `${parseInt(meses) / 12} años`} tendrías{" "}
                    <strong className="text-emerald-600">${formatMoney(mejorCuenta.montoFinal)}</strong>
                  </p>
                  {resultado.resumenCuentas.find((c) => c.id === "colchon") && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Vs bajo el colchón:{" "}
                      <strong className="text-emerald-600">
                        ${formatMoney(mejorCuenta.montoFinal - (resultado.resumenCuentas.find((c) => c.id === "colchon")?.montoFinal || 0))}
                      </strong>{" "}
                      más
                    </p>
                  )}

                  <ShareButtons
                    title="Comparador de Cuentas de Ahorro Colombia"
                    text={`Comparé las cuentas de ahorro en Colombia. Con $${formatMoney(parseFloat(montoInicial))} en ${mejorCuenta.nombre} por ${meses} meses, ganaría $${formatMoney(mejorCuenta.ganancia)} (${mejorCuenta.rendimiento.toFixed(1)}%).`}
                    result={{
                      label: "Mejor opción",
                      value: `${mejorCuenta.nombre} - ${mejorCuenta.tasa}% EA`,
                    }}
                    url={buildShareUrl()}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-5xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-base">
              💡
            </span>
            Consejos para maximizar tus rendimientos
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/50 rounded-xl">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Diversifica tu ahorro</h4>
                <p className="text-sm">
                  Pon hasta $10M en Ualá (12% EA) y el resto en Pibank o Global66 (11% EA). Así maximizas rendimientos.
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Fondo de emergencia</h4>
                <p className="text-sm">
                  Las cuentas de ahorro son ideales para tu fondo de emergencia (3-6 meses de gastos). Tienes liquidez inmediata y buenos rendimientos.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/50 rounded-xl">
                <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Revisa las tasas periódicamente</h4>
                <p className="text-sm">
                  Las tasas cambian según la política monetaria del Banco de la República. Revisa cada 2-3 meses para mantener tu dinero en la mejor opción.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-xl">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Considera los CDTs</h4>
                <p className="text-sm">
                  Para plazos mayores a 6 meses y montos grandes, los CDTs pueden ofrecer tasas más altas. Pero pierdes liquidez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto">
        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong>Nota:</strong> Las tasas mostradas son aproximadas y pueden variar. Última actualización: Febrero 2025.
            Verifica las tasas actuales directamente con cada entidad antes de tomar decisiones financieras.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-5xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="emerald" />
        </div>
      </div>
    </div>
  );
}

function SimuladorLoading() {
  return (
    <div className="space-y-8">
      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-5xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg animate-pulse">
            🏦
          </div>
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4 mx-auto mb-3 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function SimuladorCuentaAhorro() {
  return (
    <Suspense fallback={<SimuladorLoading />}>
      <SimuladorCuentaAhorroContent />
    </Suspense>
  );
}
