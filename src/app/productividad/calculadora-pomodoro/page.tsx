"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";

const faqs = [
  {
    question: "¿Qué es la técnica Pomodoro?",
    answer:
      "Es un método de gestión del tiempo creado por Francesco Cirillo. Consiste en trabajar en bloques de 25 minutos (pomodoros) con descansos cortos de 5 minutos. Después de 4 pomodoros, tomas un descanso largo de 15-30 minutos.",
  },
  {
    question: "¿Por qué funcionan los bloques de 25 minutos?",
    answer:
      "25 minutos es el tiempo óptimo para mantener la concentración sin fatigarse. Es lo suficientemente corto para sentirse manejable, pero lo suficientemente largo para hacer progreso real. Los descansos previenen el agotamiento mental.",
  },
  {
    question: "¿Qué hago si me interrumpen durante un pomodoro?",
    answer:
      "Apunta la interrupción y vuelve a tu tarea. Si es urgente, detén el pomodoro (ese pomodoro no cuenta) y reinicia después. Con práctica, aprenderás a proteger tus pomodoros de interrupciones.",
  },
  {
    question: "¿Puedo ajustar la duración de los pomodoros?",
    answer:
      "Sí. Aunque 25 minutos es el estándar, puedes experimentar con 50/10 para trabajo profundo o 15/5 si recién empiezas. Lo importante es mantener la proporción trabajo/descanso y ser consistente.",
  },
];

type TimerMode = "trabajo" | "descanso-corto" | "descanso-largo";
type ViewMode = "planificar" | "temporizador";

interface TimerConfig {
  trabajo: number;
  descansoCorto: number;
  descansoLargo: number;
  pomodorosPorCiclo: number;
}

interface PlanItem {
  tipo: TimerMode;
  horaInicio: string;
  horaFin: string;
  duracion: number;
  numero?: number;
}

const defaultConfig: TimerConfig = {
  trabajo: 25,
  descansoCorto: 5,
  descansoLargo: 15,
  pomodorosPorCiclo: 4,
};

