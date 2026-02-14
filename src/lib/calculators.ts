import { gradients, textColors, shadowColors } from "./colors";

// --- Interfaces existentes ---

export interface Calculadora {
  nombre: string;
  descripcion: string;
  href: string;
  icon: string;
  gradient: string;
  categoria: "finanzas" | "salud" | "productividad" | "herramientas";
}

export interface Pilar {
  nombre: string;
  descripcion: string;
  href: string;
  icon: string;
  gradient: string;
  color: string;
  cardHover: string;
  calculadoras: string[];
}

// --- Nuevas interfaces para metadata centralizada ---

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculadoraMeta extends Calculadora {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
  };
  jsonLd: {
    name: string;
    description: string;
    applicationCategory: string;
    priceCurrency: "COP" | "USD";
  };
  faqs: FAQItem[];
  header: {
    title: string;
    subtitle: string;
  };
}

// --- Color helpers ---

export const categoryColorClass = {
  salud: "red",
  finanzas: "teal",
  productividad: "orange",
  herramientas: "purple",
} as const;

export const cardHoverClasses = {
  salud: "card-hover-red",
  finanzas: "card-hover-emerald",
  productividad: "card-hover-amber",
  herramientas: "card-hover-indigo",
} as const;

// --- Pilares principales para la página de inicio ---

export const pilares: Pilar[] = [
  {
    nombre: "Salud",
    descripcion: "Cuida tu bienestar físico con datos precisos sobre calorías, IMC y más",
    href: "/salud",
    icon: "heart",
    gradient: gradients.salud,
    color: textColors.salud,
    cardHover: cardHoverClasses.salud,
    calculadoras: ["Calorías (TDEE)", "IMC", "Hidratación"],
  },
  {
    nombre: "Finanzas",
    descripcion: "Toma el control de tu dinero con herramientas de inversión y préstamos",
    href: "/finanzas",
    icon: "wallet",
    gradient: gradients.finanzas,
    color: textColors.finanzas,
    cardHover: cardHoverClasses.finanzas,
    calculadoras: ["Impuesto Renta", "CDTs", "Arriendo vs Compra"],
  },
  {
    nombre: "Productividad",
    descripcion: "Optimiza tu tiempo con herramientas de hábitos, metas y gestión personal",
    href: "/productividad",
    icon: "clock",
    gradient: gradients.productividad,
    color: textColors.productividad,
    cardHover: cardHoverClasses.productividad,
    calculadoras: ["Matriz Eisenhower", "Pomodoro", "Valor Hora"],
  },
];

// ============================================================
// REGISTRY: Todas las calculadoras con metadata completa
// ============================================================

const registroSalud: CalculadoraMeta[] = [
  {
    nombre: "Calorías (TDEE)",
    descripcion: "Calcula tu gasto calórico diario",
    href: "/salud/calculadora-calorias",
    icon: "flame",
    gradient: gradients.salud,
    categoria: "salud",
    meta: {
      title: "Calculadora de Calorías TDEE y Macros Online",
      description: "Calcula tu gasto calórico diario (TDEE), metabolismo basal (TMB) y distribución de macronutrientes según tu objetivo: perder peso, mantener o ganar masa muscular.",
      keywords: ["calculadora TDEE", "calcular calorías diarias", "gasto calórico", "metabolismo basal", "TMB calculadora", "macronutrientes", "calorías para bajar de peso", "calorías mantenimiento", "déficit calórico"],
      ogDescription: "Calcula cuántas calorías necesitas al día según tu actividad física y objetivo personal.",
    },
    jsonLd: {
      name: "Calculadora de Calorías TDEE",
      description: "Calcula tu gasto calórico diario, metabolismo basal y macronutrientes personalizados.",
      applicationCategory: "HealthApplication",
      priceCurrency: "USD",
    },
    faqs: [
      { question: "¿Qué es el TDEE y cómo se calcula?", answer: "TDEE (Total Daily Energy Expenditure) es el total de calorías que quemas al día, incluyendo actividad física. Se calcula multiplicando tu TMB (metabolismo basal) por un factor de actividad." },
      { question: "¿Qué es el metabolismo basal (TMB)?", answer: "El TMB son las calorías que tu cuerpo necesita en reposo absoluto para funciones vitales como respirar, bombear sangre y mantener la temperatura corporal. Representa aproximadamente el 60-75% de tu gasto total." },
      { question: "¿Cuántas calorías debo comer para bajar de peso?", answer: "Para perder peso de forma saludable, se recomienda un déficit de 300-500 calorías diarias respecto a tu TDEE. Esto permite perder aproximadamente 0.5 kg por semana sin afectar tu metabolismo." },
      { question: "¿Qué son los macronutrientes y por qué importan?", answer: "Los macronutrientes son proteínas, carbohidratos y grasas. Su distribución afecta tus resultados: más proteína ayuda a mantener músculo, los carbohidratos dan energía, y las grasas son esenciales para hormonas." },
    ],
    header: { title: "Calculadora de Calorías", subtitle: "TDEE y macronutrientes personalizados" },
  },
  {
    nombre: "IMC",
    descripcion: "Calcula tu índice de masa corporal",
    href: "/salud/calculadora-imc",
    icon: "scale",
    gradient: gradients.salud,
    categoria: "salud",
    meta: {
      title: "Calculadora de IMC (Índice de Masa Corporal) Online",
      description: "Calcula tu Índice de Masa Corporal (IMC) y conoce tu peso ideal. Incluye clasificación OMS, indicador visual y recomendaciones personalizadas.",
      keywords: ["calculadora IMC", "índice masa corporal", "calcular IMC", "peso ideal", "IMC adultos", "clasificación IMC", "sobrepeso", "obesidad calculadora", "IMC OMS"],
      ogDescription: "Calcula tu IMC y conoce si estás en tu peso ideal. Incluye clasificación y peso recomendado.",
    },
    jsonLd: {
      name: "Calculadora de IMC",
      description: "Calcula tu Índice de Masa Corporal y conoce tu peso ideal.",
      applicationCategory: "HealthApplication",
      priceCurrency: "USD",
    },
    faqs: [
      { question: "¿Qué es el IMC y cómo se calcula?", answer: "El IMC (Índice de Masa Corporal) es una medida que relaciona tu peso con tu altura. Se calcula dividiendo tu peso en kilogramos entre tu altura en metros al cuadrado: IMC = peso / (altura × altura)." },
      { question: "¿Cuáles son los rangos normales de IMC?", answer: "Según la OMS: bajo peso es menos de 18.5, peso normal es 18.5-24.9, sobrepeso es 25-29.9, y obesidad es 30 o más. Estos rangos son para adultos y pueden variar según etnia y edad." },
      { question: "¿El IMC es preciso para todas las personas?", answer: "El IMC es una referencia general pero tiene limitaciones. No distingue entre masa muscular y grasa, por lo que atletas musculosos pueden tener IMC alto sin exceso de grasa. También varía su interpretación por edad y sexo." },
      { question: "¿Cuál es mi peso ideal según el IMC?", answer: "Tu peso ideal es el rango donde tu IMC está entre 18.5 y 24.9. Para calcularlo: peso mínimo = 18.5 × altura² y peso máximo = 24.9 × altura² (altura en metros)." },
    ],
    header: { title: "Calculadora de IMC", subtitle: "Índice de Masa Corporal" },
  },
  {
    nombre: "Hidratación",
    descripcion: "Calcula cuánta agua debes tomar",
    href: "/salud/calculadora-hidratacion",
    icon: "droplets",
    gradient: gradients.salud,
    categoria: "salud",
    meta: {
      title: "Calculadora de Hidratación - ¿Cuánta Agua Debo Tomar al Día?",
      description: "Calcula cuántos litros de agua necesitas beber al día según tu peso, actividad física y clima. Incluye tips de hidratación y distribución por vasos.",
      keywords: ["calculadora hidratación", "cuánta agua tomar", "litros de agua al día", "hidratación diaria", "vasos de agua", "agua según peso", "hidratación deportiva", "deshidratación"],
      ogTitle: "Calculadora de Hidratación - ¿Cuánta Agua Debo Tomar?",
      ogDescription: "Descubre cuántos litros de agua necesitas beber según tu peso, actividad y clima.",
    },
    jsonLd: {
      name: "Calculadora de Hidratación",
      description: "Calcula cuántos litros de agua necesitas beber al día según tu peso, actividad física y clima.",
      applicationCategory: "HealthApplication",
      priceCurrency: "USD",
    },
    faqs: [
      { question: "¿Cuánta agua debo tomar al día?", answer: "La cantidad recomendada varía según tu peso, actividad física y clima. Una regla general es 35ml por kilogramo de peso corporal, ajustada según tu nivel de actividad y el clima donde vives." },
      { question: "¿Cuenta el café y té como hidratación?", answer: "Sí, pero con moderación. Aunque contienen cafeína (diurético leve), la cantidad de agua que aportan supera la pérdida. Sin embargo, el agua pura sigue siendo la mejor opción para hidratarse." },
      { question: "¿Cuáles son los signos de deshidratación?", answer: "Los principales signos son: sed intensa, orina oscura, fatiga, dolor de cabeza, mareos, piel seca y confusión. Si tu orina es amarillo claro, estás bien hidratado." },
      { question: "¿Es malo tomar demasiada agua?", answer: "Sí, beber agua en exceso puede causar hiponatremia (niveles bajos de sodio en sangre). Esto es raro pero puede ocurrir si bebes varios litros en poco tiempo. Escucha a tu cuerpo y bebe gradualmente." },
    ],
    header: { title: "Calculadora de Hidratación", subtitle: "Descubre cuánta agua necesitas al día" },
  },
  {
    nombre: "Frecuencia Cardíaca",
    descripcion: "Calcula tus zonas de entrenamiento",
    href: "/salud/calculadora-frecuencia-cardiaca",
    icon: "heart",
    gradient: gradients.salud,
    categoria: "salud",
    meta: {
      title: "Calculadora de Frecuencia Cardíaca y Zonas de Entrenamiento",
      description: "Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas con el método Karvonen. Optimiza tu entrenamiento cardiovascular.",
      keywords: ["calculadora frecuencia cardiaca", "zonas de entrenamiento", "frecuencia cardiaca maxima", "metodo karvonen", "zonas cardiacas", "fc maxima", "entrenamiento por zonas", "frecuencia cardiaca reposo", "quema de grasa cardio"],
      ogDescription: "Calcula tu FC máxima y zonas de entrenamiento personalizadas para optimizar tu cardio.",
    },
    jsonLd: {
      name: "Calculadora de Frecuencia Cardíaca",
      description: "Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas.",
      applicationCategory: "HealthApplication",
      priceCurrency: "USD",
    },
    faqs: [
      { question: "¿Cómo mido mi frecuencia cardíaca en reposo?", answer: "Mídela al despertar, antes de levantarte de la cama. Cuenta tus pulsaciones durante 60 segundos colocando dos dedos en la muñeca o el cuello. Hazlo varios días y promedia los resultados para mayor precisión." },
      { question: "¿Qué es la frecuencia cardíaca máxima?", answer: "Es el número máximo de latidos por minuto que tu corazón puede alcanzar durante el ejercicio intenso. Disminuye con la edad y varía entre personas. La fórmula de Tanaka (208 - 0.7 × edad) es más precisa que la tradicional 220-edad." },
      { question: "¿En qué zona debo entrenar?", answer: "Depende de tu objetivo. Zona 2 para quemar grasa y desarrollar resistencia base, Zona 3 para mejorar capacidad aeróbica, Zonas 4-5 para rendimiento deportivo y velocidad. La regla 80/20 sugiere 80% en zonas bajas y 20% en zonas altas." },
      { question: "¿Qué es el método Karvonen?", answer: "Es un método preciso para calcular zonas de entrenamiento que considera tu frecuencia cardíaca en reposo, no solo tu edad. Usa la fórmula: FC objetivo = FC reposo + (FC reserva × % intensidad). Es más personalizado que la fórmula básica." },
    ],
    header: { title: "Calculadora de Frecuencia Cardíaca", subtitle: "Calcula tus zonas de entrenamiento" },
  },
  {
    nombre: "Sueño",
    descripcion: "Calcula tus ciclos de sueño ideales",
    href: "/salud/calculadora-sueno",
    icon: "moon",
    gradient: gradients.salud,
    categoria: "salud",
    meta: {
      title: "Calculadora de Sueño - Ciclos y Horas Óptimas para Dormir",
      description: "Calcula la mejor hora para dormir o despertar según los ciclos de sueño. Despierta descansado completando ciclos de 90 minutos.",
      keywords: ["calculadora de sueño", "ciclos de sueño", "hora para dormir", "hora para despertar", "sueño REM", "cuantas horas dormir", "dormir bien", "fases del sueño", "sueño profundo"],
      ogTitle: "Calculadora de Sueño - Ciclos y Horas Óptimas",
      ogDescription: "Calcula la mejor hora para dormir o despertar según los ciclos de sueño de 90 minutos.",
    },
    jsonLd: {
      name: "Calculadora de Sueño",
      description: "Calcula la mejor hora para dormir o despertar según los ciclos de sueño de 90 minutos.",
      applicationCategory: "HealthApplication",
      priceCurrency: "USD",
    },
    faqs: [
      { question: "¿Qué es un ciclo de sueño?", answer: "Un ciclo de sueño dura aproximadamente 90 minutos y pasa por diferentes fases: sueño ligero (N1, N2), sueño profundo (N3) y sueño REM. Despertar al final de un ciclo, después del REM, te hace sentir más descansado." },
      { question: "¿Cuántas horas de sueño necesito?", answer: "La mayoría de adultos necesitan entre 7-9 horas (4-6 ciclos). Sin embargo, lo más importante es despertar al final de un ciclo completo, no la cantidad exacta de horas. Dormir 6 horas y despertar bien es mejor que 8 horas y despertar aturdido." },
      { question: "¿Por qué me siento cansado aunque dormí 8 horas?", answer: "Probablemente despertaste en medio de un ciclo de sueño profundo (N3). Despertar durante esta fase causa inercia del sueño, esa sensación de aturdimiento. Despertar entre ciclos te hace sentir más descansado, incluso con menos horas totales." },
      { question: "¿Qué pasa si duermo menos de 4 ciclos?", answer: "Dormir menos de 6 horas (4 ciclos) regularmente puede afectar tu salud, concentración, memoria y sistema inmune. La privación crónica de sueño está relacionada con problemas cardiovasculares, obesidad y deterioro cognitivo." },
    ],
    header: { title: "Calculadora de Sueño", subtitle: "Optimiza tus ciclos de sueño" },
  },
];

