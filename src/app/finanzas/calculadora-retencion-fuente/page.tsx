"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Icon } from "@/lib/icons";

type TipoRetencion = "servicios" | "honorarios" | "compras" | "arrendamiento";

interface TasaRetencion {
  tipo: TipoRetencion;
  nombre: string;
  descripcion: string;
  tasaDeclarante: number;
  tasaNoDeclarante: number;
  baseMinima: number; // En UVT
}

const TASAS_RETENCION: TasaRetencion[] = [
  {
    tipo: "servicios",
    nombre: "Servicios profesionales",
    descripcion: "Contratos de prestación de servicios",
    tasaDeclarante: 10,
    tasaNoDeclarante: 11,
    baseMinima: 4,
  },
  {
    tipo: "honorarios",
    nombre: "Honorarios",
    descripcion: "Servicios técnicos, de consultoría",
    tasaDeclarante: 10,
    tasaNoDeclarante: 11,
    baseMinima: 4,
  },
  {
    tipo: "compras",
    nombre: "Compras",
    descripcion: "Compra de bienes y productos",
    tasaDeclarante: 2.5,
    tasaNoDeclarante: 3.5,
    baseMinima: 27,
  },
  {
    tipo: "arrendamiento",
    nombre: "Arrendamiento",
    descripcion: "Alquiler de bienes muebles e inmuebles",
    tasaDeclarante: 3.5,
    tasaNoDeclarante: 4,
    baseMinima: 27,
  },
];

// UVT 2025 (valor estimado, actualizar según DIAN)
const UVT_2025 = 49799;

interface Resultado {
  valorBruto: number;
  baseGravable: number;
  retencion: number;
  netoRecibir: number;
  tasaAplicada: number;
  superaBaseMinima: boolean;
  baseMinimaPesos: number;
}