export default function CalculadoraPomodoro() {
  // Configuración
  const [config, setConfig] = useState<TimerConfig>(defaultConfig);

  // Vista activa
  const [viewMode, setViewMode] = useState<ViewMode>("planificar");

  // Planificación
  const [horasDisponibles, setHorasDisponibles] = useState(4);
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  // Temporizador
  const [mode, setMode] = useState<TimerMode>("trabajo");
  const [timeLeft, setTimeLeft] = useState(config.trabajo * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompletados, setPomodorosCompletados] = useState(0);
  const [pomodorosEnCiclo, setPomodorosEnCiclo] = useState(0);
  const [autoStart, setAutoStart] = useState(false);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  // Cargar configuración del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
        setTimeLeft(parsed.trabajo * 60);
      } catch {
        // Ignorar errores de parsing
      }
    }
  }, []);

  // Guardar configuración en localStorage
  const saveConfig = (newConfig: TimerConfig) => {
    setConfig(newConfig);
    localStorage.setItem("pomodoro-config", JSON.stringify(newConfig));
    if (!isRunning) {
      setTimeLeft(newConfig.trabajo * 60);
    }
  };

  // Calcular cuántos pomodoros caben en el tiempo disponible
  const calcularPlan = useCallback(() => {
    const minutosDisponibles = horasDisponibles * 60;
    const duracionCiclo = (config.trabajo + config.descansoCorto) * config.pomodorosPorCiclo - config.descansoCorto + config.descansoLargo;
    const duracionPomodoro = config.trabajo + config.descansoCorto;

    const nuevoPlan: PlanItem[] = [];
    let minutosUsados = 0;
    let pomodoroNumero = 0;
    let pomodorosEnCicloActual = 0;

    // Parsear hora de inicio
    const [horas, minutos] = horaInicio.split(":").map(Number);
    let tiempoActual = new Date();
    tiempoActual.setHours(horas, minutos, 0, 0);

    const formatearHora = (date: Date) => {
      return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    while (minutosUsados + config.trabajo <= minutosDisponibles) {
      pomodoroNumero++;
      pomodorosEnCicloActual++;

      // Agregar pomodoro de trabajo
      const inicioTrabajo = new Date(tiempoActual);
      tiempoActual.setMinutes(tiempoActual.getMinutes() + config.trabajo);
      const finTrabajo = new Date(tiempoActual);

      nuevoPlan.push({
        tipo: "trabajo",
        horaInicio: formatearHora(inicioTrabajo),
        horaFin: formatearHora(finTrabajo),
        duracion: config.trabajo,
        numero: pomodoroNumero,
      });

      minutosUsados += config.trabajo;

      // Verificar si hay tiempo para descanso
      if (minutosUsados >= minutosDisponibles) break;

      // Determinar tipo de descanso
      if (pomodorosEnCicloActual >= config.pomodorosPorCiclo) {
        // Descanso largo
        if (minutosUsados + config.descansoLargo <= minutosDisponibles) {
          const inicioDescanso = new Date(tiempoActual);
          tiempoActual.setMinutes(tiempoActual.getMinutes() + config.descansoLargo);
          const finDescanso = new Date(tiempoActual);

          nuevoPlan.push({
            tipo: "descanso-largo",
            horaInicio: formatearHora(inicioDescanso),
            horaFin: formatearHora(finDescanso),
            duracion: config.descansoLargo,
          });

          minutosUsados += config.descansoLargo;
          pomodorosEnCicloActual = 0;
        }
      } else {
        // Descanso corto
        if (minutosUsados + config.descansoCorto <= minutosDisponibles) {
          const inicioDescanso = new Date(tiempoActual);
          tiempoActual.setMinutes(tiempoActual.getMinutes() + config.descansoCorto);
          const finDescanso = new Date(tiempoActual);

          nuevoPlan.push({
            tipo: "descanso-corto",
            horaInicio: formatearHora(inicioDescanso),
            horaFin: formatearHora(finDescanso),
            duracion: config.descansoCorto,
          });

          minutosUsados += config.descansoCorto;
        }
      }
    }

    setPlan(nuevoPlan);
    setShowPlan(true);
  }, [horasDisponibles, horaInicio, config]);

  // Iniciar sesión con el plan
  const iniciarSesion = () => {
    if (plan.length === 0) {
      calcularPlan();
    }
    setCurrentPlanIndex(0);
    setPomodorosCompletados(0);
    setPomodorosEnCiclo(0);
    setMode("trabajo");
    setTimeLeft(config.trabajo * 60);
    setViewMode("temporizador");
  };

  // Reproducir sonido de notificación
  const playNotification = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";
      gainNode.gain.value = 0.3;

      oscillator.start();

      setTimeout(() => { gainNode.gain.value = 0; }, 200);
      setTimeout(() => { gainNode.gain.value = 0.3; }, 400);
      setTimeout(() => { gainNode.gain.value = 0; }, 600);
      setTimeout(() => { gainNode.gain.value = 0.3; }, 800);
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 1000);
    } catch {
      // Silenciar errores de audio
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(mode === "trabajo" ? "¡Pomodoro completado!" : "¡Descanso terminado!", {
        body: mode === "trabajo" ? "Toma un descanso" : "Vuelve al trabajo",
        icon: "🍅",
      });
    }
  }, [mode]);

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playNotification();

      if (mode === "trabajo") {
        const newPomodorosCompletados = pomodorosCompletados + 1;
        const newPomodorosEnCiclo = pomodorosEnCiclo + 1;

        setPomodorosCompletados(newPomodorosCompletados);
        setPomodorosEnCiclo(newPomodorosEnCiclo);
        setCurrentPlanIndex(prev => prev + 1);

        if (newPomodorosEnCiclo >= config.pomodorosPorCiclo) {
          setMode("descanso-largo");
          setTimeLeft(config.descansoLargo * 60);
          setPomodorosEnCiclo(0);
        } else {
          setMode("descanso-corto");
          setTimeLeft(config.descansoCorto * 60);
        }
      } else {
        setMode("trabajo");
        setTimeLeft(config.trabajo * 60);
        setCurrentPlanIndex(prev => prev + 1);
      }

      if (!autoStart) {
        setIsRunning(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, pomodorosCompletados, pomodorosEnCiclo, config, autoStart, playNotification]);

  const toggleTimer = () => {
    if (!isRunning) {
      requestNotificationPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("trabajo");
    setTimeLeft(config.trabajo * 60);
  };

  const skipToNext = () => {
    setIsRunning(false);
    setCurrentPlanIndex(prev => prev + 1);
    if (mode === "trabajo") {
      if (pomodorosEnCiclo + 1 >= config.pomodorosPorCiclo) {
        setMode("descanso-largo");
        setTimeLeft(config.descansoLargo * 60);
      } else {
        setMode("descanso-corto");
        setTimeLeft(config.descansoCorto * 60);
      }
    } else {
      setMode("trabajo");
      setTimeLeft(config.trabajo * 60);
    }
  };

  const volverAPlanificar = () => {
    setIsRunning(false);
    setViewMode("planificar");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const total = mode === "trabajo"
      ? config.trabajo * 60
      : mode === "descanso-corto"
        ? config.descansoCorto * 60
        : config.descansoLargo * 60;
    return ((total - timeLeft) / total) * 100;
  };

  const getModeInfo = () => {
    switch (mode) {
      case "trabajo":
        return {
          label: "Tiempo de trabajo",
          emoji: "🍅",
          color: "text-red-500",
          bgColor: "from-red-500 to-rose-500",
          ringColor: "ring-red-200 dark:ring-red-800",
          bgGradient: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30",
        };
      case "descanso-corto":
        return {
          label: "Descanso corto",
          emoji: "💧",
          color: "text-emerald-500",
          bgColor: "from-emerald-500 to-teal-500",
          ringColor: "ring-emerald-200 dark:ring-emerald-800",
          bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
        };
      case "descanso-largo":
        return {
          label: "Descanso largo",
          emoji: "☕",
          color: "text-blue-500",
          bgColor: "from-blue-500 to-teal-500",
          ringColor: "ring-blue-200 dark:ring-blue-800",
          bgGradient: "from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30",
        };
    }
  };

  const totalPomodoros = plan.filter(p => p.tipo === "trabajo").length;
  const tiempoTrabajo = totalPomodoros * config.trabajo;
  const tiempoDescanso = plan.filter(p => p.tipo !== "trabajo").reduce((acc, p) => acc + p.duracion, 0);

  const modeInfo = getModeInfo();

  return (
    <div className="space-y-8">
      <Link
        href="/productividad"
        className="text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 inline-flex items-center gap-2 font-medium transition-colors"
      >
        <span>←</span> Volver a Productividad
      </Link>

      <div className="card-glass rounded-[2.5rem] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-amber-500/5">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            🍅
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
            Calculadora Pomodoro
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Planifica tu sesión y trabaja enfocado
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setViewMode("planificar")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              viewMode === "planificar"
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            📋 Planificar
          </button>
          <button
            onClick={() => setViewMode("temporizador")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              viewMode === "temporizador"
                ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            ⏱️ Temporizador
          </button>
        </div>

        {/* Vista Planificar */}
        {viewMode === "planificar" && (
          <div className="space-y-6">
            {/* Inputs de planificación */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Tiempo disponible
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={horasDisponibles}
                    onChange={(e) => setHorasDisponibles(parseFloat(e.target.value) || 1)}
                    min="0.5"
                    max="12"
                    step="0.5"
                    className="w-full px-4 py-3 pr-16 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-amber-400 focus:ring-0 text-lg font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    horas
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Hora de inicio
                </label>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-amber-400 focus:ring-0 text-lg font-bold"
                />
              </div>
            </div>

            {/* Configuración de tiempos */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-4">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Configuración</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500">Trabajo</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={config.trabajo}
                      onChange={(e) => saveConfig({ ...config, trabajo: parseInt(e.target.value) || 25 })}
                      min="1"
                      max="60"
                      className="w-full px-2 py-2 rounded-lg text-center font-bold text-sm"
                    />
                    <span className="text-xs text-slate-400">min</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500">Descanso</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={config.descansoCorto}
                      onChange={(e) => saveConfig({ ...config, descansoCorto: parseInt(e.target.value) || 5 })}
                      min="1"
                      max="30"
                      className="w-full px-2 py-2 rounded-lg text-center font-bold text-sm"
                    />
                    <span className="text-xs text-slate-400">min</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500">Largo</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={config.descansoLargo}
                      onChange={(e) => saveConfig({ ...config, descansoLargo: parseInt(e.target.value) || 15 })}
                      min="1"
                      max="60"
                      className="w-full px-2 py-2 rounded-lg text-center font-bold text-sm"
                    />
                    <span className="text-xs text-slate-400">min</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500">Por ciclo</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={config.pomodorosPorCiclo}
                      onChange={(e) => saveConfig({ ...config, pomodorosPorCiclo: parseInt(e.target.value) || 4 })}
                      min="2"
                      max="8"
                      className="w-full px-2 py-2 rounded-lg text-center font-bold text-sm"
                    />
                    <span className="text-xs text-slate-400">🍅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón calcular */}
            <button
              onClick={calcularPlan}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/25"
            >
              Calcular mi plan
            </button>

            {/* Resultados del plan */}
            {showPlan && plan.length > 0 && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Resumen */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                    <p className="text-3xl font-black text-red-500">{totalPomodoros}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pomodoros</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                    <p className="text-3xl font-black text-emerald-500">
                      {Math.floor(tiempoTrabajo / 60)}h {tiempoTrabajo % 60}m
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trabajo</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                    <p className="text-3xl font-black text-blue-500">
                      {tiempoDescanso}m
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descanso</p>
                  </div>
                </div>

                {/* Horario */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Tu horario</p>
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                    {plan.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          item.tipo === "trabajo"
                            ? "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                            : item.tipo === "descanso-corto"
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500"
                            : "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {item.tipo === "trabajo" ? "🍅" : item.tipo === "descanso-corto" ? "💧" : "☕"}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                              {item.tipo === "trabajo"
                                ? `Pomodoro #${item.numero}`
                                : item.tipo === "descanso-corto"
                                ? "Descanso corto"
                                : "Descanso largo"}
                            </p>
                            <p className="text-xs text-slate-500">{item.duracion} min</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm font-semibold text-slate-600 dark:text-slate-300">
                            {item.horaInicio}
                          </p>
                          <p className="font-mono text-xs text-slate-400">
                            → {item.horaFin}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón iniciar sesión */}
                <button
                  onClick={iniciarSesion}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <span>▶️</span> Iniciar sesión
                </button>
              </div>
            )}
          </div>
        )}

        {/* Vista Temporizador */}
        {viewMode === "temporizador" && (
          <div className="space-y-6">
            {/* Timer principal */}
            <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${modeInfo.bgGradient} ring-1 ${modeInfo.ringColor}`}>
              {/* Progress ring */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200 dark:text-slate-700"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - getProgress() / 100)}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={mode === "trabajo" ? "#ef4444" : mode === "descanso-corto" ? "#10b981" : "#3b82f6"} />
                      <stop offset="100%" stopColor={mode === "trabajo" ? "#f43f5e" : mode === "descanso-corto" ? "#14b8a6" : "#6366f1"} />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Timer display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl mb-2">{modeInfo.emoji}</span>
                  <span className={`text-6xl font-black ${modeInfo.color} tabular-nums`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    {modeInfo.label}
                  </span>
                </div>
              </div>

              {/* Controles */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${modeInfo.bgColor} text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform`}
                >
                  {isRunning ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={resetTimer}
                  className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Reiniciar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>

                <button
                  onClick={skipToNext}
                  className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Saltar"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 4l10 8-10 8V4zm9 0h4v16h-4V4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Estadísticas de la sesión */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-3xl font-black text-red-500">{pomodorosCompletados}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completados</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-3xl font-black text-slate-700 dark:text-slate-200">
                  {pomodorosEnCiclo}/{config.pomodorosPorCiclo}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ciclo actual</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <p className="text-3xl font-black text-emerald-500">
                  {Math.floor(pomodorosCompletados * config.trabajo / 60)}h {(pomodorosCompletados * config.trabajo) % 60}m
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trabajo</p>
              </div>
            </div>

            {/* Indicador de ciclo */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: config.pomodorosPorCiclo }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all ${
                    i < pomodorosEnCiclo
                      ? "bg-red-500 scale-110"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>

            {/* Progreso del plan */}
            {plan.length > 0 && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Progreso del plan
                  </p>
                  <p className="text-sm text-slate-500">
                    {Math.min(currentPlanIndex, plan.length)} / {plan.length}
                  </p>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all"
                    style={{ width: `${(Math.min(currentPlanIndex, plan.length) / plan.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Opciones */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoStart}
                  onChange={(e) => setAutoStart(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-slate-300 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Iniciar automáticamente
                </span>
              </label>
            </div>

            {/* Botón volver a planificar */}
            <button
              onClick={volverAPlanificar}
              className="w-full py-3 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 font-medium transition-colors"
            >
              ← Volver a planificar
            </button>
          </div>
        )}
      </div>

      {/* Información educativa */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 card-glass rounded-[2rem]">
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center text-base">💡</span>
            Cómo usar la técnica Pomodoro
          </h2>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300 list-decimal list-inside">
            <li className="pl-2">
              <strong>Planifica tu sesión</strong> - indica cuánto tiempo tienes disponible
            </li>
            <li className="pl-2">
              <strong>Revisa tu horario</strong> - verás cuántos pomodoros puedes hacer
            </li>
            <li className="pl-2">
              <strong>Inicia el temporizador</strong> y trabaja sin interrupciones
            </li>
            <li className="pl-2">
              <strong>Cuando suene</strong>, toma el descanso indicado
            </li>
            <li className="pl-2">
              <strong>Durante los descansos</strong>: estira, toma agua, NO revises el celular
            </li>
          </ol>
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-2xl mx-auto">
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>Tip:</strong> Durante el pomodoro, silencia notificaciones y evita distracciones.
            Si surge algo urgente, anótalo y continúa. Trátalo en el descanso o después.
          </p>
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
