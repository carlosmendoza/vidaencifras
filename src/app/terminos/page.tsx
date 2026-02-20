import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos y condiciones de uso de VidaEnCifras. Lee las reglas y condiciones para usar nuestro sitio.",
  alternates: {
    canonical: "https://vidaencifras.com/terminos",
  },
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-8 gradient-text">Términos de Uso</h1>

      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. Aceptación de los Términos</h2>
          <p className="leading-relaxed">
            Al acceder y utilizar VidaEnCifras (vidaencifras.com), aceptas cumplir con estos términos de uso.
            Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. Descripción del Servicio</h2>
          <p className="leading-relaxed">
            VidaEnCifras ofrece calculadoras online gratuitas y contenido educativo relacionado con
            finanzas personales, salud, tiempo y educación. Todas las herramientas se proporcionan
            &quot;tal cual&quot; y de forma gratuita.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. Uso Permitido</h2>
          <p className="leading-relaxed mb-4">
            Puedes usar nuestras calculadoras y contenido para:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Uso personal y educativo</li>
            <li>Obtener estimaciones y cálculos orientativos</li>
            <li>Compartir los resultados con otras personas</li>
            <li>Enlazar a nuestro contenido desde otros sitios</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. Limitación de Responsabilidad</h2>
          <p className="leading-relaxed mb-4">
            <strong>Importante:</strong> Las calculadoras y el contenido de VidaEnCifras tienen fines
            informativos y educativos únicamente.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>No somos asesores financieros:</strong> Los cálculos de préstamos, interés compuesto
              o inversiones son estimaciones. Consulta con un profesional financiero antes de tomar
              decisiones importantes.
            </li>
            <li>
              <strong>No somos profesionales de la salud:</strong> Los cálculos de IMC, calorías o
              macronutrientes son orientativos. Consulta con un médico o nutricionista para
              recomendaciones personalizadas.
            </li>
            <li>
              <strong>Precisión:</strong> Aunque nos esforzamos por mantener cálculos precisos, no
              garantizamos que estén libres de errores.
            </li>
          </ul>
          <p className="leading-relaxed mt-4">
            VidaEnCifras no se hace responsable de decisiones tomadas basándose en los resultados
            de nuestras calculadoras o el contenido del blog.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. Propiedad Intelectual</h2>
          <p className="leading-relaxed">
            Todo el contenido de VidaEnCifras, incluyendo textos, diseño, código y gráficos, es
            propiedad de VidaEnCifras y está protegido por derechos de autor. No está permitido
            copiar, modificar o distribuir nuestro contenido sin autorización previa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. Uso Prohibido</h2>
          <p className="leading-relaxed mb-4">
            No está permitido:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Usar el sitio para actividades ilegales</li>
            <li>Intentar acceder a sistemas o datos no autorizados</li>
            <li>Interferir con el funcionamiento del sitio</li>
            <li>Copiar o replicar el sitio sin autorización</li>
            <li>Usar bots o scripts automatizados de forma abusiva</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. Disponibilidad del Servicio</h2>
          <p className="leading-relaxed">
            Nos esforzamos por mantener el sitio disponible 24/7, pero no garantizamos disponibilidad
            ininterrumpida. Podemos realizar mantenimientos o cambios sin previo aviso.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. Enlaces Externos</h2>
          <p className="leading-relaxed">
            Nuestro sitio puede contener enlaces a sitios externos. No nos hacemos responsables del
            contenido, políticas de privacidad o prácticas de sitios de terceros.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">9. Modificaciones</h2>
          <p className="leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
            entrarán en vigor inmediatamente después de su publicación en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">10. Ley Aplicable</h2>
          <p className="leading-relaxed">
            Estos términos se rigen por las leyes aplicables en el país de residencia del propietario
            del sitio. Cualquier disputa se resolverá en los tribunales competentes de dicha jurisdicción.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">11. Contacto</h2>
          <p className="leading-relaxed">
            Si tienes preguntas sobre estos términos de uso, puedes escribirnos a través de
            nuestra <a href="/contacto" className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline">página de contacto</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
