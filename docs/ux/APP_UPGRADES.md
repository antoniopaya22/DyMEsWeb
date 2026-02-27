# App Section — Mejoras de Interfaz Gráfica

Lista de mejoras recomendadas para toda la sección de la aplicación (`/app/*`): el shell compartido (AppLayout), la paleta de comandos, y cada página individual (personajes, campañas, ajustes, cuenta, creación de personaje, hoja de personaje).

---

## 1. AppLayout — Shell Compartido

### 1.1 Accesibilidad (WCAG 2.1 AA)

- [ ] **Sidebar landmark**: el `<aside>` del sidebar carece de `aria-label="Navegación principal"` para identificarlo en lectores de pantalla.
- [ ] **Mobile drawer — ARIA**: el drawer móvil no tiene `role="dialog"`, `aria-modal="true"`, ni `aria-label="Menú de navegación"`. Al abrirse, el foco no se atrapa dentro del drawer (focus trap).
- [ ] **Botón hamburguesa — `aria-expanded`**: el `#mobile-menu-btn` tiene `aria-label` pero falta `aria-expanded="false"` que se sincronice con el estado del drawer, y `aria-controls="sidebar"`.
- [ ] **Command palette — ARIA**: la paleta de comandos no tiene `role="dialog"` / `role="combobox"` con `aria-autocomplete="list"`. El input no tiene `aria-controls` apuntando a los resultados, ni los items tienen `role="option"`.
- [ ] **Command palette — focus trap**: al abrir la paleta, el foco va al input (correcto), pero al cerrarla no vuelve al elemento que la activó. Implementar restore-focus.
- [ ] **Skip-to-content**: falta un enlace `<a href="#main-content" class="sr-only focus:not-sr-only">Saltar al contenido</a>` al inicio del shell para saltar la navegación con teclado.
- [ ] **Loading screen accesible**: la pantalla de "Verificando sesión" no tiene `role="status"` ni `aria-live="polite"`. Un usuario de screen reader no sabe que la app está cargando.

### 1.2 Emojis → FontAwesome/SVG

- [ ] **CMD_ITEMS emojis**: el array `CMD_ITEMS` en el `<script>` usa emojis (⚔️, 📖, 📚, ⚙️, 👤, ➕, 🌐). Reemplazarlos con SVG inline o clases FontAwesome para consistencia con el resto del sidebar que ya usa SVGs de Lucide.
- [ ] **Sidebar link "Compendio público"**: el enlace externo al compendio en el sidebar usa un SVG de Lucide (correcto), mantener consistencia.

### 1.3 Inline Event Handlers

- [ ] **`onmouseover`/`onmouseout` inline**: el sidebar user info, mobile search button y mobile avatar link usan `onmouseover="this.style.background=..."`. Migrar a CSS `:hover` o clases Tailwind `hover:bg-[...]` para mejor mantenibilidad y CSP compliance.

### 1.4 Rendimiento

- [ ] **Auth guard — FOUC**: la app muestra un loading screen mientras verifica la sesión (`display:none` → `display:flex`). Si el JS falla o tarda, el usuario ve indefinidamente "Verificando sesión". Añadir un timeout con fallback al redirect a login.
- [ ] **Sidebar reflow**: el sidebar tiene ancho fijo `lg:w-[260px]`. En el initial render, el `main` content adapta su ancho. Si el sidebar se carga con retraso, puede causar layout shift. Usar CSS `grid` con columnas fijas para evitar esto.

### 1.5 Código y Estructura

- [ ] **Script monolítico**: el `<script>` del AppLayout tiene ~120 líneas con auth guard, active links, mobile drawer, y command palette. Dividir en módulos: `auth-guard.ts`, `sidebar.ts`, `command-palette.ts`.
- [ ] **Command palette — datos estáticos**: los `CMD_ITEMS` están hardcodeados. Considerar generarlos dinámicamente basándose en las rutas disponibles, e incluir búsqueda de personajes/campañas del usuario.
- [ ] **Sidebar state persistence**: al navegar entre páginas, el sidebar se re-renderiza completo (Astro MPA). Considerar View Transitions de Astro para persistir el sidebar entre navegaciones.