const registroFinanzas: CalculadoraMeta[] = [
  {
    nombre: "Interés Compuesto", descripcion: "Calcula cuánto crecerá tu dinero con el tiempo",
    href: "/finanzas/calculadora-interes-compuesto", icon: "trending-up", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Interés Compuesto Online Gratis", description: "Calcula el interés compuesto de tus inversiones con aportes periódicos. Simula el crecimiento de tu dinero a 5, 10, 20 o 30 años con nuestra calculadora gratuita.", keywords: ["calculadora interés compuesto", "interés compuesto online", "calculadora inversiones", "simulador interés compuesto", "calcular interés compuesto", "inversión a largo plazo", "rendimiento inversión", "aportes periódicos", "capitalización compuesta"] },
    jsonLd: { name: "Calculadora de Interés Compuesto", description: "Simula cuánto crecerá tu dinero con interés compuesto y aportes periódicos.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Qué es el interés compuesto?", answer: "El interés compuesto es el interés que se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores. Es decir, ganas intereses sobre tus intereses, lo que genera un crecimiento exponencial de tu dinero." },
      { question: "¿Cuál es la fórmula del interés compuesto?", answer: "La fórmula básica es: M = C × (1 + r)^t, donde M es el monto final, C es el capital inicial, r es la tasa de interés por período, y t es el número de períodos." },
      { question: "¿Qué es la capitalización y por qué importa?", answer: "La capitalización es la frecuencia con la que se añaden los intereses al capital (mensual, trimestral, anual). A mayor frecuencia de capitalización, mayor será el rendimiento final de tu inversión." },
      { question: "¿Los aportes periódicos aumentan el interés compuesto?", answer: "Sí, hacer aportes periódicos (mensuales, trimestrales, anuales) potencia significativamente el efecto del interés compuesto, ya que cada aporte también genera sus propios intereses." },
    ],
    header: { title: "Interés Compuesto", subtitle: "Calcula cuánto crecerá tu dinero con el tiempo" },
  },
  {
    nombre: "Préstamos", descripcion: "Calcula cuotas y amortización de préstamos",
    href: "/finanzas/calculadora-prestamos", icon: "landmark", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Préstamos y Cuotas Online Gratis", description: "Calcula la cuota mensual de tu préstamo, el total de intereses y visualiza la tabla de amortización completa. Sistema francés de cuotas fijas.", keywords: ["calculadora préstamos", "calculadora cuotas", "calcular cuota mensual", "tabla amortización", "simulador préstamo", "calcular intereses préstamo", "préstamo personal", "cuota fija", "sistema francés"] },
    jsonLd: { name: "Calculadora de Préstamos", description: "Calcula tu cuota mensual, intereses totales y tabla de amortización de préstamos.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo se calcula la cuota mensual de un préstamo?", answer: "La cuota mensual se calcula usando la fórmula del sistema francés: Cuota = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el monto del préstamo, r es la tasa mensual y n es el número de cuotas." },
      { question: "¿Qué es el sistema de amortización francés?", answer: "El sistema francés es el más común en préstamos personales. Se caracteriza por cuotas fijas durante todo el plazo. Al inicio pagas más intereses y menos capital, pero esto se invierte gradualmente." },
      { question: "¿Qué incluye cada cuota del préstamo?", answer: "Cada cuota incluye dos componentes: el capital (la parte que reduce tu deuda) y los intereses (el costo del préstamo). En el sistema francés, la suma de ambos siempre da la misma cuota." },
      { question: "¿Cómo puedo pagar menos intereses en un préstamo?", answer: "Para pagar menos intereses puedes: elegir un plazo más corto (cuotas más altas pero menos intereses totales), hacer abonos extra al capital, o buscar tasas de interés más bajas." },
    ],
    header: { title: "Calculadora de Préstamos", subtitle: "Calcula tu cuota mensual y amortización" },
  },
  {
    nombre: "Salario Neto", descripcion: "Calcula tu salario después de deducciones",
    href: "/finanzas/calculadora-salario-neto", icon: "banknote", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Salario Neto Colombia 2026 - ¿Cuánto Recibes?", description: "Calcula tu salario neto en Colombia. Descubre cuánto recibes después de descuentos de salud, pensión y fondo de solidaridad. Incluye auxilio de transporte.", keywords: ["calculadora salario neto", "salario neto colombia", "cuanto me queda de sueldo", "descuentos nomina colombia", "salario bruto a neto", "descuento salud pension", "auxilio transporte", "calculadora nomina", "sueldo neto", "descuentos salariales colombia"] },
    jsonLd: { name: "Calculadora de Salario Neto Colombia", description: "Calcula tu salario neto en Colombia después de descuentos de salud, pensión y fondo de solidaridad.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué descuentos se hacen al salario en Colombia?", answer: "Los descuentos obligatorios son: salud (4%) y pensión (4%), ambos calculados sobre el salario básico. Si ganas más de 4 SMMLV ($7,003,620 en 2026), también se descuenta el Fondo de Solidaridad Pensional (1% adicional)." },
      { question: "¿El auxilio de transporte tiene descuentos?", answer: "No. El auxilio de transporte ($249,095 en 2026) no tiene descuentos de salud ni pensión. Se suma íntegro al salario neto. Aplica para quienes ganan hasta 2 SMMLV ($3,501,810)." },
      { question: "¿Qué es el Fondo de Solidaridad Pensional?", answer: "Es un aporte adicional del 1% que deben hacer los trabajadores que ganan 4 SMMLV o más ($7,003,620 en 2026). Este dinero se destina a subsidiar las pensiones de adultos mayores de escasos recursos." },
      { question: "¿La retención en la fuente se descuenta del salario?", answer: "Sí, pero solo aplica para salarios altos (generalmente desde 4.5 SMMLV). El valor depende de deducciones personales como dependientes, medicina prepagada, intereses de vivienda, AFC y pensiones voluntarias." },
    ],
    header: { title: "Calculadora de Salario Neto", subtitle: "¿Cuánto recibes realmente? Colombia 2026" },
  },
  {
    nombre: "Liquidación Laboral", descripcion: "Calcula tu liquidación al terminar contrato",
    href: "/finanzas/calculadora-liquidacion", icon: "clipboard", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Liquidación Laboral 2026 Colombia", description: "Calcula tu liquidación laboral completa: prima, cesantías, intereses, vacaciones e indemnización por despido. Actualizada 2026.", keywords: ["calculadora liquidacion", "liquidacion laboral Colombia", "calcular liquidacion", "indemnizacion despido", "prima cesantias vacaciones", "liquidacion 2026", "cuanto me toca de liquidacion", "despido sin justa causa", "liquidacion contrato"] },
    jsonLd: { name: "Calculadora de Liquidación Laboral", description: "Calcula tu liquidación laboral completa en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué incluye la liquidación laboral?", answer: "La liquidación incluye: prima de servicios, cesantías, intereses sobre cesantías, vacaciones no disfrutadas. Si el despido es sin justa causa, también incluye indemnización." },
      { question: "¿Cuándo me deben pagar la liquidación?", answer: "El empleador debe pagar la liquidación al momento de terminar el contrato. Si no paga, debe pagar un día de salario por cada día de mora." },
      { question: "¿Cómo se calcula la indemnización?", answer: "Para contratos indefinidos: 30 días por el primer año + 20 días por cada año adicional. Para salarios altos, los días adicionales son 15." },
      { question: "¿Si renuncio tengo derecho a indemnización?", answer: "No. La indemnización solo aplica cuando el empleador termina el contrato sin justa causa." },
    ],
    header: { title: "Calculadora de Liquidación", subtitle: "Calcula tu liquidación laboral completa" },
  },
  {
    nombre: "Prima de Servicios", descripcion: "Calcula tu prima semestral",
    href: "/finanzas/calculadora-prima", icon: "gift", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Prima de Servicios 2026 Colombia - Calcular Prima Junio y Diciembre", description: "Calculadora de prima de servicios 2026: calcula cuánto te toca de prima en junio y diciembre. Fórmula oficial con auxilio de transporte, días proporcionales y SMMLV $1.750.905. Gratis y actualizada.", keywords: ["calculadora de prima 2026", "calculadora prima de servicios", "calcular prima de servicios", "calculadora de primas laborales", "prima de servicios 2026 colombia", "como calcular la prima", "formula prima de servicios", "prima junio 2026", "prima diciembre 2026", "prima proporcional", "cuanto me toca de prima", "auxilio transporte prima"] },
    jsonLd: { name: "Calculadora de Prima de Servicios 2026 Colombia", description: "Calcula tu prima de servicios de junio y diciembre 2026 en Colombia. Incluye auxilio de transporte, días proporcionales y fórmula oficial actualizada.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es la prima de servicios en Colombia?", answer: "La prima de servicios es una prestación social obligatoria establecida en el artículo 306 del Código Sustantivo del Trabajo. Equivale a 30 días de salario al año, pagada en dos cuotas de 15 días: una en junio y otra en diciembre. Es independiente de las cesantías y las vacaciones." },
      { question: "¿Cómo se calcula la prima de servicios 2026?", answer: "La fórmula es: Prima = (Salario mensual + Auxilio de transporte) × Días trabajados ÷ 360. Para 2026, el SMMLV es $1.750.905 y el auxilio de transporte es $249.095. Si trabajaste todo el semestre (180 días), la prima es medio salario más medio auxilio." },
      { question: "¿Quiénes tienen derecho a la prima de servicios?", answer: "Todos los trabajadores con contrato laboral tienen derecho: empleados a término fijo, indefinido, empleadas domésticas, trabajadores por días (proporcional) y trabajadores en periodo de prueba. Los contratistas por prestación de servicios NO tienen derecho a prima." },
      { question: "¿El auxilio de transporte se incluye en la prima?", answer: "Sí. Si tu salario es hasta 2 SMMLV ($3.501.810 en 2026) y recibes auxilio de transporte ($249.095), este se suma al salario base para calcular la prima. Si ganas más de 2 SMMLV, la prima se calcula solo sobre el salario." },
      { question: "¿Cuándo se paga la prima en 2026?", answer: "La prima de junio se debe pagar a más tardar el 30 de junio de 2026. La prima de diciembre se paga máximo el 20 de diciembre de 2026. Si el empleador no paga a tiempo, debe pagar una indemnización equivalente a un día de salario por cada día de retraso." },
      { question: "¿Cuánto es la prima con salario mínimo 2026?", answer: "Con el SMMLV 2026 de $1.750.905 más auxilio de transporte de $249.095, la base es $2.000.000. La prima de cada semestre es $1.000.000 (la mitad). Al año recibes $2.000.000 en total por concepto de prima." },
      { question: "¿La prima de servicios paga impuestos?", answer: "La prima de servicios no está sujeta a retención en la fuente hasta 375 UVT ($19.640.250 en 2026). Para la mayoría de trabajadores, la prima llega sin descuentos de impuestos. Tampoco se descuentan aportes a salud ni pensión de la prima." },
      { question: "¿Qué pasa si no me pagan la prima?", answer: "Si tu empleador no te paga la prima, puedes hacer una reclamación ante el Ministerio de Trabajo. El empleador puede ser sancionado con multas. Además, al terminar el contrato, si no te pagaron primas pendientes, tienes derecho a reclamarlas junto con la liquidación." },
    ],
    header: { title: "Calculadora de Prima de Servicios", subtitle: "Calcula tu prima de junio y diciembre 2026" },
  },
  {
    nombre: "Cesantías", descripcion: "Calcula cesantías e intereses",
    href: "/finanzas/calculadora-cesantias", icon: "piggy-bank", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Cesantías 2026 Colombia - Cesantías e Intereses", description: "Calcula tus cesantías e intereses sobre cesantías 2026. Incluye auxilio de transporte y cálculo proporcional por días trabajados.", keywords: ["calculadora cesantias", "cesantias 2026", "calcular cesantias Colombia", "intereses cesantias", "formula cesantias", "liquidacion cesantias", "fondo cesantias", "retiro cesantias", "cesantias proporcionales"] },
    jsonLd: { name: "Calculadora de Cesantías", description: "Calcula tus cesantías e intereses sobre cesantías en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué son las cesantías?", answer: "Las cesantías son una prestación social equivalente a un mes de salario por cada año trabajado. Se pueden usar para vivienda, educación o al terminar el contrato." },
      { question: "¿Cuándo se consignan las cesantías?", answer: "El empleador debe consignar las cesantías al fondo antes del 14 de febrero de cada año." },
      { question: "¿Puedo retirar mis cesantías antes de renunciar?", answer: "Sí, puedes hacer retiros parciales para vivienda o educación, con autorización del empleador." },
      { question: "¿Qué son los intereses sobre cesantías?", answer: "Son un pago adicional del 12% anual sobre las cesantías. El empleador debe pagarlos directamente al trabajador antes del 31 de enero." },
    ],
    header: { title: "Calculadora de Cesantías", subtitle: "Calcula tus cesantías e intereses 2026" },
  },
  {
    nombre: "Horas Extras", descripcion: "Calcula el valor de tus horas extras",
    href: "/finanzas/calculadora-horas-extras", icon: "clock", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Horas Extras Colombia 2026 - Recargos Laborales", description: "Calcula el valor de tus horas extras en Colombia: diurnas, nocturnas, dominicales y festivos. Incluye recargos nocturnos y dominicales según la ley.", keywords: ["calculadora horas extras", "horas extras colombia", "recargo nocturno", "recargo dominical", "hora extra diurna", "hora extra nocturna", "recargos laborales", "valor hora extra", "horas extras festivos", "calculo horas extras"] },
    jsonLd: { name: "Calculadora de Horas Extras Colombia", description: "Calcula el valor de tus horas extras y recargos laborales en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Cómo se calcula el valor de la hora extra?", answer: "El valor hora se calcula dividiendo el salario mensual entre las horas de la jornada mensual (182 horas para jornada de 42h/semana en 2026). Luego se aplica el recargo según el tipo de hora extra: 25% diurna, 75% nocturna, 100% dominical diurna, 150% dominical nocturna." },
      { question: "¿Cuál es la diferencia entre hora extra y recargo?", answer: "La hora extra es tiempo adicional después de completar tu jornada laboral ordinaria. El recargo aplica cuando trabajas en horario nocturno (9pm-6am) o dominical/festivo dentro de tu jornada normal, sin ser tiempo adicional." },
      { question: "¿Cuántas horas extras puedo trabajar al mes?", answer: "El máximo legal en Colombia es de 2 horas extras diarias y 12 semanales. El empleador debe solicitar autorización al Ministerio de Trabajo para que sus empleados trabajen horas extras de forma habitual." },
      { question: "¿Las horas extras pagan aportes a salud y pensión?", answer: "Sí. Las horas extras hacen parte del salario y sobre ellas se calculan los aportes a salud (4%), pensión (4%) y parafiscales. También se incluyen en la base para calcular prestaciones sociales como prima, cesantías y vacaciones." },
    ],
    header: { title: "Calculadora de Horas Extras", subtitle: "Recargos laborales Colombia 2026" },
  },
  {
    nombre: "Vacaciones", descripcion: "Calcula tus días y valor de vacaciones",
    href: "/finanzas/calculadora-vacaciones", icon: "palmtree", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Vacaciones Colombia 2026 - Días y Dinero", description: "Calcula cuántos días de vacaciones te corresponden y su valor en dinero. 15 días hábiles por año trabajado según la ley colombiana.", keywords: ["calculadora vacaciones", "vacaciones colombia", "dias de vacaciones", "liquidacion vacaciones", "cuantos dias de vacaciones", "pago vacaciones", "vacaciones proporcionales", "vacaciones laborales", "compensacion vacaciones", "calcular vacaciones"] },
    jsonLd: { name: "Calculadora de Vacaciones Colombia", description: "Calcula cuántos días de vacaciones te corresponden y su valor en dinero.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Cuántos días de vacaciones me corresponden en Colombia?", answer: "Por cada año trabajado tienes derecho a 15 días hábiles de vacaciones remuneradas. Si no has cumplido el año, se calculan proporcionalmente: aproximadamente 1.25 días hábiles por cada mes trabajado." },
      { question: "¿Cómo se calcula el pago de vacaciones?", answer: "El valor de las vacaciones se calcula dividiendo tu salario mensual básico entre 30 y multiplicando por los días de vacaciones. El auxilio de transporte NO se incluye en este cálculo porque durante las vacaciones no hay desplazamiento al trabajo." },
      { question: "¿Puedo acumular vacaciones?", answer: "Sí, puedes acumular hasta 2 años de vacaciones (máximo 30 días hábiles). Después de este límite, el empleador está obligado a concederte las vacaciones, incluso sin tu consentimiento." },
      { question: "¿Me pueden pagar las vacaciones en dinero?", answer: "Durante la relación laboral, solo se puede compensar en dinero la mitad de las vacaciones (7.5 días por año). La otra mitad debe disfrutarse obligatoriamente como descanso. La compensación total en dinero solo aplica cuando termina el contrato laboral." },
    ],
    header: { title: "Calculadora de Vacaciones", subtitle: "Días y dinero que te corresponden" },
  },
  {
    nombre: "Impuesto de Renta", descripcion: "Estima tu impuesto de renta anual",
    href: "/finanzas/calculadora-impuesto-renta", icon: "landmark", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora Impuesto de Renta Colombia 2025 | Personas Naturales", description: "Calcula tu impuesto de renta en Colombia para personas naturales. Incluye tabla de tarifas actualizada, deducciones y retención en la fuente.", keywords: ["impuesto de renta colombia", "calculadora renta 2025", "declaración de renta", "personas naturales", "tabla impuesto renta", "UVT 2025", "retención en la fuente", "deducciones renta"] },
    jsonLd: { name: "Calculadora de Impuesto de Renta Colombia", description: "Calcula tu impuesto de renta en Colombia para personas naturales.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Quiénes deben declarar renta en Colombia?", answer: "Deben declarar renta las personas naturales cuyos ingresos brutos en el año gravable hayan sido iguales o superiores a 1.400 UVT (aproximadamente $69,7 millones en 2025), o que tengan un patrimonio bruto superior a 4.500 UVT al 31 de diciembre." },
      { question: "¿Qué es el UVT y para qué sirve?", answer: "La Unidad de Valor Tributario (UVT) es una medida de valor que permite ajustar automáticamente los valores en las normas tributarias. Para 2025, el UVT es de $49.799. Se actualiza cada año según la inflación." },
      { question: "¿Qué deducciones puedo aplicar?", answer: "Puedes deducir aportes a salud y pensión, intereses de vivienda, dependientes (hasta 10% de ingresos), medicina prepagada, y el 25% de renta exenta laboral. El total de deducciones no puede superar el 40% de tus ingresos ni 5.040 UVT." },
      { question: "¿Cuándo debo pagar el impuesto de renta?", answer: "Las personas naturales declaran y pagan entre agosto y octubre del año siguiente, según los dos últimos dígitos del NIT. Por ejemplo, para ingresos de 2024, se declara en 2025." },
    ],
    header: { title: "Calculadora de Impuesto de Renta", subtitle: "Estima tu impuesto de renta en Colombia para el año 2025" },
  },
  {
    nombre: "Comparador de CDTs", descripcion: "Compara tasas de CDT entre bancos",
    href: "/finanzas/comparador-cdt", icon: "bar-chart", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Comparador de CDT Colombia 2026 | Mejores Tasas y Rendimientos", description: "Compara tasas de CDT en Colombia (febrero 2026). Encuentra los mejores rendimientos de bancos como Bancolombia, Davivienda, Nu, Tuya, Bold y más. Simulador gratuito.", keywords: ["CDT colombia", "mejores CDT 2026", "tasas CDT", "comparador CDT", "simulador CDT", "rendimiento CDT", "inversión CDT", "certificado depósito término", "mejores CDT febrero 2026", "tasas CDT Colombia hoy"] },
    jsonLd: { name: "Comparador de CDT Colombia", description: "Compara tasas de CDT de bancos colombianos y simula rendimientos.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es un CDT y cómo funciona?", answer: "Un CDT (Certificado de Depósito a Término) es un producto de ahorro donde depositas dinero por un plazo fijo y recibes intereses. No puedes retirar el dinero antes del vencimiento sin penalización. A mayor plazo, generalmente mayor tasa de interés." },
      { question: "¿Cuál es la retención en la fuente de los CDTs?", answer: "Los rendimientos de CDTs tienen una retención en la fuente del 4% sobre los intereses ganados. Esta retención se aplica al momento del pago de los intereses y es descontable en tu declaración de renta." },
      { question: "¿Qué pasa si necesito el dinero antes del vencimiento?", answer: "La mayoría de bancos permiten cancelar anticipadamente con una penalización, que suele ser la pérdida parcial o total de los intereses. Algunos bancos ofrecen CDTs 'redimibles' que permiten retiros sin penalización." },
      { question: "¿Es mejor un CDT o una cuenta de ahorros?", answer: "Los CDTs ofrecen tasas más altas (10-12% vs 3-4% de cuentas de ahorro), pero no tienes liquidez. Si no necesitarás el dinero en el plazo del CDT, es mejor opción. Si necesitas acceso al dinero, la cuenta de ahorros es más conveniente." },
    ],
    header: { title: "Comparador de CDTs", subtitle: "Compara tasas de diferentes bancos y encuentra la mejor opción" },
  },
  {
    nombre: "Arriendo vs Compra", descripcion: "¿Te conviene arrendar o comprar?",
    href: "/finanzas/arriendo-vs-compra", icon: "home", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora Arriendo vs Compra | ¿Qué Conviene Más?", description: "Compara si te conviene más arrendar o comprar vivienda. Calcula costos totales, punto de equilibrio y patrimonio final con nuestra calculadora gratuita.", keywords: ["arriendo vs compra", "comprar o arrendar vivienda", "arrendar o comprar", "calculadora hipoteca", "crédito hipotecario", "punto de equilibrio vivienda", "inversión inmobiliaria", "cuota inicial vivienda", "alquilar o comprar", "rentar o comprar casa"] },
    jsonLd: { name: "Calculadora Arriendo vs Compra", description: "Compara financieramente si te conviene arrendar o comprar vivienda.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Cuándo conviene más comprar que arrendar?", answer: "Generalmente conviene comprar si planeas quedarte más de 5-7 años, tienes la cuota inicial, el costo mensual de la hipoteca es similar o menor al arriendo, y esperas que la propiedad se valorice. Cada caso es diferente según tus circunstancias." },
      { question: "¿Qué costos adicionales tiene comprar vivienda en Colombia?", answer: "Además del precio, debes considerar: escrituración y registro (aprox. 1.5% del valor), avalúo, estudio de títulos, seguros obligatorios, y gastos de mudanza. También hay costos continuos como predial, administración y mantenimiento." },
      { question: "¿Cuál es una cuota inicial razonable?", answer: "Lo ideal es dar mínimo 20-30% de cuota inicial. Con menos del 20%, algunos bancos cobran seguro adicional (PMI). Una cuota inicial mayor reduce tu cuota mensual y el total de intereses pagados." },
      { question: "¿Cómo afecta la valorización a la decisión?", answer: "La valorización promedio en Colombia es del 3-5% anual, pero varía mucho según la zona. En zonas de alta demanda puede ser mayor. Sin embargo, la valorización no es garantizada y hay períodos donde los inmuebles pierden valor." },
    ],
    header: { title: "¿Arrendar o Comprar?", subtitle: "Compara financieramente ambas opciones según tu situación" },
  },
  {
    nombre: "Retención en la Fuente", descripcion: "Calcula la retención para servicios y honorarios",
    href: "/finanzas/calculadora-retencion-fuente", icon: "file-text", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Retención en la Fuente Colombia 2025", description: "Calcula la retención en la fuente en Colombia. Servicios profesionales, honorarios, compras, arrendamientos. Tasas actualizadas 2025. Calcula el neto a recibir.", keywords: ["retención en la fuente Colombia", "calculadora retención", "retefuente servicios", "retención honorarios", "retención compras", "retención arrendamiento", "DIAN retención", "base retención fuente", "porcentaje retención", "calcular retención 2025"] },
    jsonLd: { name: "Calculadora de Retención en la Fuente Colombia", description: "Calcula la retención en la fuente para servicios, honorarios, compras y arrendamientos en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Qué es la retención en la fuente?", answer: "La retención en la fuente es un mecanismo de recaudo anticipado del impuesto de renta. El pagador (agente retenedor) descuenta un porcentaje del pago y lo transfiere a la DIAN a nombre del beneficiario del pago." },
      { question: "¿Cuándo aplica la retención en la fuente?", answer: "Aplica cuando el pagador es agente retenedor (empresas o personas con ingresos superiores a ciertos topes) y el pago supera las bases mínimas establecidas por la DIAN para cada concepto." },
      { question: "¿Qué pasa si soy declarante de renta?", answer: "Si eres declarante de renta, las tasas de retención suelen ser menores. Por ejemplo, en servicios profesionales la tasa es del 10% en lugar del 11% para no declarantes." },
      { question: "¿Puedo recuperar la retención en la fuente?", answer: "Sí, la retención se cruza con tu impuesto de renta al presentar la declaración anual. Si te retuvieron más de lo que debes pagar, puedes solicitar devolución del saldo a favor." },
    ],
    header: { title: "Retención en la Fuente", subtitle: "Calcula la retención para diferentes conceptos" },
  },
  {
    nombre: "Simulador Tarjeta de Crédito", descripcion: "Compara pago mínimo vs cuota fija",
    href: "/finanzas/simulador-tarjeta-credito", icon: "credit-card", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Simulador de Tarjeta de Crédito - Pago Mínimo vs Cuota Fija", description: "Simula el pago de tu tarjeta de crédito. Compara pagar el mínimo vs cuota fija. Calcula meses para saldar deuda y ahorro en intereses.", keywords: ["simulador tarjeta de crédito", "pago mínimo tarjeta", "calcular intereses tarjeta", "cuota fija tarjeta crédito", "deuda tarjeta de crédito", "cómo pagar tarjeta rápido", "intereses tarjeta de crédito", "comparar pagos tarjeta", "saldar deuda tarjeta", "calculadora deuda tarjeta"] },
    jsonLd: { name: "Simulador de Tarjeta de Crédito", description: "Simula el pago de tu tarjeta de crédito comparando pago mínimo vs cuota fija. Calcula ahorro en intereses.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Por qué es malo pagar solo el mínimo de la tarjeta?", answer: "Pagar solo el mínimo puede tardar años en saldar la deuda y terminas pagando varias veces el monto original en intereses. El mínimo apenas cubre los intereses del mes, por lo que el capital casi no se reduce." },
      { question: "¿Cuál es la tasa de usura en Colombia?", answer: "La tasa de usura es el máximo interés legal que pueden cobrar las entidades financieras. Para 2025, ronda entre el 28% y 32% efectivo anual para tarjetas de crédito. La Superfinanciera la actualiza mensualmente." },
      { question: "¿Cómo se calcula el pago mínimo de la tarjeta?", answer: "El pago mínimo generalmente es un porcentaje del saldo (2% a 5%) más los intereses del período. Esto asegura que cubras los intereses pero reduzcas muy poco el capital." },
      { question: "¿Cuánto debería pagar de mi tarjeta cada mes?", answer: "Lo ideal es pagar el total facturado para no generar intereses. Si no es posible, paga lo máximo que puedas. Una cuota fija superior al mínimo te ahorrará meses de pago e intereses significativos." },
    ],
    header: { title: "Simulador de Tarjeta de Crédito", subtitle: "Compara pago mínimo vs cuota fija" },
  },
  {
    nombre: "Comparador de Préstamos", descripcion: "Encuentra la mejor tasa entre bancos",
    href: "/finanzas/comparador-prestamos", icon: "landmark", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Comparador de Préstamos Colombia 2025 - Encuentra la Mejor Tasa", description: "Compara préstamos de los principales bancos en Colombia: Bancolombia, Davivienda, BBVA, Banco de Bogotá y más. Libre inversión, vehículo y vivienda. Tasas actualizadas 2025.", keywords: ["comparador préstamos Colombia", "mejor tasa préstamo", "préstamo libre inversión", "crédito vehículo Colombia", "crédito vivienda Colombia", "Bancolombia préstamos", "Davivienda crédito", "BBVA préstamo", "tasas préstamos 2025", "simulador crédito bancos"] },
    jsonLd: { name: "Comparador de Préstamos Colombia", description: "Compara préstamos de bancos colombianos: tasas, cuotas y costos totales para libre inversión, vehículo y vivienda.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo elijo el mejor préstamo?", answer: "Compara el Costo Total del Crédito (CTC), no solo la tasa de interés. El CTC incluye seguros, administración y otros cobros. Un préstamo con tasa más baja puede terminar siendo más caro por costos adicionales." },
      { question: "¿Qué diferencia hay entre tasa nominal y efectiva?", answer: "La tasa nominal no considera capitalización de intereses. La tasa efectiva anual (EA) es la que realmente pagas. Siempre compara usando tasa EA para tener una comparación justa." },
      { question: "¿Qué documentos necesito para solicitar un préstamo?", answer: "Generalmente: cédula, certificado de ingresos o desprendibles de nómina, extractos bancarios de los últimos 3 meses, y declaración de renta si aplica. Para vehículo o vivienda pueden pedir documentos adicionales del bien." },
      { question: "¿Puedo pagar mi préstamo antes de tiempo?", answer: "Sí, por ley tienes derecho a prepagar parcial o totalmente sin penalización. Esto reduce los intereses totales. Algunos bancos cobran un pequeño cargo administrativo por prepago." },
    ],
    header: { title: "Comparador de Préstamos", subtitle: "Encuentra la mejor tasa entre bancos colombianos" },
  },
  {
    nombre: "Impuesto Vehicular", descripcion: "Calcula el impuesto de tu carro o moto",
    href: "/finanzas/calculadora-impuesto-vehicular", icon: "car", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Impuesto Vehicular Colombia 2025 - Todos los Departamentos", description: "Calcula el impuesto vehicular de tu carro o moto en Colombia. Tarifas por departamento, descuento por pronto pago. Bogotá, Antioquia, Valle y todos los departamentos.", keywords: ["impuesto vehicular Colombia", "calculadora impuesto carro", "impuesto moto Colombia", "impuesto vehicular Bogotá", "impuesto vehicular Antioquia", "descuento pronto pago vehicular", "tarifas impuesto vehicular 2025", "calcular impuesto carro", "impuesto automotor Colombia", "rodamiento vehicular"] },
    jsonLd: { name: "Calculadora de Impuesto Vehicular Colombia", description: "Calcula el impuesto vehicular de carros y motos en todos los departamentos de Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo se calcula el impuesto vehicular?", answer: "El impuesto vehicular se calcula aplicando un porcentaje sobre el valor comercial del vehículo según tablas de la DIAN. Las tarifas varían según el tipo de vehículo (particular, moto, público, carga) y el rango de valor comercial." },
      { question: "¿Qué pasa si no pago el impuesto vehicular?", answer: "Si no pagas el impuesto vehicular, acumulas intereses de mora y sanciones. Además, no podrás realizar trámites como el traspaso del vehículo, renovación de licencia de tránsito, ni pasar la revisión técnico-mecánica." },
      { question: "¿Cuánto es el descuento por pronto pago?", answer: "La mayoría de departamentos ofrecen un descuento del 10% sobre el valor del impuesto si pagas antes de la fecha límite (generalmente en abril o mayo). Algunos departamentos ofrecen descuentos adicionales en los primeros meses del año." },
      { question: "¿Dónde consulto el valor comercial de mi vehículo?", answer: "El valor comercial lo publica el Ministerio de Transporte anualmente en la Resolución de valores comerciales de vehículos. También puedes consultarlo en la página de tu Secretaría de Hacienda departamental." },
    ],
    header: { title: "Impuesto Vehicular", subtitle: "Calcula el impuesto de tu vehículo en Colombia" },
  },
  {
    nombre: "Subsidio Mi Casa Ya", descripcion: "Verifica elegibilidad para subsidio de vivienda",
    href: "/finanzas/calculadora-subsidio-vivienda", icon: "home", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora Subsidio Mi Casa Ya 2025 - Verifica si Eres Elegible", description: "Verifica si calificas para el subsidio de vivienda Mi Casa Ya en Colombia. Calcula tu subsidio VIP o VIS, requisitos y documentos necesarios. Actualizado 2025.", keywords: ["Mi Casa Ya 2025", "subsidio vivienda Colombia", "calculadora subsidio vivienda", "vivienda VIP Colombia", "vivienda VIS Colombia", "requisitos Mi Casa Ya", "subsidio primera vivienda", "cómo aplicar Mi Casa Ya", "monto subsidio vivienda", "elegibilidad Mi Casa Ya"] },
    jsonLd: { name: "Calculadora de Subsidio Mi Casa Ya Colombia", description: "Verifica elegibilidad y calcula el subsidio de vivienda Mi Casa Ya para VIP y VIS en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Qué es el programa Mi Casa Ya?", answer: "Mi Casa Ya es un programa del Gobierno de Colombia que otorga subsidios para la compra de vivienda nueva de interés social (VIS) y prioritario (VIP) a familias de bajos ingresos. Incluye subsidio a la cuota inicial y cobertura a la tasa de interés." },
      { question: "¿Cuánto es el subsidio de Mi Casa Ya?", answer: "El subsidio varía según tus ingresos y el tipo de vivienda. Para ingresos hasta 2 SMMLV: hasta 30 SMMLV para VIP y 20 SMMLV para VIS. Para ingresos de 2-4 SMMLV: 20 SMMLV para ambos tipos de vivienda." },
      { question: "¿Cuáles son los requisitos de Mi Casa Ya?", answer: "Los requisitos principales son: ser colombiano mayor de edad, ingresos familiares hasta 4 SMMLV, no ser propietario de vivienda, no haber recibido subsidio antes, y tener aprobación de crédito hipotecario." },
      { question: "¿Puedo usar Mi Casa Ya para vivienda usada?", answer: "No, el programa Mi Casa Ya solo aplica para vivienda nueva. Si buscas comprar vivienda usada, puedes consultar otras opciones de subsidio del FNA (Fondo Nacional del Ahorro) o cajas de compensación." },
    ],
    header: { title: "Subsidio Mi Casa Ya", subtitle: "Verifica si eres elegible para el subsidio de vivienda" },
  },
  {
    nombre: "4x1000", descripcion: "Calcula el impuesto a movimientos financieros",
    href: "/finanzas/calculadora-4x1000", icon: "landmark", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora 4x1000 Colombia - Impuesto GMF Online", description: "Calcula el impuesto 4x1000 (GMF) de cualquier transacción. Descubre cuánto pagas al año y cómo deducirlo de tu declaración de renta.", keywords: ["calculadora 4x1000", "4 por mil", "GMF Colombia", "impuesto transacciones financieras", "gravamen movimientos financieros", "cuanto es el 4x1000", "calcular 4x1000", "exencion 4x1000", "impuestos Colombia"] },
    jsonLd: { name: "Calculadora 4x1000", description: "Calcula el impuesto 4x1000 (GMF) de transacciones financieras en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es el 4x1000?", answer: "El 4x1000 (o GMF - Gravamen a los Movimientos Financieros) es un impuesto colombiano del 0.4% que se cobra sobre cada transacción financiera: retiros, transferencias, pagos con cheque, etc. Se descuenta automáticamente de tu cuenta." },
      { question: "¿Qué transacciones están exentas del 4x1000?", answer: "Puedes marcar UNA cuenta de ahorros o corriente como exenta del 4x1000 para retiros hasta 350 UVT mensuales (aproximadamente $18.3 millones en 2026). Los traslados entre cuentas del mismo titular en el mismo banco también están exentos." },
      { question: "¿Cómo marco mi cuenta como exenta del 4x1000?", answer: "Debes solicitar la exención directamente en tu banco, ya sea en sucursal o por canales digitales. Solo puedes tener UNA cuenta exenta en todo el sistema financiero. Si cambias de banco, debes desmarcar la anterior primero." },
      { question: "¿El 4x1000 se puede deducir de impuestos?", answer: "Sí. El 50% del GMF pagado durante el año es deducible del impuesto de renta. Esto significa que si pagaste $1.000.000 en 4x1000, puedes deducir $500.000 de tu base gravable." },
    ],
    header: { title: "Calculadora 4x1000", subtitle: "Calcula el impuesto a movimientos financieros" },
  },
  {
    nombre: "Inflación", descripcion: "Entiende cómo la inflación afecta tu dinero",
    href: "/finanzas/calculadora-inflacion", icon: "trending-down", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Inflación Colombia - IPC Histórico y Proyección", description: "Calcula cómo la inflación afecta tu dinero. Usa datos históricos del IPC Colombia o proyecta el impacto futuro en tus ahorros.", keywords: ["calculadora inflacion", "inflacion Colombia", "IPC Colombia", "poder adquisitivo", "devaluacion peso", "ajuste inflacion", "DANE inflacion", "costo de vida Colombia", "perdida valor dinero"] },
    jsonLd: { name: "Calculadora de Inflación Colombia", description: "Calcula el impacto de la inflación en tu dinero usando datos históricos del IPC.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es la inflación y cómo me afecta?", answer: "La inflación es el aumento general de los precios. Te afecta porque el dinero que tienes hoy compra menos cosas mañana. Por ejemplo, si la inflación es 10% anual, algo que hoy cuesta $100.000 costará $110.000 el próximo año." },
      { question: "¿Qué es el IPC y quién lo mide en Colombia?", answer: "El IPC (Índice de Precios al Consumidor) mide la variación de precios de una canasta de bienes y servicios. En Colombia lo calcula el DANE mensualmente, midiendo precios en 38 ciudades del país." },
      { question: "¿Cómo puedo proteger mi dinero de la inflación?", answer: "Para proteger tu dinero, busca inversiones que rindan por encima de la inflación: CDTs a tasa fija, fondos de inversión, acciones, finca raíz, o bonos indexados a la inflación (TES UVR)." },
      { question: "¿Por qué el Banco de la República tiene meta de inflación del 3%?", answer: "Una inflación baja y estable (alrededor del 3%) favorece el crecimiento económico, facilita la planificación financiera de familias y empresas, y protege el poder adquisitivo de los colombianos, especialmente de los más vulnerables." },
    ],
    header: { title: "Calculadora de Inflación", subtitle: "Entiende cómo la inflación afecta tu dinero" },
  },
  {
    nombre: "Jubilación", descripcion: "Planifica tu retiro con tranquilidad",
    href: "/finanzas/calculadora-jubilacion", icon: "umbrella", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Jubilación - Planifica tu Retiro", description: "Calcula cuánto necesitas ahorrar para jubilarte tranquilo. Incluye inflación, retorno de inversión y pensión estimada. Planifica tu retiro paso a paso.", keywords: ["calculadora jubilacion", "cuanto ahorrar para jubilarse", "planificar retiro", "pension voluntaria", "ahorro jubilacion", "retiro anticipado", "independencia financiera", "calculadora pensión", "planificación financiera retiro"] },
    jsonLd: { name: "Calculadora de Jubilación", description: "Planifica tu retiro y calcula cuánto necesitas ahorrar para jubilarte tranquilo.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿A qué edad me puedo pensionar en Colombia?", answer: "La edad de pensión en Colombia es 57 años para mujeres y 62 para hombres. Además, debes haber cotizado mínimo 1.300 semanas (aproximadamente 25 años). Si no cumples las semanas, puedes acceder a una devolución de saldos o seguir cotizando." },
      { question: "¿Cuánto debería ahorrar para mi jubilación?", answer: "Se recomienda ahorrar entre 10% y 15% de tu ingreso para la jubilación. Si empiezas tarde (después de los 40), considera aumentar a 20% o más. La clave es empezar lo antes posible para aprovechar el interés compuesto." },
      { question: "¿Qué es la pensión voluntaria y cuáles son sus beneficios?", answer: "La pensión voluntaria es un ahorro adicional al obligatorio que ofrece beneficios tributarios: puedes deducir hasta el 30% de tu ingreso (máximo 3.800 UVT) de tu declaración de renta. Además, los rendimientos no pagan impuestos si cumples los requisitos de permanencia." },
      { question: "¿Es mejor el régimen de prima media o el RAIS?", answer: "Prima Media (Colpensiones) suele ser mejor para salarios altos y carreras laborales estables. RAIS (fondos privados) puede ser mejor para salarios bajos o carreras cortas. Si tienes más de 750 semanas cotizadas, evalúa bien antes de cambiarte." },
    ],
    header: { title: "Calculadora de Jubilación", subtitle: "Planifica tu retiro con tranquilidad" },
  },
  {
    nombre: "Meta de Ahorro", descripcion: "Cuánto ahorrar mensualmente para tu objetivo",
    href: "/finanzas/calculadora-meta-ahorro", icon: "target", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora de Ahorro | Meta, Tiempo y Tasa Personalizada", description: "Calcula cuánto ahorrar mensualmente o cuánto tiempo necesitas para tu meta. Ingresa tu propia tasa de interés o compara opciones. Opción sin rendimiento y tasa personalizada.", keywords: ["calculadora ahorro", "meta de ahorro", "cuánto ahorrar mensualmente", "cuánto tiempo ahorrar", "calculadora ahorro mensual", "plan de ahorro", "objetivo de ahorro", "ahorro programado", "interés compuesto ahorro", "fondo de emergencia", "ahorro sin intereses", "simulador ahorro", "calculadora meta financiera"], ogTitle: "Calculadora de Ahorro | Meta y Tiempo", ogDescription: "Descubre cuánto ahorrar o cuánto tiempo necesitas para alcanzar tu meta. Compara cuentas o usa tu propia tasa." },
    jsonLd: { name: "Calculadora de Meta de Ahorro", description: "Calcula cuánto ahorrar mensualmente para alcanzar tu meta financiera.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Cómo se calcula el aporte mensual necesario?", answer: "Usamos la fórmula de valor futuro de anualidades con interés compuesto. Consideramos tu capital inicial, la tasa de interés de la cuenta seleccionada y el plazo que elegiste para calcular exactamente cuánto necesitas aportar cada mes." },
      { question: "¿Por qué con mejores tasas necesito ahorrar menos?", answer: "Porque el interés compuesto hace más trabajo por ti. Con una tasa más alta, tus aportes generan más intereses, y esos intereses generan más intereses. Así, una parte mayor de tu meta viene de los rendimientos en lugar de tu bolsillo." },
      { question: "¿Qué pasa si no puedo ahorrar el monto sugerido?", answer: "Tienes dos opciones: extender el plazo (más tiempo = menos ahorro mensual) o reducir tu meta. También puedes empezar con un capital inicial mayor si tienes ahorros disponibles." },
      { question: "¿El cálculo incluye inflación?", answer: "No, el cálculo muestra el valor nominal. Si quieres que tu meta mantenga poder adquisitivo, considera aumentarla según la inflación esperada (aprox. 5% anual en Colombia)." },
    ],
    header: { title: "Calculadora de Meta de Ahorro", subtitle: "Descubre cuánto debes ahorrar mensualmente para alcanzar tu objetivo" },
  },
  {
    nombre: "Prestación de Servicios", descripcion: "Calcula tus descuentos como independiente",
    href: "/finanzas/calculadora-prestacion-servicios", icon: "file-text", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora Prestación de Servicios 2026 Colombia | Independientes", description: "Calcula tus ingresos netos como independiente: retención en la fuente, aportes a salud, pensión y ARL. Actualizada con valores 2026 Colombia.", keywords: ["calculadora prestacion servicios", "calculadora independientes Colombia", "cuenta de cobro calculadora", "retencion en la fuente honorarios", "aportes seguridad social independientes", "IBC independientes", "salud pension independientes", "contrato prestacion servicios", "honorarios Colombia 2026", "calculadora freelancer Colombia"] },
    jsonLd: { name: "Calculadora Prestación de Servicios Colombia", description: "Calcula tus ingresos netos como trabajador independiente en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es el IBC (Ingreso Base de Cotización)?", answer: "El IBC es la base sobre la cual se calculan los aportes a seguridad social. Para independientes, corresponde al 40% del valor mensual del contrato. No puede ser menor a 1 SMMLV ni mayor a 25 SMMLV." },
      { question: "¿Cuánto debo pagar de seguridad social como independiente?", answer: "Debes pagar el 28.5% de tu IBC: 12.5% para salud y 16% para pensión. Además, dependiendo del riesgo de tu actividad, debes aportar a ARL (desde 0.522% para riesgo I)." },
      { question: "¿Cuál es la diferencia entre retención del 10% y 11%?", answer: "Si eres declarante de renta (obligado a presentar declaración), la retención es del 11%. Si no eres declarante, la retención es del 10%. Esto aplica para contratos de prestación de servicios." },
      { question: "¿Los aportes a seguridad social son deducibles de impuestos?", answer: "Sí, los aportes obligatorios a salud y pensión son 100% deducibles en tu declaración de renta. Esto reduce tu base gravable y por ende tu impuesto." },
    ],
    header: { title: "Calculadora Prestación de Servicios", subtitle: "Calcula tus descuentos como independiente 2026" },
  },
  {
    nombre: "Presupuesto 50/30/20", descripcion: "Organiza tu plata de forma simple y efectiva",
    href: "/finanzas/calculadora-presupuesto", icon: "bar-chart", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Calculadora Presupuesto 50/30/20 - Organiza tus Finanzas", description: "Aplica la regla 50/30/20 para organizar tu dinero. Calcula cuánto destinar a necesidades, deseos y ahorro según tu ingreso mensual.", keywords: ["calculadora presupuesto", "regla 50 30 20", "presupuesto personal", "organizar finanzas", "distribuir salario", "presupuesto mensual", "finanzas personales Colombia", "como ahorrar dinero", "planificación financiera"] },
    jsonLd: { name: "Calculadora de Presupuesto 50/30/20", description: "Organiza tu dinero con la regla 50/30/20. Calcula la distribución ideal de tu ingreso mensual.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es la regla 50/30/20?", answer: "Es un método de presupuesto creado por Elizabeth Warren que divide tu ingreso neto en tres categorías: 50% para necesidades esenciales (arriendo, servicios, mercado), 30% para deseos (entretenimiento, salidas), y 20% para ahorro e inversión." },
      { question: "¿Cómo saber qué es una necesidad y qué es un deseo?", answer: "Una necesidad es un gasto que no puedes evitar sin afectar tu calidad de vida básica: vivienda, alimentación, transporte al trabajo, salud. Un deseo es algo que mejora tu vida pero podrías vivir sin ello: Netflix, restaurantes, ropa de marca." },
      { question: "¿Puedo ajustar los porcentajes 50/30/20?", answer: "Sí. Si vives en una ciudad costosa, quizás necesites 60/20/20. Si quieres ahorrar más agresivamente, podrías usar 50/20/30 (destinando 30% al ahorro). Lo importante es que los porcentajes sumen 100% y sean realistas para ti." },
      { question: "¿Qué debo incluir en el 20% de ahorro?", answer: "El 20% incluye: fondo de emergencia (3-6 meses de gastos), ahorro para metas específicas (vacaciones, carro), inversiones, aportes a pensión voluntaria, y pagos extra para eliminar deudas más rápido." },
    ],
    header: { title: "Presupuesto 50/30/20", subtitle: "Organiza tu plata de forma simple y efectiva" },
  },
  {
    nombre: "Comparador Cuentas de Ahorro", descripcion: "Compara rendimientos de cuentas remuneradas",
    href: "/finanzas/simulador-cuenta-ahorro", icon: "piggy-bank", gradient: gradients.finanzas, categoria: "finanzas",
    meta: { title: "Comparador de Cuentas de Ahorro Colombia | Mejores Tasas 2025", description: "Compara las mejores cuentas de ahorro en Colombia: Ualá, Nu, Pibank, Global66 y más. Simula rendimientos con interés compuesto y visualiza cuánto ganas vs guardar bajo el colchón.", keywords: ["cuentas de ahorro colombia", "mejor cuenta de ahorro", "comparador cuentas ahorro", "ualá colombia", "nu colombia cajitas", "pibank ahorro", "global66", "tasas de interés ahorro", "simulador ahorro", "interés compuesto"], ogTitle: "Comparador de Cuentas de Ahorro Colombia 2025", ogDescription: "Encuentra la mejor cuenta de ahorro en Colombia. Compara tasas de Ualá, Nu, Pibank y más." },
    jsonLd: { name: "Comparador de Cuentas de Ahorro Colombia", description: "Compara rendimientos de cuentas de ahorro remuneradas en Colombia.", applicationCategory: "FinanceApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Cuál es la mejor cuenta de ahorro en Colombia?", answer: "Depende de tu situación. Ualá ofrece la mejor tasa (12% EA) pero tiene límite de $10M. Pibank y Global66 ofrecen 11% sin límites. Para montos grandes, considera diversificar entre varias opciones." },
      { question: "¿Qué significa tasa EA (Efectiva Anual)?", answer: "La tasa EA representa el rendimiento real que obtienes en un año, incluyendo el efecto del interés compuesto. Una tasa del 12% EA significa que $1.000.000 se convertirán en $1.120.000 después de un año." },
      { question: "¿Por qué guardar dinero bajo el colchón es mala idea?", answer: "Por la inflación. Si la inflación es del 5% anual, tu dinero pierde poder de compra cada día. Un millón de pesos hoy comprará menos cosas en un año, aunque nominalmente siga siendo un millón." },
      { question: "¿Las cuentas de ahorro digitales son seguras?", answer: "Sí, las entidades listadas están vigiladas por la Superintendencia Financiera de Colombia. Los depósitos están protegidos por Fogafin hasta $50 millones por persona. Puedes retirar tu dinero en cualquier momento." },
    ],
    header: { title: "Comparador de Cuentas de Ahorro", subtitle: "Compara rendimientos de las mejores cuentas remuneradas en Colombia" },
  },
];

