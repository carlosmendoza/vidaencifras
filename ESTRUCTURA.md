# Estructura del Proyecto VidaEnCifras

Este documento describe la estructura del proyecto y cómo contribuir contenido.

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **MDX** - Markdown con componentes React para el blog
- **Recharts** - Gráficas interactivas

## Estructura de Directorios

```
vidaencifras/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx            # Página principal
│   │   ├── layout.tsx          # Layout global (nav, footer)
│   │   ├── globals.css         # Estilos globales
│   │   │
│   │   ├── blog/               # Sistema de blog
│   │   │   ├── page.tsx        # Lista de artículos (server)
│   │   │   ├── BlogFilters.tsx # Filtros por categoría (client)
│   │   │   └── [slug]/         # Páginas dinámicas de artículos
│   │   │       └── page.tsx
│   │   │
│   │   ├── finanzas/           # Calculadoras financieras
│   │   │   ├── page.tsx        # Índice de categoría
│   │   │   ├── calculadora-interes-compuesto/
│   │   │   ├── calculadora-prestamos/
│   │   │   └── calculadora-dividir-cuenta/
│   │   │
│   │   ├── salud/              # Calculadoras de salud
│   │   │   ├── calculadora-imc/
│   │   │   └── calculadora-calorias/
│   │   │
│   │   ├── herramientas/       # Herramientas generales
│   │   │   ├── calculadora-porcentajes/
│   │   │   ├── calculadora-dias-vividos/
│   │   │   ├── calculadora-diferencia-fechas/
│   │   │   └── conversor-unidades/
│   │   │
│   │   ├── productividad/      # Herramientas de productividad
│   │   │   └── calculadora-promedio-notas/
│   │   │
│   │   ├── privacidad/         # Página de privacidad
│   │   └── terminos/           # Términos de uso
│   │
│   ├── components/             # Componentes reutilizables
│   │   ├── ThemeToggle.tsx     # Toggle modo oscuro/claro
│   │   ├── NavDropdown.tsx     # Menú desplegable navegación
│   │   ├── MobileMenu.tsx      # Menú móvil
│   │   ├── ScrollToTop.tsx     # Botón scroll arriba
│   │   └── charts/             # Componentes de gráficas
│   │       └── InterestComparisonChart.tsx
│   │
│   ├── content/                # Contenido estático
│   │   └── blog/               # Artículos del blog (MDX)
│   │       └── *.mdx
│   │
│   └── lib/                    # Utilidades
│       └── blog.ts             # Funciones para leer posts MDX
│
├── public/                     # Archivos estáticos
├── mdx-components.tsx          # Componentes MDX personalizados
├── next.config.ts              # Configuración de Next.js
└── package.json
```

## Categorías

El sitio organiza el contenido en 4 categorías principales:

| Categoría | Ruta | Descripción |
|-----------|------|-------------|
| Finanzas | `/finanzas` | Calculadoras de interés, préstamos, divisiones |
| Salud | `/salud` | IMC, calorías, métricas de salud |
| Herramientas | `/herramientas` | Porcentajes, fechas, conversores |
| Productividad | `/productividad` | Promedios, notas, tiempo |

---

## Cómo Crear una Entrada de Blog

### 1. Crear el archivo MDX

Crea un nuevo archivo en `src/content/blog/` con extensión `.mdx`.

**Nombre del archivo:** usa kebab-case y será el slug de la URL.
- Ejemplo: `mi-articulo-nuevo.mdx` → URL: `/blog/mi-articulo-nuevo`

### 2. Agregar el Frontmatter

Cada artículo debe comenzar con un bloque de metadatos YAML:

```mdx
---
title: "Título del Artículo"
description: "Descripción breve para SEO y previews (máx 160 caracteres)"
date: "2026-02-10"
category: "finanzas"
calculadora: "/finanzas/calculadora-interes-compuesto"
---
```

#### Campos del Frontmatter

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `title` | Sí | Título del artículo |
| `description` | Sí | Descripción para SEO y tarjetas de preview |
| `date` | Sí | Fecha de publicación (formato: YYYY-MM-DD) |
| `category` | Sí | Categoría: `finanzas`, `salud`, `productividad`, `herramientas` |
| `calculadora` | No | Ruta a calculadora relacionada (muestra CTA al final) |
| `image` | No | Imagen destacada (ruta en `/public/`) |

### 3. Escribir el Contenido

Después del frontmatter, escribe el contenido usando Markdown estándar:

```mdx
---
title: "Mi Artículo"
description: "Descripción del artículo"
date: "2026-02-10"
category: "finanzas"
---

Párrafo introductorio del artículo.

## Sección Principal

Contenido con **negritas**, *cursivas* y [enlaces](https://ejemplo.com).

### Subsección

- Lista con viñetas
- Otro punto

1. Lista numerada
2. Segundo punto

> Cita o nota destacada

| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |

## Conclusión

Párrafo final del artículo.
```

### 4. Usar Componentes Personalizados (Opcional)

Puedes insertar componentes React dentro del MDX. Los componentes disponibles están en `mdx-components.tsx`.

Ejemplo actual disponible:
```mdx
<InterestComparisonChart />
```

Para agregar nuevos componentes:
1. Crea el componente en `src/components/charts/`
2. Impórtalo en `mdx-components.tsx`
3. Agrégalo al objeto de retorno

### 5. Ejemplo Completo

```mdx
---
title: "Cómo Ahorrar para tu Fondo de Emergencia"
description: "Guía paso a paso para construir un fondo de emergencia de 3 a 6 meses de gastos."
date: "2026-02-15"
category: "finanzas"
calculadora: "/finanzas/calculadora-interes-compuesto"
---

Un fondo de emergencia es tu red de seguridad financiera. Aquí te explico cómo construir el tuyo.

## ¿Por qué necesitas un fondo de emergencia?

La vida es impredecible. Un fondo de emergencia te protege de:

- Pérdida de empleo
- Gastos médicos inesperados
- Reparaciones del hogar o vehículo

## ¿Cuánto deberías ahorrar?

La regla general es tener entre **3 y 6 meses** de gastos esenciales.

| Situación | Meses Recomendados |
|-----------|-------------------|
| Empleo estable | 3 meses |
| Freelancer | 6+ meses |
| Único ingreso familiar | 6 meses |

## Pasos para construirlo

### 1. Calcula tus gastos mensuales

Suma todos tus gastos esenciales:
- Vivienda
- Alimentación
- Transporte
- Servicios

### 2. Define tu meta

Multiplica tus gastos por 3-6 meses.

### 3. Automatiza el ahorro

Configura transferencias automáticas el día de pago.

## Conclusión

Empieza hoy, aunque sea con poco. La consistencia es la clave.
```

---

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

---

## Notas Adicionales

- El tiempo de lectura se calcula automáticamente
- Los artículos se ordenan por fecha (más recientes primero)
- La categoría determina el color de la etiqueta en el blog
- Si incluyes `calculadora`, aparece un CTA al final del artículo
