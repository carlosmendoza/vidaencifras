"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Icon, getIconName } from "@/lib/icons";

const faqs = [
  {
    question: "¿Por qué los pequeños hábitos importan tanto?",
    answer:
      "Los hábitos pequeños se acumulan exponencialmente. Leer 20 minutos al día son 120+ horas al año (unos 40 libros). Ahorrar $10.000 diarios son $3.6 millones al año, sin contar intereses.",
  },
  {
    question: "¿Cómo funciona el interés compuesto en hábitos de ahorro?",
    answer:
      "Si inviertes tus ahorros del hábito, los intereses generan más intereses. Ahorrar $300.000/mes al 10% anual te da $62 millones en 10 años, aunque solo aportaste $36 millones.",
  },
  {
    question: "¿Qué hábitos tienen mayor impacto financiero?",
    answer:
      "Dejar de fumar puede ahorrarte $2-5 millones al año. Reducir comidas fuera ahorra $1-3 millones. Preparar café en casa en vez de comprarlo ahorra $500.000-1.000.000 al año.",
  },
  {
    question: "¿Cómo mantengo un nuevo hábito?",
    answer:
      "Empieza pequeño (2 minutos al día), vincúlalo a un hábito existente, hazlo obvio y atractivo. Rastrea tu progreso y celebra las pequeñas victorias.",
  },
];

type TipoHabito = "tiempo" | "dinero" | "salud";
type TipoImpacto = "positivo" | "negativo";

interface PlantillaHabito {
  nombre: string;
  emoji: string;
  tipo: TipoHabito;
  impacto: TipoImpacto;
  valorDiario: number;
  unidad: string;
  descripcion: string;
}

const plantillas: PlantillaHabito[] = [
  {
    nombre: "Leer",
    emoji: "📚",
    tipo: "tiempo",
    impacto: "positivo",
    valorDiario: 30,
    unidad: "minutos",
    descripcion: "30 min/día = ~18 libros/año",
  },
  {
    nombre: "Ejercicio",
    emoji: "🏃",
    tipo: "salud",
    impacto: "positivo",
    valorDiario: 30,
    unidad: "minutos",
    descripcion: "Mejora cardiovascular y mental",
  },
  {
    nombre: "Meditar",
    emoji: "🧘",
    tipo: "tiempo",
    impacto: "positivo",
    valorDiario: 10,
    unidad: "minutos",
    descripcion: "Reduce estrés y ansiedad",
  },
  {
    nombre: "Ahorro diario",
    emoji: "💰",
    tipo: "dinero",
    impacto: "positivo",
    valorDiario: 10000,
    unidad: "pesos",
    descripcion: "Pequeños ahorros, grandes resultados",
  },
  {
    nombre: "Café comprado",
    emoji: "☕",
    tipo: "dinero",
    impacto: "negativo",
    valorDiario: 8000,
    unidad: "pesos",
    descripcion: "vs. prepararlo en casa",
  },
  {
    nombre: "Cigarrillos",
    emoji: "🚬",
    tipo: "dinero",
    impacto: "negativo",
    valorDiario: 15000,
    unidad: "pesos",
    descripcion: "~1 cajetilla/día",
  },
  {
    nombre: "Redes sociales",
    emoji: "📱",
    tipo: "tiempo",
    impacto: "negativo",
    valorDiario: 120,
    unidad: "minutos",
    descripcion: "Promedio global: 2+ horas/día",
  },
  {
    nombre: "Aprender idioma",
    emoji: "🌍",
    tipo: "tiempo",
    impacto: "positivo",
    valorDiario: 15,
    unidad: "minutos",
    descripcion: "15 min en Duolingo/día",
  },
  {
    nombre: "Domicilios",
    emoji: "🛵",
    tipo: "dinero",
    impacto: "negativo",
    valorDiario: 25000,
    unidad: "pesos",
    descripcion: "Comida + envío vs. cocinar",
  },
  {
    nombre: "Caminar",
    emoji: "🚶",
    tipo: "salud",
    impacto: "positivo",
    valorDiario: 8000,
    unidad: "pasos",
    descripcion: "Meta: 10.000 pasos/día",
  },
];

interface Resultado {
  semana: number;
  mes: number;
  año: number;
  cincoAños: number;
  diezAños: number;
  equivalencias: { periodo: string; descripcion: string }[];
}

