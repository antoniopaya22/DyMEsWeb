# Landing Page — Mejoras de Interfaz Gráfica

Lista de mejoras recomendadas para llevar la página de inicio (`/`) a un nivel profesional: rendimiento, responsive, accesibilidad, conversión y polish visual.

---

## 1. Rendimiento y Core Web Vitals

- [ ] **LCP — Imagen hero**: `landscape.png` es la imagen más grande visible (LCP). Convertir a formato WebP/AVIF con `<picture>` y `srcset` para servir resoluciones óptimas según viewport. Añadir `fetchpriority="high"` y `loading="eager"`.
- [ ] **CLS — Reservar espacio del mockup**: el mockup de teléfono (260×520px) puede causar layout shift al cargar. Usar `aspect-ratio` o `width`/`height` explícitos en el contenedor para reservar espacio.
- [ ] **INP — Reducir JS en scroll**: el listener de scroll para el nav (`updateNav`) y la animación del arrow (`floatArrow`) corren en cada frame. Usar `requestAnimationFrame` throttling para el nav y `CSS @keyframes` para la flecha en lugar de JS.
- [ ] **Preload de fuentes**: las fuentes Cinzel, Crimson Text e Inter se cargan desde Google Fonts con `@import`. Migrar a `<link rel="preload" as="font">` o self-hosting para evitar el flash of unstyled text (FOUT).
- [ ] **FontAwesome innecesario**: la landing no usa FontAwesome pero lo carga desde el CDN vía Layout.astro. Cargar FA solo en las páginas que lo necesitan (compendio, app) o hacer code-splitting del CSS.
- [ ] **Eliminar animación JS de la flecha**: reemplazar `floatArrow()` (requestAnimationFrame infinito) con una animación CSS pura:
  ```css
  @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(5px) } }
  #scroll-arrow { animation: float 4s ease-in-out infinite; }
  ```

## 2. Responsive Design

- [ ] **Hero en móvil**: el grid `lg:grid-cols-2` hace que el mockup quede debajo del texto en móvil, resultando en mucho scroll antes de ver el contenido principal. Considerar ocultar o reducir el mockup en pantallas `<768px` y dar más protagonismo al CTA.
- [ ] **Tipografía fluida**: los tamaños de texto del hero (`text-[2.5rem] sm:text-5xl lg:text-[3.25rem]`) saltan entre breakpoints. Usar `clamp()` para transiciones suaves: `font-size: clamp(2rem, 5vw, 3.25rem)`.
- [ ] **Botones CTA en móvil**: los dos botones del hero ocupan `w-full` en móvil pero podrían beneficiarse de un orden visual invertido (primary arriba, secondary abajo) y mayor padding táctil.
- [ ] **Bento grid en tablets**: el grid de features usa `md:grid-cols-6` que puede crear cards demasiado estrechas en tablets (768–1024px). Considerar `md:grid-cols-4` como paso intermedio.
- [ ] **Footer en móvil**: los links del footer usan `flex-wrap` pero carecen de jerarquía visual. Agruparlos en columnas con headings (`Producto`, `Legal`, `Comunidad`) para mejor navegabilidad.
- [ ] **Menú móvil — altura máxima**: el menú móvil no tiene `max-height` ni overflow. En pantallas muy cortas podría cortarse. Añadir `max-h-[calc(100vh-4rem)] overflow-y-auto`.

## 3. Accesibilidad (WCAG 2.1 AA)

- [ ] **Skip-to-content**: añadir un enlace oculto `<a href="#main-content" class="sr-only focus:not-sr-only">Saltar al contenido</a>` al inicio del `<body>` para saltar la navegación con teclado.
- [ ] **Nav landmark**: el `<nav>` necesita `aria-label="Navegación principal"` para diferenciarlo de otros landmarks.
- [ ] **Botón hamburguesa**: el botón `#mobile-btn` tiene `aria-label="Menú"` (bien), pero falta `aria-expanded="false"` que se sincronice con el estado del menú y `aria-controls="mobile-menu"`.
- [ ] **Imagen hero alt text**: `landscape.png` tiene `alt=""` (decorativa, correcto), pero la imagen del favicon en el mockup y header también deberían tener alt descriptivo o `aria-hidden="true"`.
- [ ] **Contraste de texto**: verificar los textos sobre la imagen hero — `#CDC9B2` sobre fondo semi-transparente oscuro puede no cumplir el ratio 4.5:1 en todas las zonas de la imagen. Considerar un overlay más consistente o text-shadow.
- [ ] **Focus visible**: los enlaces del nav, botones CTA, FAQ items y cards de pricing necesitan estilos `:focus-visible` con outline de alto contraste. Actualmente dependen del estilo por defecto del navegador.
- [ ] **FAQ `<details>` — accesibilidad**: los `<details>` son nativamente accesibles, pero el ícono chevron rota con CSS pero no tiene `aria-hidden="true"` — los lectores de pantalla podrían leer el SVG.
- [ ] **Smooth scroll y `prefers-reduced-motion`**: el JS de smooth scroll ignora `prefers-reduced-motion`. Saltar la animación si el usuario prefiere movimiento reducido:
  ```js
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollIntoView({ behavior: 'auto' });
    return;
  }
  ```
