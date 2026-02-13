# Configuración de Analytics - VidaEnCifras

## Eventos personalizados

### calculator_used
- **Cuándo se dispara**: Cuando un usuario ve resultados en cualquier calculadora
- **Parámetros**:
  - `calculator_category`: finanzas, salud, productividad, herramientas
  - `calculator_name`: nombre de la calculadora (ej: calculadora-liquidacion)

### cta_click
- **Cuándo se dispara**: Cuando un usuario hace click en un CTA de blog hacia una calculadora
- **Parámetros**:
  - `blog`: slug del artículo (ej: mejores-cdt-febrero-2026)
  - `destino`: URL de la calculadora destino (ej: /finanzas/comparador-cdt)
  - `posicion`: header | final_articulo | flotante

---

## GTM (Tag Manager) - Contenedor GTM-TF8GVTZ4

### Variables de capa de datos (Data Layer Variables)
| Nombre | Variable de capa de datos | Versión |
|--------|--------------------------|---------|
| DLV - calculator_category | calculator_category | 2 |
| DLV - calculator_name | calculator_name | 2 |
| DLV - blog | blog | 2 |
| DLV - destino | destino | 2 |
| DLV - posicion | posicion | 2 |

### Activadores (Triggers)
| Nombre | Tipo | Nombre del evento |
|--------|------|-------------------|
| Evento - calculator_used | Evento personalizado | calculator_used |
| Evento - cta_click | Evento personalizado | cta_click |

### Etiquetas (Tags)
| Nombre | Tipo | ID medición | Evento | Parámetros | Activador |
|--------|------|-------------|--------|------------|-----------|
| GA4 - calculator_used | Evento de GA4 | G-0FJ5XB1EY8 | calculator_used | calculator_category, calculator_name | Evento - calculator_used |
| GA4 - cta_click | Evento de GA4 | G-0FJ5XB1EY8 | cta_click | blog, destino, posicion | Evento - cta_click |

---

## GA4 - Propiedad G-0FJ5XB1EY8

### Dimensiones personalizadas
| Nombre | Ámbito | Parámetro de evento |
|--------|--------|---------------------|
| Categoría calculadora | Evento | calculator_category |
| Nombre calculadora | Evento | calculator_name |
| Blog origen | Evento | blog |
| Destino CTA | Evento | destino |
| Posición CTA | Evento | posicion |

### Eventos clave (Conversiones)
- `calculator_used` — marcado como evento clave
- `cta_click` — marcado como evento clave

### Medición mejorada
- Vistas de página ✅
- Scrolls ✅
- Clicks salientes ✅
- Búsqueda en el sitio ✅

### Search Console
- Vinculado con la propiedad de Search Console de vidaencifras.com

---

## Dónde ver los datos en GA4

| Pregunta | Ruta en GA4 |
|----------|-------------|
| Qué blogs visitan | Informes → Participación → Páginas (filtrar `/blog/`) |
| Qué calculadoras visitan | Informes → Participación → Páginas (filtrar por categoría) |
| Cuáles calculadoras usan | Informes → Participación → Eventos → calculator_used |
| Blog → Calculadora (CTAs) | Informes → Participación → Eventos → cta_click |
| De dónde llegan | Informes → Adquisición → Adquisición de tráfico |
| Búsquedas de Google | Informes → Search Console → Consultas |

---

## Implementación en el código

### Archivos creados
- `src/lib/analytics.ts` — función `trackEvent()` que hace `dataLayer.push()`
- `src/components/AnalyticsClickTracker.tsx` — listener global de clicks en elementos `[data-track]`
- `src/hooks/useCalculatorTracking.ts` — hook para calculadoras sin ResultWithMascot

### Archivos modificados
- `src/components/ResultWithMascot.tsx` — dispara `calculator_used` al montar (27 calculadoras)
- `src/app/blog/[slug]/page.tsx` — `data-track` en los 3 CTAs (header, final_articulo, flotante)
- `src/app/layout.tsx` — incluye AnalyticsClickTracker
- 14 calculadoras adicionales — hook `useCalculatorTracking`
- `src/lib/calculators.ts` — agregadas 9 calculadoras faltantes al listado
- `src/app/finanzas/page.tsx` — agregadas 8 calculadoras faltantes a la página de categoría
- `src/app/herramientas/page.tsx` — agregada calculadora de IVA
