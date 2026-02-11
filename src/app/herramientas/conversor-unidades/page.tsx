"use client";

import { useUrlState } from "@/hooks/useUrlState";
import Link from "next/link";
import { Icon } from "@/lib/icons";

type Categoria = "longitud" | "peso" | "temperatura" | "volumen" | "area" | "velocidad";

interface Unidad {
  id: string;
  nombre: string;
  simbolo: string;
  factorBase: number; // Factor para convertir a unidad base
}

interface CategoriaData {
  nombre: string;
  icon: string;
  unidadBase: string;
  unidades: Unidad[];
}

const categorias: Record<Categoria, CategoriaData> = {
  longitud: {
    nombre: "Longitud",
    icon: "scale",
    unidadBase: "metros",
    unidades: [
      { id: "km", nombre: "Kilómetros", simbolo: "km", factorBase: 1000 },
      { id: "m", nombre: "Metros", simbolo: "m", factorBase: 1 },
      { id: "cm", nombre: "Centímetros", simbolo: "cm", factorBase: 0.01 },
      { id: "mm", nombre: "Milímetros", simbolo: "mm", factorBase: 0.001 },
      { id: "mi", nombre: "Millas", simbolo: "mi", factorBase: 1609.344 },
      { id: "yd", nombre: "Yardas", simbolo: "yd", factorBase: 0.9144 },
      { id: "ft", nombre: "Pies", simbolo: "ft", factorBase: 0.3048 },
      { id: "in", nombre: "Pulgadas", simbolo: "in", factorBase: 0.0254 },
    ],
  },
  peso: {
    nombre: "Peso / Masa",
    icon: "scale",
    unidadBase: "kilogramos",
    unidades: [
      { id: "t", nombre: "Toneladas", simbolo: "t", factorBase: 1000 },
      { id: "kg", nombre: "Kilogramos", simbolo: "kg", factorBase: 1 },
      { id: "g", nombre: "Gramos", simbolo: "g", factorBase: 0.001 },
      { id: "mg", nombre: "Miligramos", simbolo: "mg", factorBase: 0.000001 },
      { id: "lb", nombre: "Libras", simbolo: "lb", factorBase: 0.453592 },
      { id: "oz", nombre: "Onzas", simbolo: "oz", factorBase: 0.0283495 },
      { id: "st", nombre: "Stones", simbolo: "st", factorBase: 6.35029 },
    ],
  },
  temperatura: {
    nombre: "Temperatura",
    icon: "flame",
    unidadBase: "celsius",
    unidades: [
      { id: "c", nombre: "Celsius", simbolo: "°C", factorBase: 1 },
      { id: "f", nombre: "Fahrenheit", simbolo: "°F", factorBase: 1 },
      { id: "k", nombre: "Kelvin", simbolo: "K", factorBase: 1 },
    ],
  },
  volumen: {
    nombre: "Volumen",
    icon: "drop",
    unidadBase: "litros",
    unidades: [
      { id: "m3", nombre: "Metros cúbicos", simbolo: "m³", factorBase: 1000 },
      { id: "l", nombre: "Litros", simbolo: "L", factorBase: 1 },
      { id: "ml", nombre: "Mililitros", simbolo: "mL", factorBase: 0.001 },
      { id: "gal", nombre: "Galones (US)", simbolo: "gal", factorBase: 3.78541 },
      { id: "qt", nombre: "Cuartos (US)", simbolo: "qt", factorBase: 0.946353 },
      { id: "pt", nombre: "Pintas (US)", simbolo: "pt", factorBase: 0.473176 },
      { id: "cup", nombre: "Tazas (US)", simbolo: "cup", factorBase: 0.236588 },
      { id: "floz", nombre: "Onzas fluidas", simbolo: "fl oz", factorBase: 0.0295735 },
    ],
  },
  area: {
    nombre: "Área",
    icon: "scale",
    unidadBase: "metros cuadrados",
    unidades: [
      { id: "km2", nombre: "Kilómetros²", simbolo: "km²", factorBase: 1000000 },
      { id: "ha", nombre: "Hectáreas", simbolo: "ha", factorBase: 10000 },
      { id: "m2", nombre: "Metros²", simbolo: "m²", factorBase: 1 },
      { id: "cm2", nombre: "Centímetros²", simbolo: "cm²", factorBase: 0.0001 },
      { id: "mi2", nombre: "Millas²", simbolo: "mi²", factorBase: 2589988.11 },
      { id: "ac", nombre: "Acres", simbolo: "ac", factorBase: 4046.86 },
      { id: "ft2", nombre: "Pies²", simbolo: "ft²", factorBase: 0.092903 },
    ],
  },
  velocidad: {
    nombre: "Velocidad",
    icon: "lightning",
    unidadBase: "m/s",
    unidades: [
      { id: "kmh", nombre: "Kilómetros/hora", simbolo: "km/h", factorBase: 0.277778 },
      { id: "ms", nombre: "Metros/segundo", simbolo: "m/s", factorBase: 1 },
      { id: "mph", nombre: "Millas/hora", simbolo: "mph", factorBase: 0.44704 },
      { id: "kn", nombre: "Nudos", simbolo: "kn", factorBase: 0.514444 },
      { id: "fts", nombre: "Pies/segundo", simbolo: "ft/s", factorBase: 0.3048 },
    ],
  },
};

