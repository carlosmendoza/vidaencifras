import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Conoce quién está detrás de VidaEnCifras y cómo contactarnos. Calculadoras gratuitas para la vida adulta en Colombia.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-8 gradient-text">Contacto</h1>

      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            La historia corta
          </h2>
          <p className="leading-relaxed mb-4">
            Cuando recibí mi primer sueldo y revisé la cuenta, la transacción no coincidía con lo
            que me habían dicho. Sabía que existían descuentos, pero no entendía qué me
            estaban quitando ni por qué.
          </p>
          <p className="leading-relaxed mb-4">
            Busqué en internet y no encontré nada que me lo explicara bien. Soy ingeniero de
            sistemas, así que decidí entenderlo a mi manera: armé mis propias herramientas.
            Algo simple, que me mostrara los números claros.
          </p>
          <p className="leading-relaxed mb-4">
            Con el tiempo pensé que si a mí me había costado descifrarlo, probablemente a
            muchos otros también. Así que las publiqué.
          </p>
          <p className="leading-relaxed">
            Eso es <strong>VidaEnCifras</strong>. No hay un equipo detrás, solo yo
            queriendo hacer algo que le sirva a quien, como yo, necesite resolver estas dudas del día a día.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Escríbeme
          </h2>
          <p className="leading-relaxed mb-4">
            Si algo no cuadra, si quieres sugerir una calculadora o si simplemente quieres
            saludar:
          </p>
          <a
            href="mailto:contacto@vidaencifras.com"
            className="inline-block text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            contacto@vidaencifras.com
          </a>
        </section>
      </div>
    </div>
  );
}