---

## 2. Personajes (`/app` — CharacterList.tsx)

### 2.1 Accesibilidad

- [ ] **Quick Actions — emojis como iconos**: los `QuickAction` pills usan emojis (`➕`, `📖`, `📚`, `🌐`). Reemplazar con SVGs o FontAwesome para consistencia y accesibilidad (los emojis pueden leerse de forma distinta según screen reader/plataforma).
- [ ] **StatCard — emojis**: las stat cards usan emojis (`⚔️`, `📊`, `🎭`, `🧝`) como iconos. Mismo problema que arriba.
- [ ] **Character card — delete button**: el botón "Eliminar" cambia a "¿Confirmar eliminación?" tras un click. No hay feedback para screen readers. Añadir `aria-live="polite"` al texto del botón o usar un `aria-label` dinámico.
- [ ] **Character card — link area**: toda la card es clickeable vía un `<a>` interno, pero el botón "Eliminar" está fuera del `<a>`. La semántica es correcta, pero el `<div>` padre tiene `onMouseEnter/Leave` que se comporta como un link sin serlo.
- [ ] **Search input — `aria-label`**: el input de búsqueda no tiene `aria-label` explícito (solo `placeholder`). Añadir `aria-label="Buscar personajes"`.
- [ ] **Empty state decorativo**: los SVG y emojis del empty state deberían tener `aria-hidden="true"`.

### 2.2 Inline Event Handlers

- [ ] **`onMouseEnter`/`onMouseLeave` en cards**: `CharacterCard`, `QuickAction` y el search clear button cambian estilos con JS inline. Migrar a CSS `:hover` usando classes de Tailwind o custom classes para mejor rendimiento y mantenibilidad.

### 2.3 UX

- [ ] **Delete confirmation UX**: el patrón actual (click → texto cambia → click otra vez en 3s) es invisible para usuarios nuevos. Considerar un modal de confirmación consistente con el de campañas (que sí tiene modal).
- [ ] **Skeleton loading**: el spinner de carga es funcional pero genérico. Implementar skeleton cards que muestren la estructura de las cards antes de cargar.
- [ ] **Pull-to-refresh**: en móvil no hay forma de refrescar la lista sin recargar la página. Considerar un gesto pull-to-refresh o un botón de refrescar.
- [ ] **Sort/filter**: la lista solo tiene búsqueda. Añadir filtros por clase, raza o nivel, y ordenación (nombre, nivel, fecha de creación).
- [ ] **Pagination/virtual scroll**: si un usuario tiene 50+ personajes, la lista puede ser lenta. Considerar paginación o virtualización del grid.

---

## 3. Campañas (`/app/campaigns` — CampaignList.tsx)

### 3.1 Accesibilidad

- [ ] **Campaign card — emojis**: las cards usan `🗺️` y los headers `📖` como iconos decorativos. Reemplazar con SVG o marcar con `aria-hidden="true"`.
- [ ] **Modal — focus trap**: los modales (crear campaña, eliminar) no implementan focus trap. Al abrir un modal, el foco debería quedarse dentro de él y restaurarse al cerrarlo.
- [ ] **Modal — `role="dialog"`**: los modales no tienen `role="dialog"` ni `aria-modal="true"` ni `aria-labelledby` apuntando al título.
- [ ] **Modal — Escape to close**: los modales se cierran al hacer click fuera, pero no se comprueba la tecla Escape para cerrarlos.
- [ ] **Search input — `aria-label`**: el input de búsqueda no tiene `aria-label` explícito.

### 3.2 Inline Event Handlers

- [ ] **`onMouseEnter`/`onMouseLeave` en cards y search:** mismo patrón que CharacterList — migrar a CSS `:hover`.