- [ ] **Reveal animations y `prefers-reduced-motion`**: existe una regla CSS para `prefers-reduced-motion` que anula animaciones (bien), pero los elementos `.reveal` empiezan con `opacity: 0` — si JS no ejecuta o IntersectionObserver no es soportado, el contenido queda invisible. Añadir fallback `<noscript>` o mover el estado inicial a JS.
- [ ] **Sección de precios — heading hierarchy**: la sección pricing tiene `<h3>` dentro sin un `<h2>` visible directo en el mismo contenedor (el h2 está arriba). La jerarquía de headings es correcta pero podría ser más clara semánticamente.

## 4. Conversión y UX

- [ ] **Above the fold**: en desktop el hero muestra solo el texto + mockup. El CTA "Crear cuenta gratis" está bien posicionado, pero el texto de propuesta de valor podría ser más directo. Considerar A/B test con variantes como "Crea tu primer personaje en 2 minutos" vs. el actual.
- [ ] **Social proof**: falta prueba social (número de usuarios, testimonios, rating de Google Play). Añadir una fila debajo del hero o antes del pricing con métricas tipo "500+ personajes creados" o rating de la app.
- [ ] **Precio anclaje**: la sección de pricing muestra "5€/año" pero no enfatiza suficiente el ahorro vs. alternativas. Añadir una comparación visual ("Menos que un café") o el descuento equivalente mensual de forma más prominente.
- [ ] **CTA final**: el banner final CTA repite los mismos botones del hero. Considerar variar el copy ("Únete a 500+ aventureros") o añadir un tercer CTA (ej. "Ver compendio sin registro").
- [ ] **Loading state del mockup**: si `landscape.png` tarda en cargar, el hero se ve roto. Añadir un `background-color` de respaldo al contenedor que simule el tono medio de la imagen.
- [ ] **Exit-intent o scroll CTA**: considerar un sticky bottom bar en móvil con el CTA principal que aparezca tras scrollear el hero fuera de vista y desaparezca al llegar al CTA final.

## 5. Diseño Visual y Consistencia

- [ ] **Transición hero → features**: el degradado bridge (`h-32 sm:h-40`) de oscuro a claro es funcional pero algo abrupto. Considerar una transición más larga (h-48) o una forma orgánica (wave SVG, diagonal clip-path).
- [ ] **Colores hardcodeados**: la landing usa ~15 colores hardcodeados en Tailwind classes. Migrar a CSS custom properties del sistema de diseño existente (`--app-text`, `--app-surface`, etc.) para consistencia con el resto de la app.
- [ ] **Sombras inconsistentes**: hay varios niveles de sombra (`shadow-lg`, `shadow-2xl`, boxShadow inline) sin una escala definida. Definir 3 niveles de elevación y reutilizarlos.
- [ ] **Background pattern del CTA**: el SVG inline como `background-image` es complejo y pesado. Considerar un patrón CSS puro o una imagen SVG optimizada en `/public`.
- [ ] **Phone mockup — escalado**: el mockup tiene un tamaño fijo (`w-[260px] h-[520px]`). En pantallas grandes se ve algo pequeño y en pantallas intermedias puede ser demasiado grande. Usar unidades relativas o `clamp()`.
- [ ] **Emojis en el mockup**: los character cards del mockup aún usan emojis (⚔️, ✨, 🏹, 🛡️). Reemplazarlos con FontAwesome o iconos SVG inline para consistencia con el sistema de iconos del proyecto.
- [ ] **Copyright año**: el footer muestra "© 2025" hardcodeado. Sería bueno actualizarlo dinámicamente o poner "© 2025–2026".

## 6. SEO y Metadatos

- [ ] **Open Graph tags**: falta `og:title`, `og:description`, `og:image`, `og:type`, `og:url` y `twitter:card`. Esencial para que la landing se comparta correctamente en redes sociales.
- [ ] **JSON-LD**: añadir `@type: WebApplication` o `@type: SoftwareApplication` con datos estructurados (nombre, descripción, plataforma, precio, rating).
- [ ] **Canonical URL**: añadir `<link rel="canonical" href="https://dymes.app/">` (o el dominio correspondiente).
- [ ] **Hreflang**: si hay planes de localización futura, preparar la etiqueta `<link rel="alternate" hreflang="es">`.
- [ ] **Title tag**: "DyMEs — D&D 5e en Español" es correcto pero podría incluir más keywords: "DyMEs — Gestor de Personajes D&D 5e en Español | SRD 5.1".

