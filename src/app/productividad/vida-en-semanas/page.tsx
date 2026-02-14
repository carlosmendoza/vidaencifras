"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { CalculatorHeader } from "@/components/CalculatorHeader";
import { CalculatorFooter } from "@/components/CalculatorFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/lib/icons";
import { useUrlState } from "@/hooks/useUrlState";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";

const WeeksGrid = dynamic(
  () => import("@/components/charts/WeeksGrid").then((mod) => mod.WeeksGrid),
  { loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" /> }
);

interface Estadisticas {
  semanasVividas: number;
  semanasRestantes: number;
  semanasTotal: number;
  porcentajeVivido: number;
  finesDeSemanaPorVivir: number;
  veranosRestantes: number;
  navidadesRestantes: number;
  cumpleañosRestantes: number;
  añosRestantes: number;
}

interface Hito {
  semana: number;
  nombre: string;
  icon: string;
}

export default function VidaEnSemanasPage() {
  useCalculatorTracking();
  const { values, setField, hadInitialParams } = useUrlState(
    {
      fechaNacimiento: "",
      expectativaVida: "80",
    },
    {
      paramNames: {
        fechaNacimiento: "fn",
        expectativaVida: "ev",
      },
    }
  );
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const estadisticas = useMemo((): Estadisticas | null => {
    if (!values.fechaNacimiento) return null;

    const nacimiento = new Date(values.fechaNacimiento);
    const hoy = new Date();
    const expectativa = parseInt(values.expectativaVida) || 80;

    const msVividos = hoy.getTime() - nacimiento.getTime();
    const semanasVividas = Math.floor(msVividos / (1000 * 60 * 60 * 24 * 7));
    const semanasTotal = expectativa * 52;
    const semanasRestantes = Math.max(0, semanasTotal - semanasVividas);

    const añosVividos = semanasVividas / 52;
    const añosRestantes = Math.max(0, expectativa - añosVividos);

    return {
      semanasVividas,
      semanasRestantes,
      semanasTotal,
      porcentajeVivido: (semanasVividas / semanasTotal) * 100,
      finesDeSemanaPorVivir: semanasRestantes, // Cada semana tiene un fin de semana
      veranosRestantes: Math.floor(añosRestantes),
      navidadesRestantes: Math.floor(añosRestantes),
      cumpleañosRestantes: Math.floor(añosRestantes),
      añosRestantes: Math.floor(añosRestantes),
    };
  }, [values.fechaNacimiento, values.expectativaVida]);

  const hitos = useMemo((): Hito[] => {
    if (!values.fechaNacimiento) return [];

    const nacimiento = new Date(values.fechaNacimiento);
    const añoNacimiento = nacimiento.getFullYear();
    const lista: Hito[] = [];

    // Hitos fijos por edad
    const hitosEdad = [
      { edad: 6, nombre: "Inicio primaria", icon: "books" },
      { edad: 15, nombre: "Quinceañero", icon: "cake" },
      { edad: 18, nombre: "Mayoría de edad", icon: "seal-check" },
      { edad: 22, nombre: "Graduación universidad", icon: "seal-check" },
      { edad: 30, nombre: "30 años", icon: "target" },
      { edad: 40, nombre: "40 años", icon: "target" },
      { edad: 50, nombre: "50 años", icon: "target" },
      { edad: 62, nombre: "Jubilación", icon: "palmtree" },
      { edad: 65, nombre: "65 años", icon: "user" },
    ];

    hitosEdad.forEach((h) => {
      const semana = h.edad * 52;
      if (semana < parseInt(values.expectativaVida) * 52) {
        lista.push({
          semana,
          nombre: h.nombre,
          icon: h.icon,
        });
      }
    });

    return lista;
  }, [values.fechaNacimiento, values.expectativaVida]);

  const calcular = () => {
    if (!values.fechaNacimiento) return;
    setMostrarResultado(true);
  };

  useEffect(() => {
    if (hadInitialParams) calcular();
  }, [hadInitialParams]);

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl shadow-orange-500/5">
        <CalculatorHeader
          title="Tu Vida en Semanas"
          subtitle="Cada cuadrito es una semana de tu vida. ¿Cuántas te quedan?"
          icon="calendar"
          gradient="productividad"
        />

        <div className="max-w-md mx-auto space-y-6">
          {/* Fecha de nacimiento */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Tu fecha de nacimiento
            </label>
            <input
              type="date"
              value={values.fechaNacimiento}
              onChange={(e) => {
                setField("fechaNacimiento", e.target.value);
                setMostrarResultado(false);
              }}
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Expectativa de vida */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Expectativa de vida (años)
            </label>
            <input
              type="number"
              value={values.expectativaVida}
              onChange={(e) => {
                setField("expectativaVida", e.target.value);
                setMostrarResultado(false);
              }}
              placeholder="80"
              min="50"
              max="120"
              className="w-full px-6 py-4 rounded-2xl text-lg font-semibold"
            />
            <div className="flex gap-2 flex-wrap">
              {[75, 80, 85, 90].map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setField("expectativaVida", e.toString());
                    setMostrarResultado(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${values.expectativaVida === e.toString()
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                >
                  {e} años
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calcular}
            disabled={!values.fechaNacimiento}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-[0.99] ${values.fechaNacimiento
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
          >
            Visualizar mi vida
          </button>
        </div>

        {mostrarResultado && estadisticas && (
          <div className="mt-12 space-y-8">
            {/* Estadística principal */}
            <div className="text-center p-8 bg-orange-50 dark:bg-orange-950/50 rounded-3xl">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Has vivido
              </p>
              <p className="text-5xl font-black text-orange-600 mb-2">
                {estadisticas.porcentajeVivido.toFixed(1)}%
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                de tu vida esperada
              </p>

              {/* Barra de progreso */}
              <div className="mt-6 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(estadisticas.porcentajeVivido, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Nacimiento</span>
                <span>Hoy</span>
                <span>{values.expectativaVida} años</span>
              </div>
            </div>

            {/* Grid de semanas */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl overflow-hidden">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">
                Tu vida en semanas
              </h3>
              <WeeksGrid
                semanasVividas={estadisticas.semanasVividas}
                semanasTotal={estadisticas.semanasTotal}
                expectativaVida={parseInt(values.expectativaVida) || 80}
                hitos={hitos}
              />
            </div>

            {/* Estadísticas de momentos restantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                <Icon name="sun" className="w-8 h-8 mx-auto mb-1 text-orange-500" weight="duotone" />
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {estadisticas.veranosRestantes}
                </p>
                <p className="text-xs text-slate-500">veranos más</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                <Icon name="gift" className="w-8 h-8 mx-auto mb-1 text-rose-500" weight="duotone" />
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {estadisticas.navidadesRestantes}
                </p>
                <p className="text-xs text-slate-500">navidades más</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                <Icon name="cake" className="w-8 h-8 mx-auto mb-1 text-pink-500" weight="duotone" />
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {estadisticas.cumpleañosRestantes}
                </p>
                <p className="text-xs text-slate-500">cumpleaños más</p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                <Icon name="calendar-days" library="lucide" className="w-8 h-8 mx-auto mb-1 text-blue-500" />
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {estadisticas.finesDeSemanaPorVivir.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">fines de semana</p>
              </div>
            </div>

            {/* Conteo de semanas */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                <p className="text-2xl font-black text-blue-600">
                  {estadisticas.semanasVividas.toLocaleString()}
                </p>
                <p className="text-xs text-blue-500">semanas vividas</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                <p className="text-2xl font-black text-emerald-600">
                  {estadisticas.semanasRestantes.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-500">semanas restantes</p>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                  {estadisticas.semanasTotal.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">semanas totales</p>
              </div>
            </div>

            {/* Reflexión */}
            <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800">
              <p className="text-orange-800 dark:text-orange-200 text-center">
                <strong>Cada cuadrito vacío es una oportunidad.</strong>
                <br />
                <span className="text-sm">
                  ¿Cómo quieres llenar las semanas que te quedan?
                </span>
              </p>
            </div>

            {/* Perspectiva si vives más */}
            {parseInt(values.expectativaVida) < 90 && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-center">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  <strong>Dato:</strong> Si vives hasta los 90 (posible con buen estilo de vida),
                  tendrías{" "}
                  <strong>
                    {(90 * 52 - estadisticas.semanasVividas).toLocaleString()} semanas
                  </strong>{" "}
                  más – eso son {(90 * 52 - estadisticas.semanasVividas - estadisticas.semanasRestantes).toLocaleString()}{" "}
                  semanas extra.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Información educativa */}
      <div className="max-w-4xl mx-auto">
        <div className="p-8 card-glass rounded-xl">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <Icon name="lightbulb" className="w-8 h-8 text-orange-500" weight="fill" />
            La perspectiva del tiempo
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Memento mori:</strong> Los estoicos usaban esta frase ("recuerda que
                morirás") no para ser pesimistas, sino para vivir con más intención.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>El tiempo con padres:</strong> Si ves a tus padres 10 días al año y les
                quedan 20 años, solo los verás 200 días más. Haz que cuenten.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>Summers left:</strong> Si tienes 30 años y tus padres 60, probablemente
                solo queden 15-20 veranos juntos. Planéalos.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">•</span>
              <span>
                <strong>No es depresión, es claridad:</strong> Ver tu tiempo finito no es triste,
                es liberador. Te ayuda a decir no a lo que no importa.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <CalculatorFooter href="/productividad/vida-en-semanas" />
    </div>
  );
}