### 3.3 UX

- [ ] **Campaign detail view**: al clickar una campaña no hay navegación. Implementar una vista de detalle (`/app/campaigns/[id]`) donde se pueda vincular personajes, añadir notas de sesión, etc.
- [ ] **Vincular personaje**: la card muestra "Personaje vinculado" / "Sin personaje" pero no hay UI para vincular/desvincular un personaje. Añadir un selector en la vista de detalle o en el modal de creación.
- [ ] **Edit campaign**: no existe forma de editar el nombre o descripción de una campaña después de crearla. Añadir un modal o inline editing.
- [ ] **Empty state CTA**: el empty state tiene el mismo estilo que el de personajes pero con acento azul. Consistente y correcto.
- [ ] **Campaign card — click navigation**: las campaign cards no son navegables (no hay `<a>` ni `onClick` para abrir detalle). Son solo tarjetas estáticas con botón eliminar.

---

## 4. Ajustes (`/app/settings` — SettingsPanel.tsx)

### 4.1 Accesibilidad

- [ ] **Toggle switches — `role="switch"`**: los toggles de reglas opcionales son `<button>` con estilos visuales, pero no tienen `role="switch"` ni `aria-checked`. Los screen readers los leen como botones genéricos.
- [ ] **OptionButton — `aria-pressed`**: los botones de tema y unidades no indican su estado seleccionado a lectores de pantalla. Añadir `aria-pressed="true"` al activo o usar `role="radiogroup"` + `role="radio"`.
- [ ] **Section headings con emojis**: los `SettingsSection` usan emojis (`⚙️`, `🎨`, `📏`, `📜`, `💾`). Reemplazar con SVG/FontAwesome o marcar con `aria-hidden="true"`.
- [ ] **Theme labels con emojis**: las opciones de tema usan emojis como prefijo (`🌙 Oscuro`, `☀️ Claro`, `💻 Auto`). Si se reemplazan con iconos, los emojis se eliminan.

### 4.2 Inline Event Handlers

- [ ] **Hover en reglas opcionales**: los items de reglas opcionales usan `onMouseEnter`/`onMouseLeave` para el efecto hover. Migrar a CSS `:hover`.

### 4.3 UX

- [ ] **Feedback al cambiar ajuste**: cuando se cambia el tema o una regla opcional, no hay feedback visual (toast, badge "Guardado", etc.). El usuario no sabe si el cambio se persistió correctamente.
- [ ] **Theme preview**: al cambiar el tema, el cambio es inmediato (correcto). Pero podría añadirse una transición suave (`transition: background-color 0.3s`) al body para que el cambio no sea tan abrupto.
- [ ] **Restablecer — confirmación**: el botón "Restablecer" no pide confirmación. Si el usuario lo pulsa accidentalmente, pierde todos los ajustes. Añadir un modal de confirmación.
- [ ] **Max-width inconsistente**: el `SettingsPanel` usa `max-w-2xl` sin `mx-auto` en mobile. Funciona porque el `max-w-6xl` del padre limita, pero el contenido se pega al borde izquierdo en pantallas muy anchas.

---

## 5. Mi Cuenta (`/app/account` — AccountPanel.tsx)

### 5.1 Accesibilidad

- [ ] **Quick links — emojis**: los links rápidos usan `⚙️` y `📚` como iconos. Reemplazar con SVG/FontAwesome.
- [ ] **InfoCard — emojis**: las tarjetas de información usan `📧` y `🎲`. Mismo tratamiento.
- [ ] **Quick links — inline hover JS**: los links de "Ajustes de la aplicación" y "Compendio público" usan `onMouseEnter`/`onMouseLeave` inline. Migrar a CSS `:hover`.
- [ ] **Avatar fallback — role**: el div de avatar fallback (con la inicial) debería tener `role="img"` y `aria-label="Avatar de [nombre]"`.
- [ ] **Sign out button — confirm**: no hay confirmación al cerrar sesión. Considerar un modal breve para evitar cierres accidentales.

