"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";

const CUENTAS_AHORRO = [
  {
    id: "sin-rendimiento",
    nombre: "Sin rendimiento",
    tasa: 0,
    color: "#94A3B8",
    nota: "Ahorro en efectivo o alcancía",
    esPersonalizable: false,
  },
  {
    id: "otro",
    nombre: "Otro",
    tasa: 0,
    color: "#6B7280",
    nota: "Ingresa tu propia tasa",
    esPersonalizable: true,
  },
  {
    id: "uala",
    nombre: "Ualá",
    tasa: 12.0,
    color: "#8B5CF6",
    nota: "Máximo $10M (depósito de bajo monto)",
    esPersonalizable: false,
  },
  {
    id: "global66",
    nombre: "Global66",
    tasa: 11.0,
    color: "#06B6D4",
    nota: "Sin límite de saldo",
    esPersonalizable: false,
  },
  {
    id: "pibank",
    nombre: "Pibank",
    tasa: 11.0,
    color: "#F59E0B",
    nota: "Banco Pichincha, sin costos",
    esPersonalizable: false,
  },
  {
    id: "rappipay",
    nombre: "RappiPay",
    tasa: 10.0,
    color: "#EF4444",
    nota: "10% con 4+ transacciones/mes",
    esPersonalizable: false,
  },
  {
    id: "lulo-pro",
    nombre: "Lulo Bank Pro",
    tasa: 9.25,
    color: "#10B981",
    nota: "Requiere nómina o $3M ingresos/mes",
    esPersonalizable: false,
  },
  {
    id: "banco-popular",
    nombre: "Banco Popular",
    tasa: 9.0,
    color: "#3B82F6",
    nota: "Cuenta Plateada",
    esPersonalizable: false,
  },
  {
    id: "nu",
    nombre: "Nu Colombia",
    tasa: 8.25,
    color: "#A855F7",
    nota: "Cajitas, sin monto mínimo",
    esPersonalizable: false,
  },
  {
    id: "lulo",
    nombre: "Lulo Bank",
    tasa: 7.5,
    color: "#84CC16",
    nota: "Bolsillos cuenta básica",
    esPersonalizable: false,
  },
];

type CuentaId = (typeof CUENTAS_AHORRO)[number]["id"];

const faqs = [
  {
    question: "¿Cómo se calcula el aporte mensual necesario?",
    answer:
      "Usamos la fórmula de valor futuro de anualidades con interés compuesto. Consideramos tu capital inicial, la tasa de interés de la cuenta seleccionada y el plazo que elegiste para calcular exactamente cuánto necesitas aportar cada mes.",
  },
  {
    question: "¿Por qué con mejores tasas necesito ahorrar menos?",
    answer:
      "Porque el interés compuesto hace más trabajo por ti. Con una tasa más alta, tus aportes generan más intereses, y esos intereses generan más intereses. Así, una parte mayor de tu meta viene de los rendimientos en lugar de tu bolsillo.",
  },
  {
    question: "¿Qué pasa si no puedo ahorrar el monto sugerido?",
    answer:
      "Tienes dos opciones: extender el plazo (más tiempo = menos ahorro mensual) o reducir tu meta. También puedes empezar con un capital inicial mayor si tienes ahorros disponibles.",
  },
  {
    question: "¿El cálculo incluye inflación?",
    answer:
      "No, el cálculo muestra el valor nominal. Si quieres que tu meta mantenga poder adquisitivo, considera aumentarla según la inflación esperada (aprox. 5% anual en Colombia).",
  },
  {
    question: "¿Puedo cambiar de cuenta durante el ahorro?",
    answer:
      "Sí, puedes mover tu dinero entre cuentas sin penalidad. Si encuentras una mejor tasa, simplemente transfiere tu saldo. Esto puede acelerar el logro de tu meta.",
  },
];

function CalculadoraMetaAhorroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [tipoCalculo, setTipoCalculo] = useState<"meta" | "tiempo">(
    (searchParams.get("modo") as "meta" | "tiempo") || "meta"
  );
  const [meta, setMeta] = useState<string>(
    searchParams.get("meta") || "10000000"
  );
  const [meses, setMeses] = useState<string>(
    searchParams.get("meses") || "12"
  );
  const [capitalInicial, setCapitalInicial] = useState<string>(
    searchParams.get("capital") || "0"
  );
  const [ahorroMensual, setAhorroMensual] = useState<string>(
    searchParams.get("ahorro") || "500000"
  );
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<CuentaId>(
    (searchParams.get("cuenta") as CuentaId) || "uala"
  );
  const [tasaPersonalizada, setTasaPersonalizada] = useState<string>(
    searchParams.get("tasa") || "10"
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const buildShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams();
    if (tipoCalculo !== "meta") {
      params.set("modo", tipoCalculo);
    }
    params.set("meta", meta);
    if (tipoCalculo === "tiempo" && ahorroMensual !== "500000") {
      params.set("ahorro", ahorroMensual);
    }
    if (tipoCalculo === "meta" && meses !== "12") {
      params.set("meses", meses);
    }
    if (capitalInicial && capitalInicial !== "0") {
      params.set("capital", capitalInicial);
    }
    if (cuentaSeleccionada !== "uala") {
      params.set("cuenta", cuentaSeleccionada);
    }
    if (cuentaSeleccionada === "otro" && tasaPersonalizada !== "10") {
      params.set("tasa", tasaPersonalizada);
    }
    const queryString = params.toString();
    return `${window.location.origin}${pathname}${queryString ? `?${queryString}` : ""}`;
  }, [meta, meses, capitalInicial, cuentaSeleccionada, pathname, tipoCalculo, ahorroMensual, tasaPersonalizada]);

  useEffect(() => {
    if (!isClient) return;
    const params = new URLSearchParams();
    if (tipoCalculo !== "meta") {
      params.set("modo", tipoCalculo);
    }
    if (meta && meta !== "10000000") {
      params.set("meta", meta);
    }
    if (tipoCalculo === "tiempo" && ahorroMensual && ahorroMensual !== "500000") {
      params.set("ahorro", ahorroMensual);
    }
    if (tipoCalculo === "meta" && meses && meses !== "12") {
      params.set("meses", meses);
    }
    if (capitalInicial && capitalInicial !== "0") {
      params.set("capital", capitalInicial);
    }
    if (cuentaSeleccionada !== "uala") {
      params.set("cuenta", cuentaSeleccionada);
    }
    if (cuentaSeleccionada === "otro" && tasaPersonalizada !== "10") {
      params.set("tasa", tasaPersonalizada);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [meta, meses, capitalInicial, cuentaSeleccionada, isClient, pathname, router, tipoCalculo, ahorroMensual, tasaPersonalizada]);

  // Obtener la tasa efectiva según la cuenta seleccionada
  const getTasaEfectiva = useCallback((cuentaId: CuentaId) => {
    if (cuentaId === "otro") {
      return parseFloat(tasaPersonalizada) || 0;
    }
    const cuenta = CUENTAS_AHORRO.find((c) => c.id === cuentaId);
    return cuenta?.tasa || 0;
  }, [tasaPersonalizada]);

  const resultado = useMemo(() => {
    const metaNum = parseFloat(meta) || 0;
    const mesesNum = parseInt(meses) || 0;
    const capitalNum = parseFloat(capitalInicial) || 0;
    const ahorroMensualNum = parseFloat(ahorroMensual) || 0;
    const cuenta = CUENTAS_AHORRO.find((c) => c.id === cuentaSeleccionada);
    const tasaAnual = getTasaEfectiva(cuentaSeleccionada);

    if (!cuenta) return null;

    // Validaciones según el modo
    if (tipoCalculo === "meta") {
      if (metaNum <= 0 || mesesNum <= 0) return null;
    } else {
      if (metaNum <= 0 || ahorroMensualNum <= 0) return null;
    }

    if (capitalNum >= metaNum) {
      return {
        aporteMensual: 0,
        totalAportado: capitalNum,
        interesesGanados: 0,
        cuenta: { ...cuenta, tasa: tasaAnual },
        meta: metaNum,
        meses: 0,
        capitalInicial: capitalNum,
        porcentajeAporte: 100,
        porcentajeIntereses: 0,
        comparacionCuentas: [],
        tipoCalculo,
        mensaje: "¡Ya tienes el capital suficiente para tu meta!",
      };
    }

    const tasaMensual = Math.pow(1 + tasaAnual / 100, 1 / 12) - 1;

    let mesesCalculados: number;
    let aporteMensualCalculado: number;

    if (tipoCalculo === "meta") {
      // Modo original: calcular aporte mensual dado plazo
      mesesCalculados = mesesNum;
      const valorFuturoCapital = capitalNum * Math.pow(1 + tasaMensual, mesesNum);
      const montoFaltante = metaNum - valorFuturoCapital;

      if (tasaMensual === 0) {
        aporteMensualCalculado = montoFaltante / mesesNum;
      } else {
        const factor = (Math.pow(1 + tasaMensual, mesesNum) - 1) / tasaMensual;
        aporteMensualCalculado = montoFaltante / factor;
      }
      if (aporteMensualCalculado < 0) aporteMensualCalculado = 0;
    } else {
      // Modo tiempo: calcular meses dado ahorro mensual
      aporteMensualCalculado = ahorroMensualNum;

      if (tasaMensual === 0) {
        // Sin intereses, cálculo simple
        mesesCalculados = Math.ceil((metaNum - capitalNum) / ahorroMensualNum);
      } else {
        // Fórmula: n = log((FV*r + PMT) / (PV*r + PMT)) / log(1+r)
        // Donde FV = meta, PV = capital inicial, PMT = aporte mensual, r = tasa mensual
        const numerador = Math.log((metaNum * tasaMensual + ahorroMensualNum) / (capitalNum * tasaMensual + ahorroMensualNum));
        const denominador = Math.log(1 + tasaMensual);
        mesesCalculados = Math.ceil(numerador / denominador);
      }

      if (mesesCalculados < 1) mesesCalculados = 1;
      if (!isFinite(mesesCalculados) || mesesCalculados > 1200) {
        return {
          aporteMensual: ahorroMensualNum,
          totalAportado: 0,
          interesesGanados: 0,
          cuenta: { ...cuenta, tasa: tasaAnual },
          meta: metaNum,
          meses: 0,
          capitalInicial: capitalNum,
          porcentajeAporte: 0,
          porcentajeIntereses: 0,
          comparacionCuentas: [],
          tipoCalculo,
          mensaje: "Con ese ahorro mensual, el plazo sería mayor a 100 años. Intenta aumentar el ahorro mensual.",
        };
      }
    }

    const totalAportado = capitalNum + aporteMensualCalculado * mesesCalculados;
    const interesesGanados = metaNum - totalAportado;
    const porcentajeAporte = (totalAportado / metaNum) * 100;
    const porcentajeIntereses = (interesesGanados / metaNum) * 100;

    // Comparar con otras cuentas (solo las predefinidas, no "sin-rendimiento" ni "otro")
    const cuentasParaComparar = CUENTAS_AHORRO.filter(
      (c) => c.id !== "sin-rendimiento" && c.id !== "otro"
    );

    const comparacionCuentas = cuentasParaComparar.map((c) => {
      const tasa = Math.pow(1 + c.tasa / 100, 1 / 12) - 1;

      if (tipoCalculo === "meta") {
        const vfCapital = capitalNum * Math.pow(1 + tasa, mesesCalculados);
        const faltante = metaNum - vfCapital;
        let aporte: number;
        if (tasa === 0) {
          aporte = faltante / mesesCalculados;
        } else {
          const f = (Math.pow(1 + tasa, mesesCalculados) - 1) / tasa;
          aporte = faltante / f;
        }
        if (aporte < 0) aporte = 0;
        const total = capitalNum + aporte * mesesCalculados;
        return {
          ...c,
          aporteMensual: aporte,
          totalAportado: total,
          interesesGanados: metaNum - total,
          mesesRequeridos: mesesCalculados,
        };
      } else {
        // Modo tiempo: calcular meses para cada cuenta
        let mesesReq: number;
        if (tasa === 0) {
          mesesReq = Math.ceil((metaNum - capitalNum) / ahorroMensualNum);
        } else {
          const num = Math.log((metaNum * tasa + ahorroMensualNum) / (capitalNum * tasa + ahorroMensualNum));
          const den = Math.log(1 + tasa);
          mesesReq = Math.ceil(num / den);
        }
        if (!isFinite(mesesReq) || mesesReq > 1200) mesesReq = 1200;
        const total = capitalNum + ahorroMensualNum * mesesReq;
        return {
          ...c,
          aporteMensual: ahorroMensualNum,
          totalAportado: total,
          interesesGanados: metaNum - total,
          mesesRequeridos: mesesReq,
        };
      }
    }).sort((a, b) => tipoCalculo === "meta" ? a.aporteMensual - b.aporteMensual : a.mesesRequeridos - b.mesesRequeridos);

    // Generar evolución mes a mes para la gráfica
    const evolucion: Array<{
      mes: number;
      label: string;
      saldo: number;
      aportes: number;
      intereses: number;
    }> = [];

    let saldoActual = capitalNum;
    let aportesAcumulados = capitalNum;

    // Mes 0 (inicial)
    evolucion.push({
      mes: 0,
      label: "Inicio",
      saldo: capitalNum,
      aportes: capitalNum,
      intereses: 0,
    });

    for (let i = 1; i <= mesesCalculados; i++) {
      saldoActual = saldoActual * (1 + tasaMensual) + aporteMensualCalculado;
      aportesAcumulados += aporteMensualCalculado;
      const interesesAcumulados = saldoActual - aportesAcumulados;

      let label = "";
      if (mesesCalculados <= 12) {
        label = `M${i}`;
      } else if (i % 6 === 0 || i === mesesCalculados) {
        label = i < 12 ? `M${i}` : i === 12 ? "1a" : `${(i / 12).toFixed(1)}a`;
      }

      evolucion.push({
        mes: i,
        label,
        saldo: saldoActual,
        aportes: aportesAcumulados,
        intereses: interesesAcumulados,
      });
    }

    return {
      aporteMensual: aporteMensualCalculado,
      totalAportado,
      interesesGanados,
      cuenta: { ...cuenta, tasa: tasaAnual },
      meta: metaNum,
      meses: mesesCalculados,
      capitalInicial: capitalNum,
      porcentajeAporte,
      porcentajeIntereses,
      comparacionCuentas,
      evolucion,
      tipoCalculo,
      mensaje: null,
    };
  }, [meta, meses, capitalInicial, cuentaSeleccionada, tipoCalculo, ahorroMensual, getTasaEfectiva]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPlazo = (m: number) => {
    if (m < 12) return `${m} meses`;
    if (m === 12) return "1 año";
    if (m % 12 === 0) return `${m / 12} años`;
    return `${Math.floor(m / 12)} años y ${m % 12} meses`;
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
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      name: string;
      payload: { mes: number; saldo: number; aportes: number; intereses: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-bold text-slate-700 dark:text-slate-200 mb-2">
            {data?.mes === 0 ? "Inicio" : `Mes ${data?.mes}`}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Saldo: <strong className="text-amber-600">${formatMoney(data?.saldo || 0)}</strong>
          </p>
          <p className="text-sm text-slate-500">
            Aportes: ${formatMoney(data?.aportes || 0)}
          </p>
          <p className="text-sm text-emerald-600">
            Intereses: +${formatMoney(data?.intereses || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <Link
        href="/finanzas"
        className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Finanzas
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            🎯
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Meta de Ahorro
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Descubre cuánto debes ahorrar mensualmente para alcanzar tu objetivo
          </p>
        </div>

        <div className="space-y-6">
          {/* Toggle de modo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Qué quieres calcular?
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setTipoCalculo("meta")}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  tipoCalculo === "meta"
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                ¿Cuánto ahorrar?
              </button>
              <button
                onClick={() => setTipoCalculo("tiempo")}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  tipoCalculo === "tiempo"
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                ¿Cuánto tiempo?
              </button>
            </div>
            <p className="text-xs text-slate-400 ml-1">
              {tipoCalculo === "meta"
                ? "Calcula cuánto necesitas ahorrar mensualmente para tu meta"
                : "Calcula cuántos meses tardarás en alcanzar tu meta"}
            </p>
          </div>

          {/* Meta de ahorro */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuál es tu meta de ahorro?
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                placeholder="10.000.000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[5000000, 10000000, 20000000, 50000000, 100000000].map((monto) => (
                <button
                  key={monto}
                  onClick={() => setMeta(monto.toString())}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    meta === monto.toString()
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  ${formatMoney(monto)}
                </button>
              ))}
            </div>
          </div>

          {/* Plazo o Ahorro mensual según el modo */}
          {tipoCalculo === "meta" ? (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿En cuánto tiempo quieres lograrlo?
              </label>
              <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                {[6, 12, 24, 36, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMeses(m.toString())}
                    className={`flex-1 px-3 py-4 font-semibold transition-colors ${
                      meses === m.toString()
                        ? "bg-amber-500 text-white"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {m < 12 ? `${m}m` : m === 12 ? "1 año" : `${m / 12}a`}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                ¿Cuánto puedes ahorrar al mes?
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                <input
                  type="number"
                  value={ahorroMensual}
                  onChange={(e) => setAhorroMensual(e.target.value)}
                  placeholder="500.000"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[200000, 500000, 1000000, 2000000].map((monto) => (
                  <button
                    key={monto}
                    onClick={() => setAhorroMensual(monto.toString())}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      ahorroMensual === monto.toString()
                        ? "bg-amber-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    ${formatMoney(monto)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Capital inicial */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Con cuánto empiezas? <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <div className="relative max-w-md">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={capitalInicial}
                onChange={(e) => setCapitalInicial(e.target.value)}
                placeholder="0"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-lg font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Si ya tienes algo ahorrado, tu aporte mensual será menor
            </p>
          </div>

          {/* Selector de cuenta */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿En qué cuenta vas a ahorrar?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {CUENTAS_AHORRO.map((cuenta) => (
                <button
                  key={cuenta.id}
                  onClick={() => setCuentaSeleccionada(cuenta.id)}
                  className={`p-3 rounded-xl text-left transition-all border-2 ${
                    cuentaSeleccionada === cuenta.id
                      ? "border-amber-500 bg-amber-50 dark:bg-amber-950/50"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                    {cuenta.nombre}
                  </div>
                  <div className="text-lg font-black" style={{ color: cuenta.color }}>
                    {cuenta.id === "otro"
                      ? `${tasaPersonalizada || 0}% EA`
                      : `${cuenta.tasa}% EA`}
                  </div>
                </button>
              ))}
            </div>

            {/* Input de tasa personalizada */}
            {cuentaSeleccionada === "otro" && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Tasa de interés anual (% EA)
                </label>
                <div className="relative max-w-xs">
                  <input
                    type="number"
                    value={tasaPersonalizada}
                    onChange={(e) => setTasaPersonalizada(e.target.value)}
                    placeholder="10"
                    step="0.1"
                    min="0"
                    max="50"
                    className="w-full px-4 py-3 pr-12 rounded-xl text-lg font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
                </div>
                <p className="text-xs text-slate-400">
                  Ingresa la tasa efectiva anual de tu cuenta o inversión
                </p>
              </div>
            )}

            {/* Nota de la cuenta seleccionada */}
            {cuentaSeleccionada && (
              <p className="text-xs text-slate-400 ml-1">
                {CUENTAS_AHORRO.find((c) => c.id === cuentaSeleccionada)?.nota}
              </p>
            )}
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="mt-10 space-y-6 animate-result-appear">
              {resultado.mensaje ? (
                <div className="p-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-3xl text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    {resultado.mensaje}
                  </p>
                </div>
              ) : (
                <>
                  {/* Resultado principal */}
                  <div className="p-8 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-3xl text-center">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Para llegar a
                    </p>
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">
                      ${formatMoney(resultado.meta)}
                    </p>
                    {resultado.tipoCalculo === "meta" ? (
                      <>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          en <strong>{formatPlazo(resultado.meses)}</strong> con{" "}
                          <strong style={{ color: resultado.cuenta.color }}>
                            {resultado.cuenta.nombre === "Otro" ? `${resultado.cuenta.tasa}% EA` : resultado.cuenta.nombre}
                          </strong>
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          debes ahorrar mensualmente:
                        </p>
                        <p className="text-5xl md:text-6xl font-black text-amber-600 mb-2">
                          ${formatMoney(Math.ceil(resultado.aporteMensual))}
                        </p>
                        <p className="text-slate-400 text-sm mb-6">por mes</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          ahorrando <strong>${formatMoney(Math.ceil(resultado.aporteMensual))}/mes</strong> con{" "}
                          <strong style={{ color: resultado.cuenta.color }}>
                            {resultado.cuenta.nombre === "Otro" ? `${resultado.cuenta.tasa}% EA` : resultado.cuenta.nombre}
                          </strong>
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          necesitarás:
                        </p>
                        <p className="text-5xl md:text-6xl font-black text-amber-600 mb-2">
                          {formatPlazo(resultado.meses)}
                        </p>
                        <p className="text-slate-400 text-sm mb-6">para alcanzar tu meta</p>
                      </>
                    )}

                    {/* Desglose */}
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
                      <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tu aporte total</p>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                          ${formatMoney(Math.ceil(resultado.totalAportado))}
                        </p>
                        <p className="text-xs text-slate-400">
                          {resultado.porcentajeAporte.toFixed(0)}% de la meta
                        </p>
                      </div>
                      <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Intereses ganados</p>
                        <p className="text-lg font-bold text-emerald-600">
                          +${formatMoney(Math.floor(resultado.interesesGanados))}
                        </p>
                        <p className="text-xs text-slate-400">
                          {resultado.porcentajeIntereses.toFixed(0)}% de la meta
                        </p>
                      </div>
                    </div>

                    {/* Barra de progreso visual */}
                    <div className="max-w-sm mx-auto mb-6">
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span>Tu aporte</span>
                        <span>Intereses</span>
                      </div>
                      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-amber-500 transition-all duration-500"
                          style={{ width: `${resultado.porcentajeAporte}%` }}
                        />
                        <div
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${resultado.porcentajeIntereses}%` }}
                        />
                      </div>
                    </div>

                    <ShareButtons
                      title="Calculadora de Meta de Ahorro Colombia"
                      text={resultado.tipoCalculo === "meta"
                        ? `Para ahorrar $${formatMoney(resultado.meta)} en ${formatPlazo(resultado.meses)}, necesito ahorrar $${formatMoney(Math.ceil(resultado.aporteMensual))}/mes con ${resultado.cuenta.nombre === "Otro" ? `tasa ${resultado.cuenta.tasa}%` : resultado.cuenta.nombre}. ¡Los intereses aportan $${formatMoney(Math.floor(resultado.interesesGanados))}!`
                        : `Ahorrando $${formatMoney(Math.ceil(resultado.aporteMensual))}/mes, llegaré a $${formatMoney(resultado.meta)} en ${formatPlazo(resultado.meses)} con ${resultado.cuenta.nombre === "Otro" ? `tasa ${resultado.cuenta.tasa}%` : resultado.cuenta.nombre}. ¡Los intereses aportan $${formatMoney(Math.floor(resultado.interesesGanados))}!`
                      }
                      result={resultado.tipoCalculo === "meta"
                        ? { label: "Ahorro mensual", value: `$${formatMoney(Math.ceil(resultado.aporteMensual))}` }
                        : { label: "Tiempo requerido", value: formatPlazo(resultado.meses) }
                      }
                      url={buildShareUrl()}
                    />
                  </div>

                  {/* Gráfica de evolución */}
                  {resultado.evolucion && resultado.evolucion.length > 1 && (
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-700">
                      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span>📈</span> Así crecerá tu ahorro
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={resultado.evolucion}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorAportes" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorIntereses" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: "#64748b" }}
                            interval="preserveStartEnd"
                          />
                          <YAxis
                            tickFormatter={formatMoneyShort}
                            tick={{ fontSize: 11, fill: "#64748b" }}
                            width={60}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine
                            y={resultado.meta}
                            stroke="#f59e0b"
                            strokeDasharray="5 5"
                            label={{
                              value: "Meta",
                              position: "insideTopRight",
                              fill: "#f59e0b",
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="aportes"
                            stackId="1"
                            stroke="#f59e0b"
                            fill="url(#colorAportes)"
                            name="Aportes"
                          />
                          <Area
                            type="monotone"
                            dataKey="intereses"
                            stackId="1"
                            stroke="#10b981"
                            fill="url(#colorIntereses)"
                            name="Intereses"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Tus aportes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Intereses ganados</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comparación con otras cuentas - solo si no es "sin-rendimiento" u "otro" */}
                  {resultado.comparacionCuentas.length > 0 && (
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-700">
                      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <span>📊</span> Compara: {resultado.tipoCalculo === "meta" ? "¿cuánto ahorrarías en cada cuenta?" : "¿cuánto tardarías con cada cuenta?"}
                      </h3>
                      <div className="space-y-2">
                        {resultado.comparacionCuentas.map((cuenta, index) => (
                          <div
                            key={cuenta.id}
                            className={`p-4 rounded-xl flex items-center justify-between transition-all ${
                              cuenta.id === cuentaSeleccionada
                                ? "bg-amber-50 dark:bg-amber-950/50 ring-2 ring-amber-500"
                                : "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer"
                            }`}
                            onClick={() => setCuentaSeleccionada(cuenta.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: cuenta.color }}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <span className="font-semibold text-slate-700 dark:text-slate-200">
                                  {cuenta.nombre}
                                </span>
                                <span className="text-xs text-slate-400 ml-2">{cuenta.tasa}% EA</span>
                                {cuenta.id === cuentaSeleccionada && (
                                  <span className="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                                    Seleccionada
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {resultado.tipoCalculo === "meta" ? (
                                <>
                                  <p className="font-bold text-lg" style={{ color: cuenta.color }}>
                                    ${formatMoney(Math.ceil(cuenta.aporteMensual))}
                                    <span className="text-sm font-normal text-slate-400">/mes</span>
                                  </p>
                                  <p className="text-xs text-emerald-600">
                                    +${formatMoney(Math.floor(cuenta.interesesGanados))} en intereses
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="font-bold text-lg" style={{ color: cuenta.color }}>
                                    {formatPlazo(cuenta.mesesRequeridos)}
                                  </p>
                                  <p className="text-xs text-emerald-600">
                                    +${formatMoney(Math.floor(cuenta.interesesGanados))} en intereses
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 mt-4 text-center">
                        Haz clic en una cuenta para seleccionarla
                      </p>
                    </div>
                  )}

                  {/* Tip - solo si hay comparación y la cuenta seleccionada no es especial */}
                  {resultado.comparacionCuentas.length > 0 && cuentaSeleccionada !== "sin-rendimiento" && cuentaSeleccionada !== "otro" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        {resultado.tipoCalculo === "meta" ? (
                          <>
                            <strong>💡 Tip:</strong> Con {resultado.comparacionCuentas[0]?.nombre} ahorras{" "}
                            <strong>
                              ${formatMoney(Math.ceil(resultado.aporteMensual) - Math.ceil(resultado.comparacionCuentas[0]?.aporteMensual || 0))}
                            </strong>{" "}
                            menos cada mes que con {resultado.comparacionCuentas[resultado.comparacionCuentas.length - 1]?.nombre}.
                          </>
                        ) : (
                          <>
                            <strong>💡 Tip:</strong> Con {resultado.comparacionCuentas[0]?.nombre} llegas{" "}
                            <strong>
                              {formatPlazo((resultado.comparacionCuentas[resultado.comparacionCuentas.length - 1]?.mesesRequeridos || 0) - (resultado.comparacionCuentas[0]?.mesesRequeridos || 0))}
                            </strong>{" "}
                            antes que con {resultado.comparacionCuentas[resultado.comparacionCuentas.length - 1]?.nombre}.
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Link al comparador */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/finanzas/simulador-cuenta-ahorro"
          className="block p-6 card-glass rounded-2xl hover:ring-2 hover:ring-emerald-500 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl">
              🏦
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                Comparador de Cuentas de Ahorro
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ¿Ya tienes dinero? Simula cuánto crecerá en cada cuenta
              </p>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">→</span>
          </div>
        </Link>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="amber" />
        </div>
      </div>
    </div>
  );
}

function CalculadoraLoading() {
  return (
    <div className="space-y-8">
      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg animate-pulse">
            🎯
          </div>
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4 mx-auto mb-3 animate-pulse" />
          <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function CalculadoraMetaAhorro() {
  return (
    <Suspense fallback={<CalculadoraLoading />}>
      <CalculadoraMetaAhorroContent />
    </Suspense>
  );
}