## 7. Animaciones y Microinteracciones

- [ ] **Reveal stagger mejorado**: las animations de reveal usan `data-delay` con incrementos manuales. Implementar un sistema de stagger automático basado en el índice del elemento, para no tener que definir delays manualmente.
- [ ] **Hover de feature cards**: las cards se elevan con `translateY(-3px)` en hover, lo cual es sutil. Añadir un brillo o shimmer en el borde para un efecto más premium.
- [ ] **FAQ accordion**: el `<details>` se abre/cierra sin transición en el contenido. Añadir una transición de altura con `grid-template-rows: 0fr → 1fr` para una animación suave.
- [ ] **Parallax suave en el hero**: considerar un efecto parallax ligero (3-5%) en `landscape.png` al hacer scroll, usando `transform: translateY()` con `will-change: transform` para rendimiento GPU.
- [ ] **Botones CTA — feedback táctil**: añadir `active:scale-95` en los botones para feedback instantáneo en móvil.
- [ ] **View Transitions**: usar la API de View Transitions de Astro para transiciones suaves al navegar desde la landing a `/login` o `/compendio`.

## 8. Estructura y Código

- [ ] **Extraer componentes**: el archivo tiene 636 líneas. Extraer secciones a componentes Astro reutilizables: `HeroSection.astro`, `FeaturesGrid.astro`, `PricingSection.astro`, `FaqSection.astro`, `CtaBanner.astro`, `Footer.astro`.
- [ ] **Inline styles → Tailwind/CSS**: hay muchos `style="..."` inline (gradientes, backgrounds, box-shadows). Migrarlos a clases Tailwind custom (`@apply`) o utility classes del config de Tailwind.
- [ ] **SVGs repetidos**: el ícono de checkmark (✓) se repite 11 veces inline en la sección de pricing. Extraerlo a un componente `CheckIcon.astro` o usar un `<symbol>` + `<use>`.
- [ ] **Script modular**: el `<script>` final contiene toda la lógica (menú, nav, scroll, reveal, arrow). Dividir en módulos ES (`nav.ts`, `reveal.ts`, `smooth-scroll.ts`) para mejor mantenibilidad.
- [ ] **TypeScript tipado**: la función `easeInOutCubic` está tipada pero el resto del script no. Tipar completamente los event handlers y selectores DOM.

## 9. Internacionalización

- [ ] **Textos extraíbles**: todos los textos están hardcodeados en español. Para futura i18n, extraerlos a un archivo de traducciones (`i18n/es.json` o similar).
- [ ] **Atributo `lang`**: el `<html lang="es">` es correcto. Si se añaden enlaces o contenido en otros idiomas, usar `lang` en elementos individuales.

## 10. Testing y QA

- [ ] **Lighthouse audit**: ejecutar Lighthouse en la landing y corregir issues de Performance, Accessibility, Best Practices y SEO hasta score 90+ en las 4 categorías.
- [ ] **Cross-browser**: verificar en Safari (iOS y macOS), Firefox y navegadores basados en Chromium. El `backdrop-filter` del nav puede no funcionar igual en todos los browsers antiguos.
- [ ] **Tamaño de pantalla extremo**: probar en pantallas muy anchas (>1920px) — el contenido se centra con `max-w-5xl` pero los backgrounds pueden verse truncados. En pantallas muy estrechas (<320px) verificar que no hay overflow horizontal.
- [ ] **Slow network**: probar con throttling 3G lento. Si `landscape.png` no carga, la landing se ve como una pantalla negra. Añadir `background-color: #1a1814` al contenedor hero como fallback.

---

## Priorización Recomendada

| Prioridad | Área | Impacto |
|-----------|------|---------|
| 🔴 Alta | LCP/CLS (hero image, mockup space) | Core Web Vitals, SEO ranking |
| 🔴 Alta | Accesibilidad (skip-link, focus, aria) | Cumplimiento legal, usabilidad |
| 🔴 Alta | Open Graph + JSON-LD | Compartibilidad en redes sociales |
| 🟡 Media | Responsive (hero móvil, bento tablets) | 60%+ del tráfico es móvil |
| 🟡 Media | Conversión (social proof, CTA copy) | Tasa de registro |
| 🟡 Media | FontAwesome innecesario en landing | ~60KB CSS innecesarios |
| 🟡 Media | Extraer componentes Astro | Mantenibilidad |
| 🟢 Baja | Parallax, view transitions, shimmer | Polish visual |
| 🟢 Baja | FAQ accordion animation | Nice-to-have |
| 🟢 Baja | Internacionalización | Futuro |
