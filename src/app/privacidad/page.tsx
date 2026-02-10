import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de VidaEnCifras. Conoce cómo protegemos tu información y qué datos recopilamos.",
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-8 gradient-text">Política de Privacidad</h1>

      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. Información General</h2>
          <p className="leading-relaxed">
            En VidaEnCifras (vidaencifras.com) nos tomamos muy en serio tu privacidad. Esta política describe
            qué información recopilamos, cómo la usamos y tus derechos respecto a ella.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. Información que Recopilamos</h2>

          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">2.1 Datos que NO recopilamos</h3>
          <p className="leading-relaxed mb-4">
            Nuestras calculadoras funcionan 100% en tu navegador. <strong>No almacenamos</strong> ningún dato
            que ingreses en las calculadoras (peso, edad, ingresos, fechas, etc.). Toda la información
            se procesa localmente en tu dispositivo y nunca se envía a nuestros servidores.
          </p>

          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">2.2 Datos que SÍ recopilamos</h3>
          <p className="leading-relaxed mb-4">
            Utilizamos herramientas de análisis para entender cómo los usuarios interactúan con nuestro sitio:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>País y ciudad aproximada (basado en IP)</li>
            <li>Tipo de dispositivo y navegador</li>
            <li>Fuente de tráfico (cómo llegaste al sitio)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. Cookies y Tecnologías de Seguimiento</h2>
          <p className="leading-relaxed mb-4">
            Utilizamos las siguientes tecnologías:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics 4:</strong> Para analizar el tráfico y comportamiento de usuarios</li>
            <li><strong>Google Tag Manager:</strong> Para gestionar las etiquetas de seguimiento</li>
            <li><strong>LocalStorage:</strong> Para guardar tu preferencia de tema (claro/oscuro)</li>
          </ul>
          <p className="leading-relaxed mt-4">
            Puedes desactivar las cookies en la configuración de tu navegador, aunque esto podría
            afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. Uso de la Información</h2>
          <p className="leading-relaxed mb-4">
            La información analítica que recopilamos se usa para:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Mejorar el contenido y las calculadoras</li>
            <li>Entender qué herramientas son más útiles</li>
            <li>Optimizar la experiencia del usuario</li>
            <li>Detectar y prevenir problemas técnicos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. Compartir Información</h2>
          <p className="leading-relaxed">
            <strong>No vendemos ni compartimos</strong> tu información personal con terceros. Los datos
            analíticos son procesados por Google según sus propias políticas de privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. Tus Derechos</h2>
          <p className="leading-relaxed mb-4">
            Tienes derecho a:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Desactivar cookies en tu navegador</li>
            <li>Usar extensiones de bloqueo de rastreadores</li>
            <li>Solicitar información sobre los datos que tenemos</li>
            <li>Solicitar la eliminación de tus datos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. Seguridad</h2>
          <p className="leading-relaxed">
            Nuestro sitio utiliza HTTPS para encriptar toda la comunicación. Al no almacenar datos
            personales en nuestros servidores, minimizamos los riesgos de seguridad.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. Cambios en esta Política</h2>
          <p className="leading-relaxed">
            Podemos actualizar esta política ocasionalmente. Publicaremos cualquier cambio en esta página
            con una nueva fecha de actualización.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">9. Contacto</h2>
          <p className="leading-relaxed">
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de
            nuestras redes sociales o dejando un comentario en el blog.
          </p>
        </section>
      </div>
    </div>
  );
}