const registroProductividad: CalculadoraMeta[] = [
  {
    nombre: "Valor Hora", descripcion: "Calcula cuánto vale tu hora de trabajo",
    href: "/productividad/valor-hora", icon: "gem", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Calculadora del Valor de tu Hora - ¿Cuánto Vale tu Tiempo?", description: "Calcula el valor real de una hora de tu trabajo. Descubre tu tarifa por hora considerando gastos de transporte, comida y tiempo de traslado.", keywords: ["valor hora trabajo", "cuanto vale mi hora", "calcular tarifa por hora", "valor tiempo trabajo", "salario por hora", "productividad personal", "costo oportunidad tiempo", "freelance tarifa hora"] },
    jsonLd: { name: "Calculadora del Valor de tu Hora", description: "Calcula el valor real de una hora de tu trabajo considerando todos los costos.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Por qué es importante conocer el valor de mi hora?", answer: "Conocer el valor de tu hora te ayuda a tomar mejores decisiones sobre cómo invertir tu tiempo. Puedes evaluar si vale la pena hacer algo tú mismo o delegarlo, y establecer tarifas justas si eres freelancer o independiente." },
      { question: "¿Qué gastos debo incluir en el cálculo?", answer: "Incluye todos los gastos asociados a trabajar: transporte (gasolina, pasajes, parqueadero), comida fuera de casa, ropa de trabajo, y el tiempo de traslado. Estos costos reducen tu ingreso real por hora." },
      { question: "¿Cómo uso el valor de mi hora para tomar decisiones?", answer: "Si tu hora vale $50.000 y un servicio de aseo cobra $40.000 por 2 horas de trabajo, te conviene contratarlo y usar ese tiempo para trabajar o descansar. Aplica esta lógica a cualquier decisión de tiempo vs dinero." },
      { question: "¿El valor bruto y neto de la hora son muy diferentes?", answer: "Sí, pueden diferir bastante. El valor bruto solo considera salario/horas. El valor neto descuenta gastos laborales y cuenta el tiempo total invertido (incluyendo traslados), dando una imagen más realista." },
    ],
    header: { title: "Valor de tu Hora", subtitle: "Descubre cuánto vale realmente una hora de tu tiempo" },
  },
  {
    nombre: "Vida en Semanas", descripcion: "Visualiza tu vida en semanas",
    href: "/productividad/vida-en-semanas", icon: "calendar", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Tu Vida en Semanas - Visualiza tu Vida Completa", description: "Visualiza tu vida entera en una cuadrícula de semanas. Descubre cuántos veranos, navidades y fines de semana te quedan. Una perspectiva poderosa sobre el tiempo.", keywords: ["vida en semanas", "life in weeks", "visualizar vida", "expectativa de vida", "semanas vividas", "tiempo de vida", "perspectiva temporal", "mortalidad"] },
    jsonLd: { name: "Tu Vida en Semanas", description: "Visualiza tu vida entera en una cuadrícula de semanas y gana perspectiva sobre el tiempo.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Por qué visualizar la vida en semanas?", answer: "Ver tu vida como una cuadrícula finita de semanas hace tangible lo abstracto. Es un recordatorio poderoso de que el tiempo es limitado y cada semana cuenta. Inspira a vivir con más intención." },
      { question: "¿Cuál es la expectativa de vida promedio?", answer: "En Colombia es ~77 años, en México ~75, en Argentina ~76, en España ~83. Factores como estilo de vida, ejercicio, alimentación y genética pueden aumentarla significativamente." },
      { question: "¿Cuántas semanas tiene una vida de 80 años?", answer: "Una vida de 80 años tiene 4,160 semanas. Parece mucho, pero si tienes 30 años ya usaste 1,560 semanas (37.5%). Te quedan aproximadamente 2,600 semanas." },
      { question: "¿Cómo puedo aprovechar mejor mis semanas restantes?", answer: "Define qué es importante para ti. Programa primero lo que importa (familia, salud, metas). Di no a lo que no te acerca a tu visión. Cada semana que pasa no vuelve." },
    ],
    header: { title: "Tu Vida en Semanas", subtitle: "Cada cuadrito es una semana de tu vida. ¿Cuántas te quedan?" },
  },
  {
    nombre: "Auditoría de Tiempo", descripcion: "Analiza en qué gastas tu tiempo",
    href: "/productividad/auditoria-tiempo", icon: "search", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Auditoría de Tiempo - Analiza tus 168 Horas Semanales", description: "Analiza cómo distribuyes las 168 horas de tu semana. Identifica desequilibrios y recibe sugerencias personalizadas para mejorar tu balance de vida.", keywords: ["auditoria tiempo", "168 horas semana", "gestion tiempo", "balance vida trabajo", "distribucion tiempo", "productividad semanal", "como uso mi tiempo", "analisis tiempo"] },
    jsonLd: { name: "Auditoría de Tiempo Semanal", description: "Analiza cómo distribuyes tus 168 horas semanales y mejora tu balance de vida.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Por qué 168 horas?", answer: "Todos tenemos exactamente 168 horas a la semana (24 horas × 7 días). Es el gran ecualizador: millonarios y personas comunes tienen el mismo tiempo. La diferencia está en cómo lo usan." },
      { question: "¿Cuántas horas debería dormir?", answer: "Los adultos necesitan 7-9 horas por noche (49-63 horas semanales). Dormir menos de 6 horas afecta la memoria, el sistema inmune y aumenta el riesgo de enfermedades crónicas." },
      { question: "¿Cuánto tiempo de ocio es saludable?", answer: "Se recomienda entre 2-5 horas de tiempo libre de calidad al día. Muy poco causa agotamiento; demasiado sin propósito puede causar insatisfacción. El balance es clave." },
      { question: "¿Cómo puedo encontrar más tiempo?", answer: "Audita primero: registra tu tiempo real por una semana. Identifica 'fugas' como redes sociales o reuniones innecesarias. Pequeños ajustes (20-30 min/día) suman 2+ horas semanales." },
    ],
    header: { title: "Auditoría de Tiempo", subtitle: "Todos tenemos 168 horas a la semana. ¿Cómo usas las tuyas?" },
  },
  {
    nombre: "Hábitos", descripcion: "Calcula el impacto de tus hábitos",
    href: "/productividad/calculadora-habitos", icon: "target", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Calculadora de Hábitos - Mide el Impacto de tus Hábitos Diarios", description: "Calcula el impacto acumulado de tus hábitos en tiempo, dinero y salud. Proyecciones a 1, 5 y 10 años con interés compuesto para hábitos de ahorro.", keywords: ["calculadora habitos", "impacto habitos diarios", "habitos saludables", "ahorro habitos", "dejar de fumar ahorro", "habitos productividad", "tiempo acumulado", "interes compuesto ahorro"] },
    jsonLd: { name: "Calculadora de Hábitos", description: "Calcula el impacto acumulado de tus hábitos diarios en tiempo, dinero y salud.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Por qué los pequeños hábitos importan tanto?", answer: "Los hábitos pequeños se acumulan exponencialmente. Leer 20 minutos al día son 120+ horas al año (unos 40 libros). Ahorrar $10.000 diarios son $3.6 millones al año, sin contar intereses." },
      { question: "¿Cómo funciona el interés compuesto en hábitos de ahorro?", answer: "Si inviertes tus ahorros del hábito, los intereses generan más intereses. Ahorrar $300.000/mes al 10% anual te da $62 millones en 10 años, aunque solo aportaste $36 millones." },
      { question: "¿Qué hábitos tienen mayor impacto financiero?", answer: "Dejar de fumar puede ahorrarte $2-5 millones al año. Reducir comidas fuera ahorra $1-3 millones. Preparar café en casa en vez de comprarlo ahorra $500.000-1.000.000 al año." },
      { question: "¿Cómo mantengo un nuevo hábito?", answer: "Empieza pequeño (2 minutos al día), vincúlalo a un hábito existente, hazlo obvio y atractivo. Rastrea tu progreso y celebra las pequeñas victorias." },
    ],
    header: { title: "Calculadora de Hábitos", subtitle: "Mide el impacto acumulado de tus hábitos diarios" },
  },
  {
    nombre: "Matriz Eisenhower", descripcion: "Prioriza tareas por urgencia e importancia",
    href: "/productividad/matriz-eisenhower", icon: "grid", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Matriz de Eisenhower | Prioriza Tareas por Urgencia e Importancia", description: "Organiza tus tareas con la Matriz de Eisenhower. Clasifica actividades por urgencia e importancia para mejorar tu productividad y enfoque.", keywords: ["matriz eisenhower", "priorización tareas", "urgente importante", "gestión del tiempo", "productividad personal", "organización tareas", "método eisenhower", "cuadrantes eisenhower"] },
    jsonLd: { name: "Matriz de Eisenhower", description: "Organiza tus tareas por urgencia e importancia para mejorar tu productividad.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es la Matriz de Eisenhower?", answer: "Es una herramienta de gestión del tiempo creada por Dwight D. Eisenhower. Clasifica las tareas según su urgencia e importancia en 4 cuadrantes: Hacer (urgente e importante), Programar (importante pero no urgente), Delegar (urgente pero no importante), y Eliminar (ni urgente ni importante)." },
      { question: "¿Cómo distingo entre urgente e importante?", answer: "Lo urgente requiere atención inmediata y suele estar relacionado con las prioridades de otros. Lo importante contribuye a tus metas y valores a largo plazo. Una llamada puede ser urgente pero no importante; planificar tu carrera es importante pero rara vez urgente." },
      { question: "¿Cuántas tareas debo tener en cada cuadrante?", answer: "Idealmente, la mayoría de tu tiempo debería ir al cuadrante 2 (Programar - importante pero no urgente). Esto previene que las cosas se vuelvan urgentes. Si tienes muchas tareas en 'Hacer', probablemente no estás planificando suficiente." },
      { question: "¿Cada cuánto debo revisar mi matriz?", answer: "Revísala al inicio de cada día y haz una revisión más profunda semanal. Las prioridades cambian, y lo que ayer era importante puede no serlo hoy. La revisión constante es clave para mantenerte enfocado." },
    ],
    header: { title: "Matriz de Eisenhower", subtitle: "Prioriza tus tareas según urgencia e importancia" },
  },
  {
    nombre: "Calculadora Pomodoro", descripcion: "Planifica tu sesión de trabajo",
    href: "/productividad/calculadora-pomodoro", icon: "timer", gradient: gradients.productividad, categoria: "productividad",
    meta: { title: "Calculadora Pomodoro | Planifica tu Tiempo de Trabajo y Descanso", description: "Calcula cuántos pomodoros necesitas para completar tus tareas. Planifica sesiones de trabajo con la técnica Pomodoro y optimiza tu productividad.", keywords: ["técnica pomodoro", "calculadora pomodoro", "productividad", "gestión del tiempo", "trabajo enfocado", "descansos productivos", "planificador pomodoro", "método pomodoro"] },
    jsonLd: { name: "Calculadora Pomodoro", description: "Planifica sesiones de trabajo con la técnica Pomodoro y optimiza tu productividad.", applicationCategory: "ProductivityApplication", priceCurrency: "COP" },
    faqs: [
      { question: "¿Qué es la técnica Pomodoro?", answer: "Es un método de gestión del tiempo creado por Francesco Cirillo. Consiste en trabajar en bloques de 25 minutos (pomodoros) con descansos cortos de 5 minutos. Después de 4 pomodoros, tomas un descanso largo de 15-30 minutos." },
      { question: "¿Por qué funcionan los bloques de 25 minutos?", answer: "25 minutos es el tiempo óptimo para mantener la concentración sin fatigarse. Es lo suficientemente corto para sentirse manejable, pero lo suficientemente largo para hacer progreso real. Los descansos previenen el agotamiento mental." },
      { question: "¿Qué hago si me interrumpen durante un pomodoro?", answer: "Apunta la interrupción y vuelve a tu tarea. Si es urgente, detén el pomodoro (ese pomodoro no cuenta) y reinicia después. Con práctica, aprenderás a proteger tus pomodoros de interrupciones." },
      { question: "¿Puedo ajustar la duración de los pomodoros?", answer: "Sí. Aunque 25 minutos es el estándar, puedes experimentar con 50/10 para trabajo profundo o 15/5 si recién empiezas. Lo importante es mantener la proporción trabajo/descanso y ser consistente." },
    ],
    header: { title: "Calculadora Pomodoro", subtitle: "Planifica tu sesión y trabaja enfocado" },
  },
];

