# Compendio — Mejoras de Interfaz Gráfica

Lista de mejoras recomendadas para llevar la sección `/compendio` a un nivel profesional: diseño consistente, responsive, accesible y moderno.

---

## 1. Tipografía y Jerarquía Visual

- [ ] **Sistema tipográfico escalable**: definir una escala tipográfica con `clamp()` para que los títulos, subtítulos y cuerpo de texto se adapten fluidamente entre móvil y escritorio (ej. `clamp(1.25rem, 2.5vw, 1.75rem)` para h2).
- [ ] **Line-height y spacing consistente**: normalizar `line-height` (1.5–1.7 para cuerpo, 1.2–1.3 para títulos) y usar una escala de espaciado basada en múltiplos de 4px o 8px en todo el compendio.
- [ ] **Contraste de texto**: asegurar que todos los textos superen el ratio WCAG AA (4.5:1 para texto normal, 3:1 para texto grande). Revisar especialmente los textos en `#978F62` y `#807953` sobre fondos claros.

## 2. Sistema de Iconos

- [x] **FontAwesome en lugar de emojis**: reemplazar todos los emojis por iconos FontAwesome para un estilo visual consistente, escalable y accesible en todos los navegadores y SO.
- [ ] **Tamaño y alineación**: normalizar el tamaño de todos los iconos FA con clases de tamaño consistentes (`fa-sm`, `fa-lg`, `fa-xl`) y asegurar alineación vertical con `vertical-align: middle`.
- [ ] **Iconos con `aria-hidden`**: añadir `aria-hidden="true"` a todos los `<i>` decorativos y `role="img" aria-label="..."` a los que transmiten significado.

## 3. Responsive Design

- [ ] **Sidebar colapsable mejorado**: el sidebar debería usar una transición suave con `transform: translateX()` en lugar de `display: none/block`. Añadir overlay (backdrop semi-transparente) en móvil al abrir el sidebar.
- [ ] **Tablas responsivas**: las tablas de progresión de clase y espacios de conjuro necesitan scroll horizontal con indicador visual (sombra degradada en los bordes) para no desbordar en móvil.
- [ ] **Grids adaptativos**: revisar los grids de cards (razas, clases, condiciones, etc.) para que usen `auto-fill` / `auto-fit` con `minmax()` en lugar de breakpoints fijos, logrando transiciones más fluidas.
- [ ] **Touch targets**: asegurar que todos los elementos interactivos (botones, enlaces, tags de filtro) tengan un tamaño mínimo de 44×44px según las directrices de Apple y WCAG 2.5.5.
- [ ] **Menú de búsqueda en móvil**: el modal de búsqueda (`Ctrl+K`) debería ocupar pantalla completa en dispositivos pequeños (`max-width: 640px`) con input más grande.

## 4. Accesibilidad (WCAG 2.1 AA)

- [ ] **Navegación por teclado**: asegurar que el sidebar, las cards expandibles (`<details>`), los filtros de conjuros y el modal de búsqueda sean completamente navegables con Tab/Shift+Tab/Enter/Escape.
- [ ] **Focus visible**: añadir estilos `:focus-visible` con outline de alto contraste en todos los elementos interactivos. Actualmente muchos botones y enlaces carecen de indicador de foco.
- [ ] **Skip-to-content**: añadir un enlace "Saltar al contenido" oculto visualmente que aparezca al recibir foco, para evitar tener que tabular por todo el sidebar.
- [ ] **ARIA landmarks**: asegurar que el sidebar tenga `role="navigation" aria-label="Navegación del compendio"`, el contenido principal `role="main"`, y el buscador `role="search"`.
- [ ] **aria-expanded**: los `<details>` de condiciones y conjuros deberían tener `aria-expanded` sincronizado. Los `<summary>` no necesitan `role="button"` (lo tienen implícito), pero sí necesitan `aria-label` descriptivo si el texto no es suficiente.
- [ ] **Anuncios en vivo**: añadir `aria-live="polite"` al contador de resultados del filtro de conjuros para que los lectores de pantalla anuncien cambios.
- [ ] **Orden del DOM**: verificar que el orden visual coincide con el orden del DOM para una experiencia coherente con lectores de pantalla.

## 5. Rendimiento

- [ ] **FontAwesome autoalojado**: migrar de CDN a una instalación local (npm `@fortawesome/fontawesome-free`) para control de caché, subresource integrity más fiable y menor latencia.
- [ ] **Tree-shaking de iconos**: importar solo los iconos usados en lugar de toda la librería. FontAwesome ofrece paquetes individuales (`@fortawesome/free-solid-svg-icons`) con tree-shaking.
- [ ] **Lazy loading del sidebar de búsqueda**: el dataset de búsqueda (con todas las entidades) se carga en el HTML inicial. Considerar cargarlo dinámicamente al abrir el modal.
- [ ] **Optimización de SSG**: dado que todo el compendio es contenido estático, verificar que todas las páginas se pre-renderizan correctamente con `output: 'static'` y no hacen fetches en el cliente.