export default function CalculadoraRetencion() {
  const [tipoRetencion, setTipoRetencion] = useState<TipoRetencion>("servicios");
  const [esDeclarante, setEsDeclarante] = useState<boolean>(true);
  const [valorBruto, setValorBruto] = useState<string>("");

  const tasaActual = TASAS_RETENCION.find((t) => t.tipo === tipoRetencion)!;

  const resultado = useMemo((): Resultado | null => {
    const valor = parseFloat(valorBruto);
    if (isNaN(valor) || valor <= 0) return null;

    const baseMinimaPesos = tasaActual.baseMinima * UVT_2025;
    const superaBaseMinima = valor >= baseMinimaPesos;

    const tasaAplicada = esDeclarante ? tasaActual.tasaDeclarante : tasaActual.tasaNoDeclarante;
    const retencion = superaBaseMinima ? valor * (tasaAplicada / 100) : 0;
    const netoRecibir = valor - retencion;

    return {
      valorBruto: valor,
      baseGravable: valor,
      retencion,
      netoRecibir,
      tasaAplicada,
      superaBaseMinima,
      baseMinimaPesos,
    };
  }, [valorBruto, tipoRetencion, esDeclarante, tasaActual]);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const faqs = [
    {
      question: "¿Qué es la retención en la fuente?",
      answer:
        "Es un mecanismo de recaudo anticipado del impuesto de renta. El pagador descuenta un porcentaje del pago y lo transfiere a la DIAN a nombre del beneficiario.",
    },
    {
      question: "¿Cuándo aplica la retención en la fuente?",
      answer:
        "Aplica cuando el pagador es agente retenedor y el pago supera las bases mínimas establecidas por la DIAN para cada concepto.",
    },
    {
      question: "¿Qué pasa si soy declarante de renta?",
      answer:
        "Si eres declarante, las tasas de retención son menores. Por ejemplo, en servicios la tasa es 10% vs 11% para no declarantes.",
    },
    {
      question: "¿Puedo recuperar la retención en la fuente?",
      answer:
        "Sí, la retención se cruza con tu impuesto de renta anual. Si te retuvieron más de lo debido, puedes solicitar devolución.",
    },
  ];

  const relatedCalculators = [
    {
      name: "Impuesto de Renta",
      href: "/finanzas/calculadora-impuesto-renta",
      description: "Calcula tu impuesto anual",
      icon: "landmark",
    },
    {
      name: "Salario Neto",
      href: "/finanzas/calculadora-salario-neto",
      description: "Calcula tu salario después de deducciones",
      icon: "banknote",
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="file-text" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Retención en la Fuente
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Calcula la retención para diferentes conceptos
          </p>
        </div>

        <div className="space-y-6">
          {/* Selector de tipo */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tipo de retención
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TASAS_RETENCION.map((t) => (
                <button
                  key={t.tipo}
                  onClick={() => setTipoRetencion(t.tipo)}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left ${
                    tipoRetencion === t.tipo
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="block font-bold">{t.nombre}</span>
                  <span className="text-xs opacity-75">{t.descripcion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle declarante */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Eres declarante de renta?
            </label>
            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setEsDeclarante(true)}
                className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                  esDeclarante
                    ? "bg-emerald-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                Sí ({tasaActual.tasaDeclarante}%)
              </button>
              <button
                onClick={() => setEsDeclarante(false)}
                className={`flex-1 px-5 py-4 font-semibold transition-colors ${
                  !esDeclarante
                    ? "bg-emerald-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                No ({tasaActual.tasaNoDeclarante}%)
              </button>
            </div>
          </div>

          {/* Input valor bruto */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Valor bruto del pago
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold">
                $
              </span>
              <input
                type="number"
                value={valorBruto}
                onChange={(e) => setValorBruto(e.target.value)}
                placeholder="1000000"
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-xl font-semibold"
              />
            </div>
            <p className="text-xs text-slate-400 ml-1">
              Base mínima para retención: ${formatMoney(tasaActual.baseMinima * UVT_2025)} ({tasaActual.baseMinima} UVT)
            </p>
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="mt-8 space-y-4 animate-result-appear">
              {/* Alerta si no supera base mínima */}
              {!resultado.superaBaseMinima && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium flex items-center gap-2">
                    <Icon name="info" className="w-5 h-5" />
                    El valor no supera la base mínima de ${formatMoney(resultado.baseMinimaPesos)}. No aplica retención.
                  </p>
                </div>
              )}

              {/* Resultado principal */}
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-3xl text-center ring-1 ring-emerald-100 dark:ring-emerald-900">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">
                  Neto a recibir
                </p>
                <p className="text-5xl font-black text-emerald-600 dark:text-emerald-400">
                  ${formatMoney(resultado.netoRecibir)}
                </p>
              </div>

              {/* Desglose */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-400">Valor bruto</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">${formatMoney(resultado.valorBruto)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-400">
                    Retención ({resultado.tasaAplicada}%)
                  </span>
                  <span className="font-bold text-red-600">-${formatMoney(resultado.retencion)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">Neto a recibir</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-300 text-xl">${formatMoney(resultado.netoRecibir)}</span>
                </div>
              </div>

              <ShareButtons
                title="Calculadora de Retención en la Fuente Colombia"
                text={`Calculé la retención en la fuente para ${tasaActual.nombre.toLowerCase()} con Vida en Cifras`}
                result={{
                  label: "Neto a recibir",
                  value: `$${formatMoney(resultado.netoRecibir)}`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Información sobre UVT */}
      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Icon name="lightbulb" className="w-5 h-5" weight="fill" />
          </span>
          Tasas de retención 2025
        </h2>
        <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-300">Concepto</th>
                <th className="px-4 py-3 text-center font-bold text-slate-700 dark:text-slate-300">Declarante</th>
                <th className="px-4 py-3 text-center font-bold text-slate-700 dark:text-slate-300">No declarante</th>
                <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">Base mín.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {TASAS_RETENCION.map((t) => (
                <tr key={t.tipo} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{t.nombre}</td>
                  <td className="px-4 py-3 text-center text-emerald-600">{t.tasaDeclarante}%</td>
                  <td className="px-4 py-3 text-center text-amber-600">{t.tasaNoDeclarante}%</td>
                  <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">{t.baseMinima} UVT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          UVT 2025: ${formatMoney(UVT_2025)} (valor estimado, confirmar con DIAN)
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <FAQ items={faqs} colorClass="emerald" />
      </div>

      <div className="max-w-2xl mx-auto p-8 card-glass rounded-[2rem]">
        <RelatedCalculators calculators={relatedCalculators} />
      </div>
    </div>
  );
}