const registroHerramientas: CalculadoraMeta[] = [
  {
    nombre: "Calculadora de Porcentajes", descripcion: "Calcula cualquier porcentaje",
    href: "/herramientas/calculadora-porcentajes", icon: "percent", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora de Porcentajes Online Gratis", description: "Calcula cualquier porcentaje fácilmente: porcentaje de un número, qué porcentaje es, aumentos, descuentos y diferencias porcentuales. Rápida y sin registro.", keywords: ["calculadora porcentajes", "calcular porcentaje", "porcentaje de descuento", "calcular aumento porcentual", "qué porcentaje es", "diferencia porcentual", "porcentaje online", "calculadora descuentos", "porcentaje de un número"] },
    jsonLd: { name: "Calculadora de Porcentajes", description: "Calcula cualquier porcentaje: % de un número, aumentos, descuentos y diferencia porcentual.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo calcular el porcentaje de un número?", answer: "Para calcular el X% de un número Y, multiplica Y por X y divide entre 100. Ejemplo: el 15% de 200 es (200 × 15) / 100 = 30." },
      { question: "¿Cómo saber qué porcentaje es un número de otro?", answer: "Divide el número menor entre el mayor y multiplica por 100. Ejemplo: para saber qué porcentaje es 30 de 200: (30 / 200) × 100 = 15%." },
      { question: "¿Cómo calcular un descuento porcentual?", answer: "Multiplica el precio original por (1 - descuento/100). Ejemplo: un producto de $100 con 25% de descuento: 100 × (1 - 0.25) = $75." },
      { question: "¿Cómo calcular un aumento porcentual?", answer: "Multiplica el valor original por (1 + aumento/100). Ejemplo: un salario de $1000 con aumento del 10%: 1000 × (1 + 0.10) = $1100." },
    ],
    header: { title: "Calculadora de Porcentajes", subtitle: "Calcula cualquier porcentaje fácilmente" },
  },
  {
    nombre: "Calculadora de Descuentos", descripcion: "Precio final y cuánto ahorras",
    href: "/herramientas/calculadora-descuentos", icon: "tag", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora de Descuentos Online - Precio Final y Ahorro", description: "Calcula el precio final con descuento y cuánto ahorras. Soporta descuentos encadenados (ej: 30% + 10% adicional). Perfecta para compras, Black Friday y ofertas.", keywords: ["calculadora descuentos", "calcular descuento", "precio con descuento", "cuanto ahorro", "descuento porcentaje", "black friday calculadora", "ofertas descuentos", "precio final", "descuentos encadenados", "calcular rebaja"] },
    jsonLd: { name: "Calculadora de Descuentos", description: "Calcula el precio final con descuento y cuánto ahorras en tus compras.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo se calculan los descuentos encadenados?", answer: "Los descuentos no se suman directamente. Un 30% + 20% adicional NO es 50%. Primero se aplica el 30% al precio original, y luego el 20% se aplica al precio ya rebajado. Ejemplo: $100 con 30% = $70, luego 20% de $70 = $56 (44% total, no 50%)." },
      { question: "¿Cómo calcular el precio original desde el precio con descuento?", answer: "Divide el precio final entre (1 - descuento/100). Ejemplo: si el precio final es $75 y el descuento fue 25%, el original era: $75 / (1 - 0.25) = $75 / 0.75 = $100." },
      { question: "¿Qué es mejor: 30% de descuento o $30.000 de descuento?", answer: "Depende del precio original. Si el producto cuesta $100.000, el 30% ($30.000) es igual. Si cuesta más de $100.000, el 30% es mejor. Si cuesta menos, los $30.000 fijos son mejor." },
      { question: "¿Los descuentos incluyen IVA?", answer: "Generalmente los descuentos se aplican al precio con IVA incluido, que es el precio que ves en la etiqueta. El descuento reduce el total que pagas, incluyendo impuestos." },
    ],
    header: { title: "Calculadora de Descuentos", subtitle: "Calcula el precio final y cuánto ahorras" },
  },
  {
    nombre: "Conversor de Unidades", descripcion: "Convierte longitud, peso y más",
    href: "/herramientas/conversor-unidades", icon: "refresh", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Conversor de Unidades Online: Longitud, Peso, Temperatura", description: "Convierte entre diferentes unidades de medida: metros a pies, kilogramos a libras, Celsius a Fahrenheit y más. Conversor rápido y preciso.", keywords: ["conversor unidades", "convertir metros a pies", "kilogramos a libras", "celsius a fahrenheit", "conversor de medidas", "convertir unidades online", "pulgadas a centímetros", "millas a kilómetros", "conversor temperatura"] },
    jsonLd: { name: "Conversor de Unidades", description: "Convierte entre diferentes unidades de longitud, peso, temperatura, volumen y más.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cuántos centímetros hay en una pulgada?", answer: "Una pulgada equivale a 2.54 centímetros exactos. Para convertir pulgadas a centímetros, multiplica por 2.54. Para el inverso, divide entre 2.54." },
      { question: "¿Cómo convertir Celsius a Fahrenheit?", answer: "Usa la fórmula: °F = (°C × 9/5) + 32. Por ejemplo, 25°C = (25 × 9/5) + 32 = 77°F. Para el inverso: °C = (°F - 32) × 5/9." },
      { question: "¿Cuántos kilogramos hay en una libra?", answer: "Una libra equivale a 0.453592 kilogramos. Para convertir libras a kg, multiplica por 0.4536. Un kilogramo equivale a 2.205 libras." },
      { question: "¿Cuántos kilómetros hay en una milla?", answer: "Una milla equivale a 1.60934 kilómetros. Para convertir millas a km, multiplica por 1.609. Un kilómetro equivale a 0.621 millas." },
    ],
    header: { title: "Conversor de Unidades", subtitle: "Convierte entre diferentes sistemas de medida" },
  },
  {
    nombre: "Dividir Cuenta", descripcion: "Divide gastos entre amigos",
    href: "/herramientas/calculadora-dividir-cuenta", icon: "receipt", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora para Dividir Cuenta entre Amigos", description: "Divide gastos de forma justa entre varias personas. Perfecta para viajes, cenas o gastos compartidos. Calcula quién debe a quién automáticamente.", keywords: ["dividir cuenta", "dividir gastos", "split bill", "dividir entre amigos", "gastos compartidos", "calculadora gastos viaje", "dividir cena", "quién debe a quién", "repartir gastos"] },
    jsonLd: { name: "Calculadora para Dividir Cuenta", description: "Divide la cuenta entre amigos fácilmente, con propinas incluidas.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo dividir una cuenta de restaurante entre amigos?", answer: "Puedes dividir en partes iguales el total (incluyendo propina) entre el número de personas. Si cada quien consumió diferente, suma lo de cada uno y agrega la propina proporcional." },
      { question: "¿Cómo calcular gastos compartidos en un viaje?", answer: "Registra todos los gastos y quién los pagó. Al final, suma el total, divide entre el número de personas para obtener el gasto promedio, y calcula quién debe pagar a quién para equilibrar." },
      { question: "¿Cuánto debería dejar de propina?", answer: "La propina estándar varía por país: en Colombia suele ser el 10%, en México entre 10-15%, en Estados Unidos 15-20%, y en algunos países europeos no es obligatoria." },
      { question: "¿Es mejor dividir en partes iguales o por consumo?", answer: "Dividir por consumo es más justo cuando hay grandes diferencias en lo que cada persona pidió. Partes iguales funciona bien cuando todos consumieron algo similar." },
    ],
    header: { title: "Dividir Cuenta", subtitle: "Divide gastos entre amigos fácilmente" },
  },
  {
    nombre: "Calculadora de IVA", descripcion: "Agrega, quita o calcula el IVA",
    href: "/herramientas/calculadora-iva", icon: "receipt", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora de IVA Colombia - Agregar, Quitar y Calcular IVA", description: "Calcula el IVA en Colombia fácilmente. Agrega IVA del 19%, quítalo del precio final o calcula solo el impuesto. Tasas 19%, 5% y 0% (exento). Gratis y sin registro.", keywords: ["calculadora IVA Colombia", "calcular IVA 19%", "agregar IVA", "quitar IVA", "IVA incluido", "precio sin IVA", "impuesto al valor agregado", "IVA Colombia 2025", "calculadora impuestos", "base gravable IVA"] },
    jsonLd: { name: "Calculadora de IVA Colombia", description: "Calcula el IVA en Colombia: agrega, quita o calcula el impuesto con tasas del 19%, 5% y 0%.", applicationCategory: "FinanceApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cuál es el IVA en Colombia?", answer: "En Colombia, la tarifa general del IVA es del 19%. Sin embargo, existen tasas reducidas del 5% para ciertos productos como algunos alimentos procesados y servicios, y del 0% para productos exentos como canasta familiar básica, medicamentos y exportaciones." },
      { question: "¿Cómo se calcula el IVA de un producto?", answer: "Para agregar IVA: multiplica el precio base por 1.19 (para 19%). Para quitar IVA de un precio con impuesto incluido: divide el precio total entre 1.19. Para calcular solo el IVA: divide el precio base entre 100 y multiplica por 19." },
      { question: "¿Qué productos tienen IVA del 5%?", answer: "Tienen IVA del 5% productos como: algunos alimentos procesados, embutidos, bicicletas con valor hasta 50 UVT, servicios de vigilancia con armas, almacenamiento de productos agrícolas, entre otros definidos en el Estatuto Tributario." },
      { question: "¿Qué productos están exentos de IVA (0%)?", answer: "Están exentos de IVA: productos de la canasta familiar básica (arroz, pan, leche, huevos, frutas, verduras), medicamentos, libros, cuadernos, servicios de salud, educación, transporte público y las exportaciones de bienes." },
    ],
    header: { title: "Calculadora de IVA", subtitle: "Calcula el IVA en Colombia al instante" },
  },
  {
    nombre: "Diferencia entre Fechas", descripcion: "Calcula el tiempo exacto entre dos fechas",
    href: "/herramientas/calculadora-diferencia-fechas", icon: "calendar", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora de Diferencia entre Fechas Online", description: "Calcula la diferencia exacta entre dos fechas en años, meses, semanas y días. Perfecta para calcular antigüedad, plazos o tiempo transcurrido.", keywords: ["diferencia entre fechas", "calcular días entre fechas", "cuántos días faltan", "calculadora de fechas", "tiempo entre fechas", "calcular antigüedad", "días transcurridos", "semanas entre fechas", "contador de días"] },
    jsonLd: { name: "Calculadora de Diferencia entre Fechas", description: "Calcula el tiempo exacto entre dos fechas: días, meses, años, horas y más.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cómo calcular los días entre dos fechas?", answer: "Convierte ambas fechas a días desde una fecha de referencia (como el 1 de enero del año 1) y resta. Nuestra calculadora hace esto automáticamente, considerando años bisiestos." },
      { question: "¿Cuántos días tiene un año?", answer: "Un año normal tiene 365 días. Los años bisiestos tienen 366 días. Un año bisiesto ocurre cada 4 años, excepto los años divisibles por 100 pero no por 400." },
      { question: "¿Cómo calcular la antigüedad laboral exacta?", answer: "Ingresa tu fecha de ingreso como fecha inicial y la fecha actual como fecha final. La calculadora te mostrará los años, meses y días exactos de antigüedad." },
      { question: "¿Cuántas semanas tiene un año?", answer: "Un año tiene 52 semanas y 1 día (o 2 días en años bisiestos). Esto equivale a 365 o 366 días dependiendo del año." },
    ],
    header: { title: "Diferencia entre Fechas", subtitle: "Calcula el tiempo exacto entre dos fechas" },
  },
  {
    nombre: "Días Vividos", descripcion: "Descubre tu vida en números",
    href: "/herramientas/calculadora-dias-vividos", icon: "calendar", gradient: gradients.herramientas, categoria: "herramientas",
    meta: { title: "Calculadora de Días Vividos: ¿Cuántos Días Tienes de Vida?", description: "Descubre cuántos días, horas y minutos has vivido desde que naciste. Una perspectiva única de tu vida en números que te hará reflexionar.", keywords: ["días vividos", "cuántos días tengo", "calculadora edad en días", "horas vividas", "minutos de vida", "mi vida en números", "cuánto tiempo he vivido", "edad exacta", "calculadora de edad"] },
    jsonLd: { name: "Calculadora de Días Vividos", description: "Descubre cuántos días, horas y minutos has vivido desde tu nacimiento.", applicationCategory: "UtilitiesApplication", priceCurrency: "USD" },
    faqs: [
      { question: "¿Cuántos días tiene una persona de 30 años?", answer: "Una persona de 30 años ha vivido aproximadamente 10,950 días (30 × 365). Con años bisiestos incluidos, serían alrededor de 10,958 días." },
      { question: "¿Cuántas horas hay en una vida promedio?", answer: "Con una esperanza de vida de 80 años, una persona vive aproximadamente 700,800 horas (80 × 365 × 24). Cada día son 24 horas, cada año son 8,760 horas." },
      { question: "¿Cuántos latidos tiene el corazón en una vida?", answer: "El corazón late aproximadamente 100,000 veces al día. En una vida de 80 años, son aproximadamente 2,920 millones de latidos." },
      { question: "¿Por qué es útil saber cuántos días he vivido?", answer: "Conocer tu vida en días te da una perspectiva diferente del tiempo. Te ayuda a valorar cada día, establecer metas concretas y reflexionar sobre cómo inviertes tu tiempo." },
    ],
    header: { title: "Días Vividos", subtitle: "Descubre tu vida en números" },
  },
];

