# DyMEs — Guía de Estilo Gráfico

> **Versión:** 1.0  
> **Última actualización:** Febrero 2026  
> **Plataformas:** Web (Astro + Tailwind CSS), Android  
> **Idioma principal:** Español

---

## Índice

1. [Filosofía de Diseño](#1-filosofía-de-diseño)
2. [Paleta de Colores](#2-paleta-de-colores)
3. [Tipografía](#3-tipografía)
4. [Iconografía](#4-iconografía)
5. [Espaciado y Grid](#5-espaciado-y-grid)
6. [Layouts](#6-layouts)
7. [Componentes](#7-componentes)
8. [Elevación y Sombras](#8-elevación-y-sombras)
9. [Animaciones y Transiciones](#9-animaciones-y-transiciones)
10. [Modo Oscuro / Claro](#10-modo-oscuro--claro)
11. [Responsive](#11-responsive)
12. [Accesibilidad](#12-accesibilidad)
13. [Recomendaciones y Mejoras](#13-recomendaciones-y-mejoras)

---

## 1. Filosofía de Diseño

DyMEs es una herramienta de gestión de partidas y personajes de D&D 5e en español. El diseño busca evocar la esencia de la fantasía medieval —pergaminos, libros de reglas, mazmorras— sin perder modernidad ni usabilidad.

### Principios

| Principio | Descripción |
|---|---|
| **Inmersión temática** | Los colores, texturas y tipografías deben evocar un universo de fantasía épica sin resultar recargados. El diseño es una extensión de la mesa de juego. |
| **Claridad funcional** | La información de fichas, compendio y campañas es densa. Priorizar jerarquía visual, legibilidad y escaneabilidad rápida por encima de la decoración. |
| **Consistencia cross-platform** | Los tokens de color, tipografía y espaciado deben ser idénticos en Web y Android. Se usan CSS custom properties en web y equivalentes en la app nativa. |
| **Accesibilidad primero** | Ratio de contraste mínimo WCAG AA (4.5:1 para texto, 3:1 para UI grande). Sin depender exclusivamente de color para comunicar estado. |
| **Rendimiento percibido** | Animaciones que comuniquen progreso, transiciones que eviten saltos bruscos. Nunca bloquear la interacción con efectos costosos. |

---

## 2. Paleta de Colores

La paleta se inspira en tonos de pergamino, tinta y piedra, con un acento carmesí que aporta energía y toque épico.

### 2.1 Tokens Semánticos

Utilizamos tokens semánticos (CSS Custom Properties) para que el cambio de tema sea automático. Los componentes **nunca** deben usar colores crudos directamente; siempre se referencian a través de las variables `--app-*`.

### 2.2 Tema Claro (Light)

#### Fondos

| Token | Valor | Uso |
|---|---|---|
| `--app-bg` | `#F5F4EF` | Fondo base de la app |
| `--app-bg-alt` | `#EDEDEA` | Fondo alternativo / zones |
| `--app-surface` | `#FFFFFF` | Superficie de cards y paneles |
| `--app-sidebar-bg` | Gradiente vertical `#E8E6DC → #F0EFE8 → #E8E6DC` | — | Fondo del sidebar |
| `--app-header-bg` | `rgba(240, 239, 232, 0.95)` | — | Header con backdrop-blur |
| `--app-input-bg` | `rgba(0, 0, 0, 0.03)` | — | Interior de inputs |

#### Texto

| Token | Valor | Contraste sobre `--app-bg` | Uso |
|---|---|---|---|
| `--app-text` | `#272519` | **14.2:1** ✅ | Texto principal, títulos |
| `--app-text-secondary` | `#555137` | **7.5:1** ✅ | Texto secundario, etiquetas |
| `--app-text-muted` | `#978F62` | **3.8:1** ⚠️ | Texto desactivado, hints (solo texto grande) |
| `--app-text-faint` | `#B2AE96` | **2.5:1** ❌ | Texto puramente decorativo, nunca informativo |

> **⚠️ Nota de contraste:** `--app-text-muted` no alcanza el ratio AA para texto normal (16px). Usarlo únicamente para labels auxiliares de al menos 18px / 14px bold, o acompañado de iconos. `--app-text-faint` no debe contener información esencial.

#### Bordes y Separadores

| Token | Valor | Uso |
|---|---|---|
| `--app-border` | `rgba(212, 209, 189, 0.4)` | Bordes de cards, inputs |
| `--app-border-subtle` | `rgba(212, 209, 189, 0.2)` | Bordes decorativos, divisores suaves |
| `--app-divider` | `rgba(212, 209, 189, 0.35)` | Separadores horizontales |

#### Interacción

| Token | Valor | Uso |
|---|---|---|
| `--app-hover-bg` | `rgba(0, 0, 0, 0.04)` | Hover en elementos interactivos |
| `--app-hover-bg-strong` | `rgba(0, 0, 0, 0.08)` | Hover más evidente (botones ghost) |
| `--app-accent-soft` | `rgba(143, 61, 56, 0.06)` | Fondo tintado para estados activos |

---

### 2.3 Tema Oscuro (Dark)

#### Fondos

| Token | Valor | Uso |
|---|---|---|
| `--app-bg` | `#1A1814` | Fondo base |
| `--app-bg-alt` | `#1D1B13` | Fondo alternativo |
| `--app-surface` | `rgba(40, 38, 27, 0.95)` | — | Superficie de cards |
| `--app-sidebar-bg` | Gradiente vertical `#111010 → #181712 → #111010` | — | Sidebar |
| `--app-header-bg` | `rgba(14, 13, 9, 0.95)` | — | Header |
| `--app-input-bg` | `rgba(255, 255, 255, 0.04)` | — | Interior de inputs |

#### Texto

| Token | Valor | Contraste sobre `--app-bg` | Uso |
|---|---|---|---|
| `--app-text` | `#FFFFFF` | **16.8:1** ✅ | Texto principal |
| `--app-text-secondary` | `#CDC9B2` | **10.5:1** ✅ | Texto secundario |
| `--app-text-muted` | `#AAA37B` | **6.3:1** ✅ | Placeholders, hints |
| `--app-text-faint` | `#807953` | **3.2:1** ⚠️ | Texto decorativo |

#### Bordes y Separadores

| Token | Valor | Uso |
|---|---|---|
| `--app-border` | `rgba(81, 77, 53, 0.35)` | Bordes principales |
| `--app-border-subtle` | `rgba(81, 77, 53, 0.15)` | Bordes decorativos |
| `--app-divider` | `rgba(81, 77, 53, 0.4)` | Separadores |

#### Interacción

| Token | Valor | Uso |
|---|---|---|
| `--app-hover-bg` | `rgba(255, 255, 255, 0.04)` | Hover base |
| `--app-hover-bg-strong` | `rgba(255, 255, 255, 0.08)` | Hover fuerte |
| `--app-accent-soft` | `rgba(143, 61, 56, 0.14)` | Tinte de acento activo |

---

### 2.4 Colores de Acento

Los acentos son agnósticos al tema y se usan con opacidad variable según el contexto.

| Nombre | Valor | Uso |
|---|---|---|
| **Carmesí (primario)** | `#8F3D38` | CTA principal, botones, vínculos activos, glow |
| Carmesí hover | `#A04540` | Estado hover del CTA |
| Carmesí profundo | `#6B2E2A` | Gradientes, avatar |
| **Dorado (secundario)** | `#CDC9B2` | Títulos display en dark, acentos secundarios |
| Dorado muted | `#978F62` | Texto descriptivo en light |

#### Colores Funcionales

| Rol | Light | Dark | Uso |
|---|---|---|---|
| Éxito | `#16A34A` | `#22C55E` | Indicadores de estado, checkmarks |
| Peligro | `#DC2626` | `#EF4444` | Eliminaciones, errores, HP perdido |
| Advertencia | `#D97706` | `#F59E0B` | Alertas, recursos limitados |
| Información | `#2563EB` | `#3B82F6` | Links informativos, tooltips |
| Arcano | `#7C3AED` | `#A855F7` | Magia, hechizos, rasgos sobrenaturales |

> **Regla:** Los colores funcionales deben combinarse siempre con un icono o etiqueta textual. Nunca usar solo color para transmitir significado.

---

## 3. Tipografía

### 3.1 Familias

| Rol | Fuente | Pesos | Fallbacks | Uso |
|---|---|---|---|---|
| **Display** | Cinzel | 400, 500, 600, **700** | Georgia, serif | Títulos heroicos, logo, nombres de secciones principales |
| **Body** | Crimson Text | 400, 600, 700 + itálica | Georgia, serif | Bloques largos de prosa (descripciones de lore, reglas del compendio) |
| **UI / Sans** | Inter | 300–700 | system-ui, sans-serif | Navegación, labels, botones, formularios, datos de fichas |

### 3.2 Escala Tipográfica

Sistema basado en una escala modular de razón **1.25** (Major Third) con base `16px`.

| Nivel | Tamaño | Line-height | Peso | Fuente | Uso |
|---|---|---|---|---|---|
| **Display XL** | 3.25rem (52px) | 1.1 | 700 | Cinzel | Hero title (landing) |
| **Display L** | 2.5rem (40px) | 1.1 | 700 | Cinzel | Sección heroica |
| **H1** | 1.75rem (28px) | 1.25 | 700 | Cinzel | Título de página |
| **H2** | 1.25rem (20px) | 1.3 | 600 | Cinzel | Título de sección |
| **H3** | 1.125rem (18px) | 1.4 | 600 | Inter | Subtítulo, card header |
| **Body L** | 1.125rem (18px) | 1.6 | 400 | Crimson Text | Descripciones largas de compendio |
| **Body** | 1rem (16px) | 1.5 | 400 | Inter | Texto general de interfaz |
| **Body S** | 0.875rem (14px) | 1.5 | 400 | Inter | Texto secundario |
| **Caption** | 0.8125rem (13px) | 1.4 | 500 | Inter | Labels, metadata |
| **Overline** | 0.6875rem (11px) | 1.3 | 600 | Inter | Secciones sidebar, badges |
| **Micro** | 0.5625rem (9px) | 1.3 | 600 | Inter | KBD hints, version labels |

### 3.3 Reglas Tipográficas

- **Antialiasing:** Siempre `antialiased` (`-webkit-font-smoothing: antialiased`).
- **Tracking:** Cinzel usa `tracking-wide` (0.025em) en tamaños medianos. En overlines se amplía a `tracking-[0.2em]`.
- **Mayúsculas:** Solo se usan en overlines (labels de sección) y badges. Nunca en prosa.
- **Itálica:** Reservada exclusivamente para Crimson Text en citas literales, fragmentos de lore y nombres de conjuros dentro de bloques de texto.
- **Longitud de línea:** Máximo `65ch` para prosa de compendio, `80ch` para datos tabulares.
- **Número de fuentes por vista:** Máximo 2 familias simultáneas para evitar carga visual excesiva (típicamente Inter + Cinzel, o Inter + Crimson Text).

---

## 4. Iconografía

### 4.1 Sistema

| Librería | Contexto | Estilo |
|---|---|---|
| **Lucide React** | Componentes React (app interna) | Outline, `stroke-width: 1.5` |
| **Font Awesome 6** | Compendio público (Astro pages) | Solid para categorías, Regular para acciones |
| **SVG inline** | Sidebar, header, controles críticos | Outline, `stroke-width: 2` |

### 4.2 Tamaños

| Contexto | Tamaño | Ejemplo |
|---|---|---|
| Sidebar nav | 18×18px | Iconos de menú |
| Botón inline | 16×16px | Acciones de fila |
| Card decorativo | 14×14px | Indicadores de card |
| Header mobile | 20×20px | Hamburger, search |
| Hero / empty state | 48–64px | Ilustraciones vacías |

### 4.3 Recomendaciones

- **Migrar a una sola librería de iconos.** Actualmente se mezclan Lucide, Font Awesome y SVG inline, lo que genera inconsistencia visual y un bundle innecesariamente pesado. **Recomendación:** estandarizar en **Lucide** para toda la app (React y Astro) y eliminar la dependencia de Font Awesome CDN.
- Los iconos de navegación deben tener un área de toque mínima de **44×44px** (incluyendo padding).
- Color de iconos: heredar del texto padre (`currentColor`). No asignar colores fijos a menos que tengan significado semántico (ej: rojo para eliminar).

---

## 5. Espaciado y Grid

### 5.1 Unidad Base

**4px** (0.25rem). Todo espaciado es múltiplo de 4.

| Token Tailwind | Valor | Uso frecuente |
|---|---|---|
| `0.5` | 2px | Micro-separación (border gap) |
| `1` | 4px | Padding interno mínimo |
| `2` | 8px | Gap entre iconos y texto |
| `3` | 12px | Padding interno de badges |
| `4` | 16px | Padding de cards, gap de grids |
| `5` | 20px | Padding de secciones internas |
| `6` | 24px | Margen entre cards |
| `8` | 32px | Separación de secciones |
| `12` | 48px | Margen entre secciones mayores |
| `16` | 64px | Padding vertical de secciones hero |
| `24` | 96px | Espaciado de secciones de landing |

### 5.2 Grid

| Layout | Columnas | Gap | Max-width | Breakpoint |
|---|---|---|---|---|
| Landing | 1–2 cols | 24–64px | `max-w-6xl` (1152px) | `lg:` (1024px) |
| App (con sidebar) | Sidebar 260px + contenido fluido | — | Sin límite | `lg:` |
| Compendio (docs) | Sidebar 280px + contenido + TOC | 0 (separado por bordes) | Sin límite | `lg:` |
| Cards grid | `auto-fill, minmax(300px, 1fr)` | 16–24px | Contenedor padre | — |
| Ficha de personaje | Responsive multi-col | 16–24px | `max-w-5xl` | `md:`, `lg:` |

### 5.3 Contenedores

```css
/* Landing / marketing */
.container-landing { max-width: 1152px; margin: 0 auto; padding: 0 24px; }

/* App content */
.container-app { padding: 24px 24px 48px; max-width: 100%; }
@media (min-width: 1024px) { .container-app { padding: 32px 40px 48px; } }

/* Compendio content */
.container-docs { max-width: 800px; padding: 32px 24px; }
```

---

## 6. Layouts

### 6.1 Landing Page (`/`)

```
┌─────────────────────────────────────────┐
│ Nav (fixed, transparent → blur on scroll)│
├─────────────────────────────────────────┤
│                                         │
│   HERO (full viewport, background img)  │
│   ┌──────────┐  ┌──────────┐           │
│   │  Texto   │  │  Mockup  │           │
│   └──────────┘  └──────────┘           │
│                                         │
├─────────────────────────────────────────┤
│ Sección Features (grid 3 cols)          │
├─────────────────────────────────────────┤
│ Sección Pricing (cards 2 cols)          │
├─────────────────────────────────────────┤
│ FAQ (accordion)                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

- **Fondo hero:** Imagen de paisaje con overlay oscuro + viñeta radial + glow carmesí sutil.
- **Nav:** Se oscurece con scroll (`backdrop-blur(16px)`).
- **Paleta exclusiva:** Dark-only para la landing. No se aplica tema claro en la página de marketing.

### 6.2 App Layout (`/app/*`)

```
┌──────────┬─────────────────────────────┐
│          │  Header (solo mobile)       │
│ Sidebar  ├─────────────────────────────┤
│  260px   │                             │
│          │  Main content (scrollable)  │
│          │                             │
│          │                             │
│          │                             │
│          │                             │
└──────────┴─────────────────────────────┘
```

- **Sidebar:** Fijo en desktop (`lg:`), drawer overlay en mobile.
- **Main:** `overflow-y: auto` con fondo gradiente `--app-main-gradient`.
- **Header mobile:** 56px de alto, blur `16px`, borde inferior gradiente.
- **Z-index:** Sidebar backdrop `z-30`, sidebar `z-40`, overlays `z-50`, auth screen `z-100`.

### 6.3 Compendio Layout (`/compendio/*`)

```
┌─────────────────────────────────────────┐
│ Header (fixed, pergamino estilo docs)   │
├──────────┬─────────────────────┬────────┤
│          │                     │        │
│ Sidebar  │   Contenido         │  TOC   │
│ Nav 280px│   (prosa + tables)  │ (opt.) │
│          │                     │        │
│          │                     │        │
└──────────┴─────────────────────┴────────┘
```

- **Sidebar:** Colapsable en mobile. Incluye buscador con hotkey `Ctrl+K`.
- **Contenido:** Ancho máximo de prosa `65ch` para legibilidad óptima.
- **TOC:** Visible en pantallas `xl:` como columna derecha sticky.

---

## 7. Componentes

### 7.1 Botones

| Variante | Clase | Aspecto | Uso |
|---|---|---|---|
| **Primary (CTA)** | `.btn-gold` | Gradiente carmesí, texto blanco, sombra carmesí | Acción principal: crear, guardar, confirmar |
| **Ghost** | `.btn-ghost` | Transparente con borde, texto muted | Acciones secundarias: cancelar, volver |
| **Text** | (inline) | Sin fondo ni borde, solo texto coloreado | Links inline, acciones terciarias |

#### Especificaciones del Primary

```
Padding:       12px 24px (py-3 px-6)
Border-radius: 12px (rounded-xl)
Font:          Inter 600, 14px
Background:    linear-gradient(135deg, #8f3d38, #a04540, #8f3d38)
Shadow:        0 2px 8px rgba(143,61,56,0.3)
Hover:         translateY(-2px), shadow ampliada
Active:        translateY(0), shadow reducida
Focus:         outline 2px offset 2px #8f3d38 (accesibilidad)
```

#### Estados

| Estado | Cambio visual |
|---|---|
| Default | Gradiente base |
| Hover | Gradiente iluminado + elevación `-2px` |
| Active/Pressed | Sin elevación, sombra mínima |
| Focus | Ring offset `2px` color `#8f3d38` |
| Disabled | `opacity: 0.5`, `pointer-events: none` |
| Loading | Spinner inline reemplaza texto, mismo ancho |

### 7.2 Cards

| Variante | Clase | Uso |
|---|---|---|
| **Card base** | `.dymes-card` | Contenedor estándar (personajes, campañas) |
| **Section card** | `.dymes-section-card` | Bloques de ficha de personaje |
| **Glass panel** | `.glass-panel` | Overlays con backdrop-blur |
| **Modal card** | `.dymes-modal-card` | Diálogos flotantes |

#### Especificaciones de Card Base

```
Border-radius: 16px (rounded-2xl)
Border:        1px solid var(--app-border)
Background:    var(--app-card-gradient)
Shadow:        var(--app-card-shadow)
Hover:         border brilla, shadow crece, translateY(-1px) en dark
Transition:    all 300ms ease
```

### 7.3 Inputs

| Clase | Uso |
|---|---|
| `.dymes-input` | Input de texto estándar |
| Search trigger | Simulación de input que abre command palette |

```
Border-radius: 12px (rounded-xl)
Padding:       12px 16px
Background:    var(--app-input-bg)
Border:        1px solid var(--app-input-border)
Focus ring:    0 0 0 3px rgba(143,61,56,0.06)
Placeholder:   color --app-text-muted
```

### 7.4 Tabs

```
Clase:          .dymes-tab / .dymes-tab.active
Border-radius:  12px
Padding:        10px 16px
Font:           Inter 500, 14px
Active (light): bg rgba(143,61,56,0.08), border rgba(143,61,56,0.2)
Active (dark):  gradiente carmesí sutil, glow 12px
```

### 7.5 Badges

```
Clase:          .dymes-badge
Border-radius:  full (rounded-full)
Padding:        2px 10px
Font:           Inter 500, 12px
```

Variantes por color funcional: éxito, peligro, arcano, info.

### 7.6 Divisores Ornamentales

```
Clase:          .dymes-divider
Height:         1px
Margin:         24px 0
Background:     gradiente simétrico con toque carmesí al centro
```

### 7.7 Sidebar Navigation Links

```
Clase:          .sidebar-link
Padding:        8px 12px
Border-radius:  12px
Font:           Inter 400, 14px
Icon:           18×18, stroke 1.5
Active:         bg tintado carmesí, texto primario, left-border accent
Hover:          bg var(--app-sidebar-link-hover-bg)
```

### 7.8 Command Palette (⌘K / Ctrl+K)

```
Ancho:          min(560px, 90vw)
Border-radius:  16px
Background:     var(--app-cmd-bg)
Border:         var(--app-cmd-border)
Shadow:         var(--app-cmd-shadow)
Backdrop:       var(--app-overlay-bg) + blur 8px
```

---

## 8. Elevación y Sombras

Sistema de 4 niveles de elevación:

| Nivel | Uso | Shadow (Light) | Shadow (Dark) |
|---|---|---|---|
| **0** | Flat (inputs, badges) | Ninguna | `inset 0 1px 3px rgba(0,0,0,0.2)` |
| **1** | Cards en reposo | `0 2px 12px rgba(0,0,0,0.05)` | `0 2px 12px rgba(0,0,0,0.25)` |
| **2** | Cards hover / paneles | `0 8px 32px rgba(0,0,0,0.1)` | `0 12px 40px rgba(0,0,0,0.4)` |
| **3** | Modales, command palette | `0 25px 60px rgba(0,0,0,0.15)` | `0 25px 60px rgba(0,0,0,0.6)` |

En tema oscuro, se añaden `inset highlights` (`inset 0 1px 0 rgba(255,255,255,0.03-0.05)`) para simular reflexión de luz en los bordes superiores.

---

## 9. Animaciones y Transiciones

### 9.1 Principios

- **Duración base:** 200–300ms para micro-interacciones.
- **Easing default:** `ease-out` para entradas, `ease-in` para salidas.
- **Easing protagonista:** `cubic-bezier(0.16, 1, 0.3, 1)` para slides y scales (spring-like).
- **`prefers-reduced-motion`:** Todas las animaciones deben desactivarse o reducirse.

### 9.2 Catálogo

| Nombre | Duración | Easing | Uso |
|---|---|---|---|
| `fade-in` | 600ms | ease-out | Aparición de secciones |
| `slide-up` | 700ms | cubic-bezier(0.16,1,0.3,1) | Entrada de cards desde abajo |
| `slide-up-sm` | 500ms | cubic-bezier(0.16,1,0.3,1) | Entrada sutil de elementos |
| `slide-in-right` | 300ms | ease-out | Sidebar drawer mobile |
| `scale-in` | 600ms | cubic-bezier(0.16,1,0.3,1) | Modales y diálogos |
| `blur-in` | 800ms | ease-out | Imágenes y hero |
| `pulse-glow` | 3s ∞ | ease-in-out | Indicadores online, CTA hero |
| `float` | 6s ∞ | ease-in-out | Elementos decorativos de fondo |
| `shimmer` | 3s ∞ | ease-in-out | Skeleton loaders |

### 9.3 Transiciones de State

```css
/* Componentes interactivos */
transition: all 300ms ease;        /* Cards, botones */
transition: colors 200ms ease;     /* Links, texto */
transition: opacity 300ms ease;    /* Backdrops */
transition: transform 300ms cubic-bezier(0.16,1,0.3,1); /* Hover lift */
```

---

## 10. Modo Oscuro / Claro

### 10.1 Implementación

- **Método:** Clase `dark` en `<html>` (Tailwind `darkMode: 'class'`).
- **Detección:** Prioridad → `dyd:settings.tema` en localStorage → `dymes-theme` en localStorage → `prefers-color-scheme`.
- **Transición:** `transition-colors duration-200` en `<body>`.

### 10.2 Directrices de Tema

| Propiedad | Light | Dark |
|---|---|---|
| Fondos | Cálidos pergamino (#F5F4EF) | Marrones profundos (#1A1814) |
| Texto | Tintas oscuras (#272519) | Blanco / dorado (#FFF, #CDC9B2) |
| Bordes | Opacos, cálidos | Semi-transparentes, dorados apagados |
| Sombras | Ligeras, transparentes | Profundas + inset highlights |
| Accent glow | 6% opacidad | 14% opacidad |
| Overlays | 40% | 60% |
| Input bg | Dark 3% opacidad | Light 4% opacidad |

### 10.3 Reglas de Diseño para Temas

1. **Nunca invertir colores directamente.** Cada tema tiene su paleta propia, no es una inversión cromática.
2. **Los gradientes cambian de dirección y opacidad**, no solo de tono.
3. **Los inner shadows** (`inset`) se utilizan solo en dark para dar profundidad en superficies.
4. **Backdrop blur** es más agresivo en dark (las capas oscuras necesitan más contraste).
5. **Imágenes/ilustraciones:** En dark se puede añadir un `brightness(0.85)` sutil.

---

## 11. Responsive

### 11.1 Breakpoints

| Nombre | Min-width | Uso |
|---|---|---|
| `sm` | 640px | Ajustes menores de padding y texto |
| `md` | 768px | Grid de 2 columnas, ficha de personaje |
| `lg` | 1024px | Sidebar visible, layout de 3 columnas |
| `xl` | 1280px | TOC del compendio, espaciado ampliado |
| `2xl` | 1536px | Max-width generoso |

### 11.2 Patrones Mobile-First

| Componente | Mobile | Desktop |
|---|---|---|
| **Sidebar App** | Drawer overlay (z-40) | Fixed 260px left |
| **Sidebar Compendio** | Drawer overlay | Fixed 280px left |
| **Header App** | Visible (56px) con hamburger menu | Oculto (navegación en sidebar) |
| **Cards grid** | 1 columna, full width | `auto-fill, minmax(300px, 1fr)` |
| **Hero** | 1 columna, centrado, sin mockup phone | 2 columnas con mockup |
| **Command Palette** | `90vw` | `min(560px, 90vw)` |
| **Ficha personaje** | Stack vertical | Multi-column layout |

### 11.3 Touch Targets

- Mínimo **44×44px** para todos los elementos interactivos en mobile.
- Los links del sidebar tienen padding suficiente (`py-2 px-3`).
- Los botones de header mobile usan `p-2` con ícono de 20px = 36px total → **ampliar a `p-2.5` para cumplir 44px**.

---

## 12. Accesibilidad

### 12.1 Contraste

- **Texto normal (< 18px):** Ratio mínimo **4.5:1** (WCAG AA).
- **Texto grande (≥ 18px o ≥ 14px bold):** Ratio mínimo **3:1**.
- **Elementos UI (bordes, iconos interactivos):** Ratio mínimo **3:1**.

### 12.2 Focus

- Todos los elementos interactivos deben tener un **focus ring** visible.
- Estilo recomendado: `outline: 2px solid #8F3D38; outline-offset: 2px;`
- En dark mode: `outline: 2px solid #CDC9B2; outline-offset: 2px;`
- **Nunca** usar `outline: none` sin proporcionar un estilo alternativo.

### 12.3 Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 12.4 Semántica

- Usar `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>` correctamente.
- Todo botón no textual necesita `aria-label`.
- Los iconos decorativos llevan `aria-hidden="true"`.
- Los modales deben "atrapar" el foco y cerrarse con `Escape`.

### 12.5 Lectura de Pantalla

- Las secciones del sidebar usan `<span>` con rol visual de encabezado. **Mejorar:** convertirlas a `<h2>` o usar `role="heading" aria-level="2"`.
- Los breadcrumbs del compendio deben usar `<nav aria-label="Breadcrumb">`.
- La ruta activa del sidebar debe marcarse con `aria-current="page"`.

---

## 13. Recomendaciones y Mejoras

Áreas identificadas para mejorar la consistencia y calidad del sistema de diseño actual:

### 13.1 Tokens y Variables

| Problema | Recomendación |
|---|---|
| Hay colores hardcodeados en componentes (ej: `text-[#555137]`, `bg-[#8f3d38]`) que duplican tokens ya definidos como variables CSS. | **Eliminar todos los valores inline** y usar exclusivamente custom properties o clases de Tailwind mapeadas a los tokens. Esto hará que el theming sea realmente centralizado. |
| Se mantienen dos sistemas paralelos: `--app-*` CSS variables y `dymes.*` / `dymes_light.*` en Tailwind config. | **Unificar en un solo sistema.** Recomendación: usar solo CSS custom properties y referenciarlas desde Tailwind con `theme.extend.colors` usando `var(--app-*)`. |

### 13.2 Tipografía

| Problema | Recomendación |
|---|---|
| Crimson Text se carga pero apenas se usa en los componentes actuales. | Utilizar Crimson Text activamente en el compendio (bloques de prosa, descripciones de reglas). Si no se va a usar, eliminar la carga para ahorrar ~80KB de fonts. |
| No hay clases utilitarias para las combinaciones tipográficas frecuentes. | Crear clases `@apply` como `.text-heading`, `.text-body-prose`, `.text-label`, `.text-overline` para estandarizar. |

### 13.3 Iconografía

| Problema | Recomendación |
|---|---|
| Se usan 3 fuentes de iconos diferentes (Lucide, FA6, SVG inline). | Migrar todo a **Lucide** (ya es dependencia). Eliminar Font Awesome CDN para reducir ~300KB de carga y unificar el estilo visual. |
| Los SVG inline tienen `stroke-width` variable (1.5 vs 2). | Estandarizar a `stroke-width: 1.5` para iconos ≥ 18px y `stroke-width: 2` para iconos ≤ 16px. |

### 13.4 Componentes

| Problema | Recomendación |
|---|---|
| No hay estado focus visible en la mayoría de botones y links. | Añadir un focus ring global coherente. Utilizar `focus-visible` para no molestar a usuarios de ratón. |
| Los sidebar links usan `onmouseover`/`onmouseout` inline para hover. | Reemplazar por clases CSS puras (ya hay `.sidebar-link` definido). Eliminar JS inline para mejor mantenibilidad. |
| No hay skeleton/loading states definidos para cards. | Diseñar componentes skeleton usando la animación `shimmer` ya definida. Esto mejora el perceived performance en cargas de listas. |
| El loading screen de autenticación usa estilos inline. | Migrar a clases CSS definidas en el sistema. |

### 13.5 Spacing y Layout

| Problema | Recomendación |
|---|---|
| El contenido del compendio no tiene `max-width` de prosa controlado. | Aplicar `max-width: 65ch` a los contenedores de texto corrido para mantener la legibilidad óptima. |
| Los touch targets de algunos botones mobile no alcanzan 44px. | Auditar y ampliar padding de botones de header, iconos de sidebar y controles de formulario. |

### 13.6 Performance

| Problema | Recomendación |
|---|---|
| Google Fonts se carga desde CDN externo. | Considerar **self-hosting** con `@fontsource/inter`, `@fontsource/cinzel` para eliminar el retraso de DNS lookup + request externo. Preconectar con `<link rel="preconnect">` mientras tanto. |
| Font Awesome se carga completa desde CDN (~300KB). | Eliminar en favor de Lucide (tree-shakeable, solo se importan los iconos usados). |
| Múltiples `backdrop-filter: blur()` simultáneos en mobile (sidebar backdrop + header). | Limitar a un solo blur activo por pantalla. Usar fondos opacos como fallback en dispositivos de gama baja. |

### 13.7 Theming Avanzado (Futuro)

| Mejora | Descripción |
|---|---|
| **Temas contextuales por clase** | Ofrecer variantes de tema (ej: "Mazmorra", "Bosque", "Arcano") que cambien el accent color y los gradientes decorativos sin alterar la estructura. |
| **Tokens en JSON / Design Tokens** | Exportar los tokens a formato W3C Design Tokens para sincronizar con Figma y la app Android. |
| **CSS Container Queries** | Reemplazar algunos breakpoints por container queries para componentes más agnósticos al layout. |

---

## Apéndice A — Referencia Rápida de Variables CSS

```css
/* Copiar en cualquier componente para referencia */

/* Fondos */
var(--app-bg)
var(--app-bg-alt)
var(--app-surface)
var(--app-surface-gradient)
var(--app-card-gradient)
var(--app-main-gradient)
var(--app-sidebar-bg)
var(--app-header-bg)
var(--app-input-bg)
var(--app-banner-bg)

/* Texto */
var(--app-text)
var(--app-text-secondary)
var(--app-text-muted)
var(--app-text-faint)

/* Bordes */
var(--app-border)
var(--app-border-subtle)
var(--app-divider)

/* Interacción */
var(--app-hover-bg)
var(--app-hover-bg-strong)
var(--app-accent-soft)
var(--app-accent-glow)

/* Sombras */
var(--app-card-shadow)
var(--app-card-shadow-hover)
var(--app-card-inset)

/* Overlay */
var(--app-overlay-bg)
var(--app-cmd-bg)
var(--app-cmd-border)
var(--app-cmd-shadow)

/* Sidebar */
var(--app-sidebar-link-color)
var(--app-sidebar-link-hover-bg)
var(--app-sidebar-link-hover-color)
var(--app-sidebar-border)
var(--app-sidebar-search-bg)
var(--app-sidebar-search-border)
var(--app-sidebar-section-label)

/* Loading */
var(--app-loading-bg)
var(--app-loading-text)
var(--app-loading-bar-track)
```

---

## Apéndice B — Mapa de Clases CSS del Sistema

| Clase | Tipo | Descripción |
|---|---|---|
| `.btn-gold` | Botón | CTA primario carmesí |
| `.btn-ghost` | Botón | Botón secundario transparente |
| `.dymes-card` | Card | Card base con hover |
| `.dymes-section-card` | Card | Sección de ficha de personaje |
| `.glass-panel` | Panel | Superficie con backdrop-blur |
| `.dymes-modal-overlay` | Modal | Contenedor de overlay |
| `.dymes-modal-backdrop` | Modal | Fondo oscurecido blur |
| `.dymes-modal-card` | Modal | Card del diálogo |
| `.dymes-input` | Input | Campo de texto |
| `.dymes-tab` | Tab | Pestaña de navegación |
| `.dymes-badge` | Badge | Etiqueta |
| `.dymes-divider` | Divider | Separador ornamental |
| `.dymes-stat-pill` | Stats | Celda de estadística |
| `.nav-link` | Nav | Link de navegación top |
| `.sidebar-link` | Nav | Link de sidebar |
| `.section-title` | Texto | Título de sección con color temático |
| `.text-gradient-gold` | Texto | Texto dorado degradado |
| `.text-gradient-red` | Texto | Texto carmesí degradado |
| `.app-text` | Utility | Color de texto primario temático |
| `.app-text-secondary` | Utility | Color de texto secundario temático |
| `.app-text-muted` | Utility | Color de texto silenciado temático |
| `.app-text-faint` | Utility | Color de texto decorativo temático |
| `.glow-border` | Efecto | Borde con glow en hover |

---

*Documento mantenido por el equipo de diseño de DyMEs. Para propuestas de cambio, abrir un issue con la etiqueta `design-system`.*