export default function ConversorUnidades() {
  const { values, setField } = useUrlState(
    { categoria: "longitud", valor: "", unidadOrigen: "m", unidadDestino: "km" },
    { paramNames: { categoria: "cat", valor: "v", unidadOrigen: "de", unidadDestino: "a" } }
  );

  const categoria = values.categoria as Categoria;
  const valor = values.valor;
  const unidadOrigen = values.unidadOrigen;
  const unidadDestino = values.unidadDestino;

  const catData = categorias[categoria];

  const convertirTemperatura = (valor: number, origen: string, destino: string): number => {
    // Primero convertir a Celsius
    let celsius: number;
    switch (origen) {
      case "f":
        celsius = (valor - 32) * 5/9;
        break;
      case "k":
        celsius = valor - 273.15;
        break;
      default:
        celsius = valor;
    }

    // Luego convertir de Celsius a destino
    switch (destino) {
      case "f":
        return celsius * 9/5 + 32;
      case "k":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convertir = (): number | null => {
    const num = parseFloat(valor);
    if (isNaN(num)) return null;

    if (categoria === "temperatura") {
      return convertirTemperatura(num, unidadOrigen, unidadDestino);
    }

    const unidadOrigenData = catData.unidades.find(u => u.id === unidadOrigen);
    const unidadDestinoData = catData.unidades.find(u => u.id === unidadDestino);

    if (!unidadOrigenData || !unidadDestinoData) return null;

    const valorBase = num * unidadOrigenData.factorBase;
    return valorBase / unidadDestinoData.factorBase;
  };

  const resultado = convertir();

  const intercambiar = () => {
    const temp = unidadOrigen;
    setField("unidadOrigen", unidadDestino);
    setField("unidadDestino", temp);
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1000000) {
      return num.toExponential(6);
    }
    return num.toLocaleString("es-ES", { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="card-glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl shadow-indigo-500/5">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
            <Icon name="refresh" className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Conversor de Unidades
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Convierte entre diferentes sistemas de medida
          </p>
        </div>

        <div className="space-y-6">
          {/* Categorías */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(Object.keys(categorias) as Categoria[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setField("categoria", cat);
                  setField("unidadOrigen", categorias[cat].unidades[0].id);
                  setField("unidadDestino", categorias[cat].unidades[1].id);
                  setField("valor", "");
                }}
                className={`p-3 rounded-xl text-center transition-all ${
                  categoria === cat
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <p className="text-xl mb-1"><Icon name={categorias[cat].icon} className="w-5 h-5 mx-auto" /></p>
                <p className="text-xs font-bold">{categorias[cat].nombre}</p>
              </button>
            ))}
          </div>

          {/* Input y selects */}
          <div className="space-y-4">
            {/* Valor origen */}
            <div className="flex gap-3">
              <input
                type="number"
                value={valor}
                onChange={(e) => setField("valor", e.target.value)}
                placeholder="0"
                className="flex-1 px-6 py-4 rounded-2xl text-xl font-semibold"
              />
              <select
                value={unidadOrigen}
                onChange={(e) => setField("unidadOrigen", e.target.value)}
                className="px-4 py-4 rounded-2xl font-semibold bg-slate-100 dark:bg-slate-800 min-w-[120px]"
              >
                {catData.unidades.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.simbolo}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón intercambiar */}
            <div className="flex justify-center">
              <button
                onClick={intercambiar}
                className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors"
              >
                ⇅
              </button>
            </div>

            {/* Resultado */}
            <div className="flex gap-3">
              <div className="flex-1 px-6 py-4 rounded-2xl text-xl font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 ring-1 ring-indigo-100 dark:ring-indigo-900">
                {resultado !== null ? formatNumber(resultado) : "0"}
              </div>
              <select
                value={unidadDestino}
                onChange={(e) => setField("unidadDestino", e.target.value)}
                className="px-4 py-4 rounded-2xl font-semibold bg-slate-100 dark:bg-slate-800 min-w-[120px]"
              >
                {catData.unidades.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.simbolo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conversión en texto */}
          {resultado !== null && valor && (
            <div className="p-4 bg-white/60 rounded-xl text-center ring-1 ring-slate-100 dark:ring-slate-900">
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                <span className="font-bold text-slate-800 dark:text-slate-100">{valor} {catData.unidades.find(u => u.id === unidadOrigen)?.simbolo}</span>
                {" = "}
                <span className="font-bold text-indigo-600">{formatNumber(resultado)} {catData.unidades.find(u => u.id === unidadDestino)?.simbolo}</span>
              </p>
            </div>
          )}

          {/* Tabla de conversiones rápidas */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Conversiones comunes</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {catData.unidades.slice(0, 6).map((u) => {
                if (u.id === unidadOrigen || !valor) return null;
                const valorNum = parseFloat(valor);
                if (isNaN(valorNum)) return null;

                let converted: number;
                if (categoria === "temperatura") {
                  converted = convertirTemperatura(valorNum, unidadOrigen, u.id);
                } else {
                  const origenData = catData.unidades.find(x => x.id === unidadOrigen);
                  const valorBase = valorNum * (origenData?.factorBase || 1);
                  converted = valorBase / u.factorBase;
                }

                return (
                  <div key={u.id} className="flex justify-between p-2 bg-white rounded-lg">
                    <span className="text-slate-500 dark:text-slate-400">{u.nombre}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{formatNumber(converted)} {u.simbolo}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