// ============================================================
// Arrays derivados (mantienen compatibilidad con imports existentes)
// ============================================================

export const calculadorasSalud: Calculadora[] = registroSalud;
export const calculadorasFinanzas: Calculadora[] = registroFinanzas;
export const calculadorasProductividad: Calculadora[] = registroProductividad;
export const calculadorasHerramientas: Calculadora[] = registroHerramientas;

export const utilidadesDestacadas: Calculadora[] = registroHerramientas.filter((c) =>
  ["/herramientas/calculadora-porcentajes", "/herramientas/calculadora-descuentos", "/herramientas/conversor-unidades", "/herramientas/calculadora-dividir-cuenta"].includes(c.href)
);

// Registro completo
const todasLasCalculadoras: CalculadoraMeta[] = [
  ...registroSalud,
  ...registroFinanzas,
  ...registroProductividad,
  ...registroHerramientas,
];

// ============================================================
// Helpers
// ============================================================

export function getCalculadora(href: string): CalculadoraMeta | undefined {
  return todasLasCalculadoras.find((c) => c.href === href);
}

export function getRelatedCalculators(href: string, count = 3): { name: string; href: string; description: string; icon: string }[] {
  const calc = getCalculadora(href);
  if (!calc) return [];

  const sameCategory = todasLasCalculadoras.filter(
    (c) => c.categoria === calc.categoria && c.href !== href
  );
  const otherCategory = todasLasCalculadoras.filter(
    (c) => c.categoria !== calc.categoria
  );

  const pool = [...sameCategory, ...otherCategory];
  return pool.slice(0, count).map((c) => ({
    name: c.nombre,
    href: c.href,
    description: c.descripcion,
    icon: c.icon,
  }));
}

export function getShadowColor(categoria: keyof typeof shadowColors): string {
  return shadowColors[categoria];
}