### 5.2 UX

- [ ] **Editar perfil**: no se puede cambiar el nombre, avatar ni otros datos del perfil desde esta página. Añadir un botón "Editar perfil" con modal o sección editable.
- [ ] **Cambiar contraseña**: si el usuario se registró con email, no hay opción de cambiar la contraseña. Añadir un formulario de cambio de contraseña.
- [ ] **Código de jugador — copiar**: el código de jugador se muestra con `font-mono` pero no tiene un botón "Copiar al portapapeles". Esto facilitaría compartirlo.
- [ ] **Session info**: podría mostrarse más información de la sesión (último login, dispositivo, expiración del token) para transparencia de seguridad.
- [ ] **Danger zone — eliminar cuenta**: solo existe "Cerrar sesión". Considerar añadir "Eliminar cuenta" con doble confirmación para GDPR compliance.

---

## 6. Creación de Personaje (`/app/characters/create` — CharacterCreation.tsx)

### 6.1 General

- [ ] **Componente no analizado en profundidad**: `CharacterCreation.tsx` no fue leído completamente. Es probable que sea un wizard multi-paso con selección de raza, clase, stats, trasfondo, etc. Las mejoras de abajo son genéricas basadas en patrones comunes.

### 6.2 Accesibilidad

- [ ] **Wizard steps — aria-current**: si hay un indicador de pasos (stepper), cada paso debería tener `aria-current="step"` en el activo y `aria-label` descriptivo.
- [ ] **Form fields — labels vinculados**: verificar que todos los selectores, inputs y controles del wizard tengan `<label>` asociados correctamente.

### 6.3 UX

- [ ] **Guardar progreso parcial**: si el usuario cierra la pestaña a mitad del wizard, ¿se pierde el progreso? Considerar `localStorage` para persistir el estado del formulario.
- [ ] **Navegación — back confirmation**: si el usuario navega fuera (sidebar, browser back) con cambios sin guardar, debería mostrarse un diálogo de confirmación (`beforeunload`).
- [ ] **Responsive del wizard**: verificar que los selectores de raza/clase/trasfondo funcionen bien en pantallas <375px, especialmente si usan grids de tarjetas.

---

## 7. Hoja de Personaje (`/app/characters/view` — CharacterSheetPage.tsx)

### 7.1 General

- [ ] **Componente no analizado en profundidad**: `CharacterSheetPage.tsx` encapsula toda la hoja de personaje. Las mejoras de abajo son genéricas.

### 7.2 UX

- [ ] **Query param `?id=`**: la página usa query params (`?id=xxx`) para identificar el personaje. Considerar rutas dinámicas (`/app/characters/[id]`) para URLs más limpias y mejor SEO (aunque es zona autenticada).
- [ ] **Offline support**: la hoja de personaje es la página más usada. Considerar Service Worker para cachear los datos del personaje y permitir consulta offline.
- [ ] **Print stylesheet**: muchos jugadores quieren imprimir su hoja. Añadir `@media print` con estilos optimizados (fondo blanco, sin sidebar, layout de una columna).
- [ ] **Export/Share**: añadir opciones de exportar a PDF o compartir un read-only link con el Master.

---

## 8. Mejoras Transversales (todas las páginas /app/*)

### 8.1 Hydration Strategy

- [ ] **`client:load` en todos los componentes**: todas las páginas app usan `client:load` (hydration inmediata). Para componentes below-the-fold o no interactivos inmediatamente, `client:visible` o `client:idle` reducirían el TTI.

### 8.2 Error Boundaries

- [ ] **Sin error boundaries React**: si un componente React crashea, toda la página se rompe silenciosamente. Envolver cada componente en un `ErrorBoundary` con mensaje amigable ("Algo salió mal, recarga la página").

### 8.3 PWA y Offline