## 6. Diseño Visual y Consistencia

- [ ] **Tokens de diseño**: extraer los colores repetidos (`#8F3D38`, `#272519`, `#978F62`, `#D4D1BD`, etc.) a variables CSS custom properties en `:root` para facilitar tematización y mantenimiento.
- [ ] **Dark mode / Theme toggle**: el compendio usa un esquema claro de pergamino. Considerar añadir un modo oscuro alternativo con variables CSS, ya que la app principal (`/app`) usa un tema oscuro — esto crea una desconexión visual.
- [ ] **Animaciones sutiles**: añadir `transition` a los hover de las cards (ya existe parcialmente) y micro-animaciones al expandir/colapsar `<details>` (actualmente es un salto abrupto). Usar `@starting-style` o JS para animar la apertura de `<details>`.
- [ ] **Consistencia de bordes y sombras**: normalizar los `border-radius` (actualmente hay una mezcla de `8px`, `10px`, `12px`, `16px`) y el estilo de sombras a 2-3 niveles de elevación.
- [ ] **Breadcrumbs mejorados**: los breadcrumbs actuales son funcionales pero podrían tener separadores SVG (`>` / chevron) y mejor feedback visual del nivel actual.

## 7. Búsqueda

- [ ] **Fuzzy search**: implementar búsqueda difusa (ej. `fuse.js`) para tolerar errores tipográficos y acentos. Actualmente la búsqueda es por coincidencia exacta de substring.
- [ ] **Búsqueda por categoría**: añadir filtro por categoría en el modal de búsqueda (Razas / Clases / Trasfondos / Conjuros / Reglas) para refinar resultados.
- [ ] **Historial de búsqueda**: guardar las últimas 5 búsquedas en `localStorage` y mostrarlas como sugerencias al abrir el modal.
- [ ] **Atajos de teclado**: documentar visualmente que `Ctrl+K` / `Cmd+K` abre la búsqueda. Añadir badge en la barra de búsqueda con el atajo.

## 8. Navegación y UX

- [ ] **Scroll-to-top**: añadir un botón flotante de "volver arriba" que aparezca tras hacer scroll, especialmente útil en reglas/index y conjuros (páginas muy largas).
- [ ] **Progress indicator**: en páginas largas como conjuros o la hoja de clase, añadir un indicador de progreso de lectura (barra fina en la parte superior).
- [ ] **Sidebar activo mejorado**: el item activo del sidebar debería tener un indicador visual más prominente (barra lateral colored, no solo diferencia de color de fondo).
- [ ] **Tabla de contenidos flotante**: en páginas de detalle de clase (que son muy largas con spell slots, rasgos, subclases), añadir un TOC sticky en la derecha para pantallas grandes.
- [ ] **Transiciones entre páginas**: usar View Transitions API de Astro (`transition:animate`) para transiciones suaves entre páginas del compendio.

## 9. Contenido y Datos

- [ ] **Eliminar duplicación Compendium.tsx ↔ data/**: el componente React `Compendium.tsx` tiene copias inline de los datos de razas, clases y trasfondos. Debería importar directamente de `src/data/` para mantener una única fuente de verdad.
- [ ] **Tipos de dato unificados**: el tipo `SrdEntry` en Compendium.tsx y los tipos en `data/` son ligeramente diferentes. Unificarlos en `src/types/`.
- [ ] **i18n-ready**: preparar los textos estáticos del layout y la navegación para futura internacionalización extrayéndolos a un archivo de traducciones.

## 10. SEO y Metadatos

- [ ] **Meta tags Open Graph**: cada página del compendio debería tener `og:title`, `og:description`, `og:image`, y `og:type` para compartir en redes sociales.
- [ ] **JSON-LD**: añadir datos estructurados (`@type: Article` o `@type: WebPage`) para las páginas de contenido del compendio.
- [ ] **Canonical URLs**: asegurar que cada página tiene un `<link rel="canonical">` correcto.
- [ ] **Sitemap**: verificar que todas las páginas generadas estáticamente (razas, clases, trasfondos, subclases, conjuros, reglas) están incluidas en el sitemap.

---

## Priorización Recomendada

| Prioridad | Área | Impacto |
|-----------|------|---------|
| 🔴 Alta | Accesibilidad (focus, landmarks, skip-link) | Cumplimiento legal y ético |
| 🔴 Alta | Responsive (tablas, touch targets, sidebar) | 60%+ del tráfico web es móvil |
| 🟡 Media | Tokens de diseño y consistencia | Mantenibilidad y escalabilidad |
| 🟡 Media | Eliminación de duplicación de datos | Reducción de bugs y mantenimiento |
| 🟡 Media | Búsqueda fuzzy y filtros | UX significativamente mejorada |
| 🟢 Baja | SEO y metadatos | Visibilidad en buscadores |
| 🟢 Baja | Animaciones y transiciones | Polish visual |
| 🟢 Baja | Dark mode | Nice-to-have |