export default function CalculadoraHabitosPage() {
  const { moneda } = useCurrency();
  const [tipoHabito, setTipoHabito] = useState<TipoHabito>("dinero");
  const [tipoImpacto, setTipoImpacto] = useState<TipoImpacto>("positivo");
  const [nombreHabito, setNombreHabito] = useState("");
  const [valorDiario, setValorDiario] = useState("");
  const [frecuencia, setFrecuencia] = useState("7"); // días por semana
  const [tasaInteres, setTasaInteres] = useState("10");
  const [usarInteres, setUsarInteres] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const seleccionarPlantilla = (plantilla: PlantillaHabito) => {
    setTipoHabito(plantilla.tipo);
    setTipoImpacto(plantilla.impacto);
    setNombreHabito(plantilla.nombre);
    setValorDiario(plantilla.valorDiario.toString());
    setFrecuencia("7");
    setResultado(null);
  };

  const calcular = () => {
    const valor = parseFloat(valorDiario) || 0;
    const diasSemana = parseFloat(frecuencia) || 7;
    const tasa = usarInteres && tipoHabito === "dinero" ? (parseFloat(tasaInteres) || 0) / 100 : 0;

    if (valor <= 0) return;

    const valorSemana = valor * diasSemana;
    const valorMes = valorSemana * 4.33;
    const valorAño = valorMes * 12;

    let cincoAños: number;
    let diezAños: number;

    if (tasa > 0) {
      // Cálculo con interés compuesto (aporte mensual)
      const tasaMensual = tasa / 12;
      cincoAños = valorMes * ((Math.pow(1 + tasaMensual, 60) - 1) / tasaMensual);
      diezAños = valorMes * ((Math.pow(1 + tasaMensual, 120) - 1) / tasaMensual);
    } else {
      cincoAños = valorAño * 5;
      diezAños = valorAño * 10;
    }

    const equivalencias = calcularEquivalencias(valorAño, cincoAños, diezAños);

    setResultado({
      semana: valorSemana,
      mes: valorMes,
      año: valorAño,
      cincoAños,
      diezAños,
      equivalencias,
    });
  };

  const calcularEquivalencias = (año: number, cincoAños: number, diezAños: number) => {
    const equivalencias: { periodo: string; descripcion: string }[] = [];

    if (tipoHabito === "tiempo") {
      // Convertir minutos a horas/días
      const horasAño = año / 60;
      const diasAño = horasAño / 24;
      const horasCinco = cincoAños / 60;
      const horasDiez = diezAños / 60;

      equivalencias.push({
        periodo: "1 año",
        descripcion: `${horasAño.toFixed(0)} horas (${diasAño.toFixed(1)} días completos)`,
      });
      equivalencias.push({
        periodo: "5 años",
        descripcion: `${horasCinco.toFixed(0)} horas (${(horasCinco / 24).toFixed(0)} días)`,
      });
      equivalencias.push({
        periodo: "10 años",
        descripcion: `${horasDiez.toFixed(0)} horas (${(horasDiez / 24).toFixed(0)} días)`,
      });

      // Equivalencias específicas
      if (nombreHabito.toLowerCase().includes("leer")) {
        equivalencias.push({
          periodo: "Libros",
          descripcion: `~${Math.floor(horasAño / 5)} libros/año (5h promedio por libro)`,
        });
      }
    } else if (tipoHabito === "dinero") {
      // Equivalencias monetarias
      const precioVacaciones = moneda.codigo === "COP" ? 5000000 : moneda.codigo === "MXN" ? 30000 : 2000;
      const precioIphone = moneda.codigo === "COP" ? 5500000 : moneda.codigo === "MXN" ? 25000 : 1200;

      equivalencias.push({
        periodo: "1 año",
        descripcion: `${(año / precioVacaciones).toFixed(1)} viajes de vacaciones`,
      });
      equivalencias.push({
        periodo: "5 años",
        descripcion: `${(cincoAños / precioIphone).toFixed(0)} iPhones`,
      });

      // Para 10 años con interés compuesto
      const aportadoDiez = (parseFloat(valorDiario) || 0) * (parseFloat(frecuencia) || 7) * 4.33 * 12 * 10;
      if (usarInteres && diezAños > aportadoDiez) {
        equivalencias.push({
          periodo: "Intereses ganados",
          descripcion: `${moneda.simbolo}${formatMoney(diezAños - aportadoDiez)} extras por interés compuesto`,
        });
      }
    } else if (tipoHabito === "salud") {
      // Equivalencias de salud
      if (nombreHabito.toLowerCase().includes("caminar") || nombreHabito.toLowerCase().includes("pasos")) {
        const kmAño = año * 0.0008; // ~0.8m por paso
        equivalencias.push({
          periodo: "Distancia/año",
          descripcion: `${kmAño.toFixed(0)} km caminados`,
        });
      } else {
        const horasAño = año / 60;
        equivalencias.push({
          periodo: "Tiempo invertido",
          descripcion: `${horasAño.toFixed(0)} horas en tu salud al año`,
        });
      }
    }

    return equivalencias;
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(moneda.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getUnidad = () => {
    if (tipoHabito === "dinero") return moneda.simbolo;
    if (tipoHabito === "tiempo") return "min";
    return "uds";
  };

  const getInputPadding = () => {
    if (tipoHabito === "dinero") return "pl-12";
    return "pl-14";
  };

  const getColorClass = () => {
    if (tipoImpacto === "positivo") return "emerald";
    return "rose";
  };

  return (
    <div className="space-y-8">
      <Link
        href="/productividad"
        className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Productividad
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
            <Icon name="target" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora de Hábitos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Mide el impacto acumulado de tus hábitos diarios
          </p>
        </div>

        {/* Plantillas */}
        <div className="mb-8">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
            Elige un hábito común o crea el tuyo
          </p>
          <div className="flex flex-wrap gap-2">
            {plantillas.map((p) => (
              <button
                key={p.nombre}
                onClick={() => seleccionarPlantilla(p)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${nombreHabito === p.nombre
                    ? p.impacto === "positivo"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
              >
                <Icon name={getIconName(p.emoji)} className="w-4 h-4" />
                {p.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Tipo de hábito */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            {(["dinero", "tiempo", "salud"] as TipoHabito[]).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoHabito(tipo)}
                className={`flex-1 px-4 py-3 font-semibold transition-colors text-sm ${tipoHabito === tipo
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
              >
                {tipo === "dinero" ? "💰 Dinero" : tipo === "tiempo" ? "⏰ Tiempo" : "❤️ Salud"}
              </button>
            ))}
          </div>

          {/* Impacto */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTipoImpacto("positivo")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${tipoImpacto === "positivo"
                  ? "bg-emerald-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              ✅ Hábito positivo
            </button>
            <button
              onClick={() => setTipoImpacto("negativo")}
              className={`flex-1 px-5 py-4 font-semibold transition-colors ${tipoImpacto === "negativo"
                  ? "bg-rose-500 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              ❌ Hábito a eliminar
            </button>
          </div>

          {/* Nombre del hábito */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Nombre del hábito
            </label>
            <input
              type="text"
              value={nombreHabito}
              onChange={(e) => setNombreHabito(e.target.value)}
              placeholder="Ej: Leer, Ahorrar, Café..."
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
          </div>

          {/* Valor diario */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                {tipoHabito === "dinero"
                  ? "Monto diario"
                  : tipoHabito === "tiempo"
                    ? "Minutos por día"
                    : "Cantidad diaria"}
              </label>
              {tipoHabito === "dinero" && <CurrencySelector colorClass="amber" />}
            </div>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                {getUnidad()}
              </span>
              <input
                type="number"
                value={valorDiario}
                onChange={(e) => setValorDiario(e.target.value)}
                placeholder={tipoHabito === "dinero" ? "10000" : "30"}
                className={`w-full ${getInputPadding()} pr-6 py-4 rounded-2xl text-lg font-semibold`}
              />
            </div>
          </div>

          {/* Frecuencia */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              ¿Cuántos días por semana?
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setFrecuencia(d.toString())}
                  className={`w-12 h-12 rounded-xl font-bold transition-colors ${frecuencia === d.toString()
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Interés compuesto (solo para dinero positivo) */}
          {tipoHabito === "dinero" && tipoImpacto === "positivo" && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={usarInteres}
                  onChange={(e) => setUsarInteres(e.target.checked)}
                  className="w-5 h-5 rounded-lg accent-emerald-500"
                />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Aplicar interés compuesto (si invierto el ahorro)
                </span>
              </label>
              {usarInteres && (
                <div className="flex items-center gap-3 pl-8">
                  <label className="text-sm text-slate-500">Tasa anual:</label>
                  <input
                    type="number"
                    value={tasaInteres}
                    onChange={(e) => setTasaInteres(e.target.value)}
                    className="w-20 px-3 py-2 rounded-xl text-sm font-semibold"
                  />
                  <span className="text-slate-500">%</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-5 rounded-2xl font-black text-xl hover:opacity-90 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.99]"
          >
            Calcular impacto acumulado
          </button>

          {resultado && (
            <div className="mt-10 space-y-6">
              {/* Encabezado del resultado */}
              <div
                className={`p-6 rounded-3xl text-center ${tipoImpacto === "positivo"
                    ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 ring-1 ring-emerald-100 dark:ring-emerald-900"
                    : "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/50 ring-1 ring-rose-100 dark:ring-rose-900"
                  }`}
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  {tipoImpacto === "positivo" ? "En 10 años ganarás" : "En 10 años perderás"}
                </p>
                <p
                  className={`text-4xl font-black ${tipoImpacto === "positivo" ? "text-emerald-600" : "text-rose-600"
                    }`}
                >
                  {tipoHabito === "dinero" && moneda.simbolo}
                  {formatNumber(resultado.diezAños)}
                  {tipoHabito === "tiempo" && " min"}
                </p>
                {nombreHabito && (
                  <p className="text-slate-500 mt-2">
                    con tu hábito de <strong>{nombreHabito}</strong>
                  </p>
                )}
              </div>

              {/* Timeline de proyecciones */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">
                  Proyección en el tiempo
                </h3>
                <div className="space-y-2">
                  {[
                    { periodo: "1 semana", valor: resultado.semana },
                    { periodo: "1 mes", valor: resultado.mes },
                    { periodo: "1 año", valor: resultado.año },
                    { periodo: "5 años", valor: resultado.cincoAños },
                    { periodo: "10 años", valor: resultado.diezAños },
                  ].map((item, i) => (
                    <div
                      key={item.periodo}
                      className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                    >
                      <span className="text-slate-600 dark:text-slate-400">{item.periodo}</span>
                      <span
                        className={`font-bold text-lg ${tipoImpacto === "positivo" ? "text-emerald-600" : "text-rose-600"
                          }`}
                      >
                        {tipoImpacto === "negativo" && "-"}
                        {tipoHabito === "dinero" && moneda.simbolo}
                        {formatNumber(item.valor)}
                        {tipoHabito === "tiempo" && " min"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equivalencias */}
              {resultado.equivalencias.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">
                    Esto equivale a...
                  </h3>
                  <div className="grid gap-3">
                    {resultado.equivalencias.map((eq, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                      >
                        <p className="text-xs text-slate-500 mb-1">{eq.periodo}</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {eq.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensaje motivacional */}
              <div
                className={`p-6 rounded-2xl border ${tipoImpacto === "positivo"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                  }`}
              >
                <p
                  className={`text-sm ${tipoImpacto === "positivo"
                      ? "text-emerald-800 dark:text-emerald-200"
                      : "text-amber-800 dark:text-amber-200"
                    }`}
                >
                  {tipoImpacto === "positivo" ? (
                    <>
                      <strong>¡Sigue así!</strong> Los pequeños hábitos construyen grandes
                      resultados. La consistencia es más importante que la intensidad.
                    </>
                  ) : (
                    <>
                      <strong>Imagina</strong> lo que podrías hacer con ese{" "}
                      {tipoHabito === "dinero" ? "dinero" : "tiempo"} si eliminas este hábito. Cada
                      día que no lo haces es una victoria.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <Icon name="lightbulb" className="w-8 h-8 text-amber-500" weight="fill" />
            El poder de los hábitos pequeños
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>1% mejor cada día:</strong> Mejorar solo 1% diario te hace 37 veces mejor
                al final del año.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Efecto bola de nieve:</strong> Los hábitos positivos generan más hábitos
                positivos. Empieza con uno y expándete.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Costos ocultos:</strong> Un café diario de {moneda.simbolo}8.000 son casi{" "}
                {moneda.simbolo}3 millones al año. ¿Vale la pena?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-500">•</span>
              <span>
                <strong>Tiempo finito:</strong> 2 horas de redes sociales al día son 30 días
                completos al año. Úsalas sabiamente.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <FAQ items={faqs} colorClass="amber" />
        </div>
      </div>
    </div>
  );
}