- [ ] **Service Worker**: la app no tiene Service Worker. Para una app de D&D que se usa en mesas (posiblemente con mala conexión), cachear assets estáticos y datos de personajes sería muy valioso.
- [ ] **Manifest**: verificar que el `manifest.json` tenga todos los campos necesarios para "Add to home screen" en móvil (nombre, short_name, icons, theme_color, background_color).

### 8.4 Consistencia Visual

- [ ] **Emojis vs SVGs**: hay una mezcla de emojis e SVGs inline como iconos. Las páginas del sidebar usan SVGs de Lucide (correcto), pero el contenido de los React components usa emojis extensivamente. Migrar todos a un sistema de iconos unificado (FontAwesome, Lucide, o SVG sprites).
- [ ] **Inline styles vs CSS**: todos los componentes React tienen muchos `style={...}` inline con gradients y box-shadows. Migrar a clases Tailwind custom o CSS modules para mejor mantenibilidad y cacheabilidad del CSS.
- [ ] **Custom properties consistentes**: los componentes usan una mezcla de CSS custom properties (`var(--app-*)`) y colores hardcodeados (`#8f3d38`, `#514D35`). Estandarizar usando solo custom properties.

### 8.5 Loading States

- [ ] **Spinners inconsistentes**: cada página tiene su propio spinner (`border-t-[#8f3d38] animate-spin`), pero están reimplementados en cada componente. Extraer a un componente `<Spinner>` reutilizable.
- [ ] **Skeleton loading global**: los loading states actuales son "spinner + texto". Implementar skeleton loading que muestre la estructura de la UI antes de cargar datos (reduce Perceived Load Time).

### 8.6 Navegación

- [ ] **View Transitions**: Astro soporta View Transitions para transiciones suaves entre páginas MPA. Activarlas para que el sidebar persista y el contenido haga un crossfade al navegar.
- [ ] **Breadcrumbs**: las páginas internas (`/app/characters/create`, `/app/characters/view`) no tienen breadcrumbs. Añadir `Personajes > Crear personaje` o `Personajes > [Nombre]` para orientación.
- [ ] **Redirect `/app/compendium`**: la página `/app/compendium` solo hace `Astro.redirect('/compendio')`. Considerar eliminar esta redirect page y cambiar el sidebar link directo a `/compendio` con `target="_blank"`.

### 8.7 Internacionalización

- [ ] **Textos hardcodeados**: todos los textos de UI están en español inline en los componentes. Para futura i18n, extraerlos a archivos de traducciones.

---

## Priorización Recomendada

| Prioridad | Área | Impacto |
|-----------|------|---------|
| 🔴 Alta | Sidebar/drawer ARIA (dialog, focus trap) | Accesibilidad fundamental |
| 🔴 Alta | Command palette ARIA (combobox pattern) | Accesibilidad fundamental |
| 🔴 Alta | Toggle/radio ARIA roles en Settings | Screen readers no detectan estado |
| 🔴 Alta | Error boundaries en React components | Resiliencia ante crashes |
| 🔴 Alta | Modales — focus trap + Escape key | Accesibilidad estándar |
| 🟡 Media | Emojis → SVGs/FontAwesome unificado | Consistencia visual, a11y |
| 🟡 Media | Inline handlers → CSS :hover | CSP compliance, performance |
| 🟡 Media | View Transitions de Astro | UX de navegación |
| 🟡 Media | Skeleton loading states | Perceived performance |
| 🟡 Media | Campaign detail view + editing | Funcionalidad incompleta |
| 🟡 Media | Account — editar perfil, cambiar password | Funcionalidad esperada |
| 🟡 Media | Wizard — guardar progreso parcial | UX crítico en flujos largos |
| 🟢 Baja | PWA / Service Worker | Offline support |
| 🟢 Baja | Print stylesheet para hoja de personaje | Nice-to-have |
| 🟢 Baja | i18n preparation | Futuro |
| 🟢 Baja | Extraer componentes compartidos | Code quality |
