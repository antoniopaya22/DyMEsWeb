# Login Page — Mejoras de Interfaz Gráfica

Lista de mejoras recomendadas para la página de inicio de sesión (`/login`): rendimiento, accesibilidad, responsive, seguridad UX y polish visual.

---

## 1. Rendimiento

- [ ] **LCP — `landscape.png`**: la imagen de fondo es la misma que la landing y probablemente es el LCP de la página. Convertir a WebP/AVIF con `<picture>` y `srcset`. Añadir `fetchpriority="high"` y `loading="eager"`.
- [ ] **Preload de imagen hero**: añadir `<link rel="preload" as="image" href="/landscape.png">` en el `<head>` para iniciar la descarga antes del parsing del HTML.
- [ ] **FontAwesome innecesario**: la página de login no usa FontAwesome pero lo carga vía `Layout.astro`. Cargar FA solo en las páginas que lo necesitan o hacer code-splitting del CSS (~60KB innecesarios).
- [ ] **`backdrop-filter` performance**: el card usa `backdrop-filter: blur(24px) saturate(150%)`. En dispositivos de gama baja esto puede causar jank. Considerar fallback con `background` opaco para dispositivos lentos usando `@supports not (backdrop-filter: blur(1px))`.
- [ ] **Hydration innecesaria**: `LoginForm` se carga con `client:load` (hydration inmediata). Como el formulario no es visible hasta que el JS carga, es correcto, pero la hydration es síncrona y bloquea el hilo principal. Considerar `client:idle` si la latencia percibida mejora.

## 2. Accesibilidad (WCAG 2.1 AA)

- [ ] **Labels asociados a inputs**: los `<label>` del formulario no tienen `htmlFor` ni envuelven su `<input>`. Añadir `htmlFor` en cada `<label>` y `id` en cada `<input>` para vincularlos correctamente con lectores de pantalla.
- [ ] **Autocomplete attributes**: los inputs carecen de `autoComplete`. Añadir `autoComplete="email"` al campo de email, `autoComplete="current-password"` en login y `autoComplete="new-password"` en registro, y `autoComplete="name"` al nombre. Esto mejora el autofill del navegador.
- [ ] **Focus management en tabs**: al cambiar entre las pestañas "Iniciar sesión" / "Registrarse", el foco no se mueve al formulario. Mover el foco al primer campo del formulario tras cambiar de tab.
- [ ] **Tab role en selector**: los botones de tab (login/register) no tienen `role="tablist"` / `role="tab"` / `aria-selected`. Implementar el patrón ARIA Tabs completo para navegación con teclado.
- [ ] **Mensaje de error — `role="alert"`**: el `<div>` de mensajes de error/éxito no tiene `role="alert"` ni `aria-live="polite"`. Los lectores de pantalla no anunciarán los errores automáticamente.
- [ ] **Botón toggle contraseña**: el botón de mostrar/ocultar contraseña no tiene `aria-label` descriptivo (ej. "Mostrar contraseña" / "Ocultar contraseña") ni `aria-pressed` para indicar el estado actual.
- [ ] **Contraste de texto**: el color `#807953` sobre fondo `rgba(14,13,9,0.7)` puede no alcanzar el ratio 4.5:1 para texto normal. Verificar con herramienta de contraste y ajustar si es necesario.
- [ ] **Focus visible en inputs**: los inputs tienen `:focus` con `border-[#8f3d38]/50` y `shadow`, pero no usan `:focus-visible` para diferenciar entre navegación con teclado y clic. El outline puede ser insuficiente para usuarios de teclado.
- [ ] **Error validation — aria-describedby**: cuando hay errores de validación, el input correspondiente debería tener `aria-describedby` apuntando al mensaje de error y `aria-invalid="true"`.
- [ ] **Link "Volver al inicio"**: el enlace es accesible, pero podría beneficiarse de un `skip-to-content` equivalent al inicio del formulario para usuarios de teclado.

## 3. Responsive Design

- [ ] **Split layout en móvil**: el panel izquierdo (branding) se oculta en móvil (`hidden lg:flex`). La transición entre "sin branding" y "con branding" a 1024px es abrupta. Considerar mostrar un branding reducido en tablets (md:) — solo logo + título, sin descripción.
- [ ] **Espacio vertical en móvil**: en pantallas cortas (iPhone SE, landscape), el formulario con las features inferiores puede requerir scroll. Añadir `min-h-screen` con `overflow-y-auto` al panel del form y asegurar que el CTA principal sea visible sin scroll.
- [ ] **Features row en móvil**: la fila "Gratis / Web + Android / SRD 5.1" usa `gap-6` que puede causar overflow en pantallas <360px. Usar `gap-4` o `flex-wrap` para pantallas muy estrechas.
- [ ] **Input touch targets**: los inputs tienen `py-3` (~48px de alto), lo cual es correcto. El botón de toggle password podría ser un poco pequeño para touch. Aumentar su área táctil a 44×44px mínimo.

## 4. Seguridad y Validación UX

- [ ] **Validación en tiempo real**: actualmente la validación solo ocurre al hacer submit. Considerar validación inline (on blur) para email (formato) y contraseña (longitud mínima) con mensajes descriptivos bajo cada campo.
- [ ] **Strength meter de contraseña**: en el modo registro, mostrar un indicador visual de fortaleza de la contraseña (débil/media/fuerte) con requisitos explícitos (6+ caracteres, etc.).
- [ ] **Rate limiting visual**: si el usuario falla múltiples intentos de login, no hay feedback visual de rate limiting. Mostrar un countdown timer si Supabase devuelve `429 Too Many Requests`.
- [ ] **Recuperación de contraseña**: no existe un link "¿Olvidaste tu contraseña?" en el tab de login. Es una funcionalidad crítica que debería estar presente debajo del campo de contraseña.
- [ ] **Confirmación de contraseña en registro**: el registro no pide confirmar la contraseña. Añadir un campo "Confirmar contraseña" para evitar errores de escritura.
- [ ] **Email duplicado**: el error "User already registered" de Supabase debería ser traducido al español y sugerir probar con "Iniciar sesión" en su lugar, con un link directo al tab de login.
- [ ] **Redirect post-login**: el `window.location.href = '/app'` hace una navegación completa. Si hay un `returnUrl` en query params (ej. el usuario intentó acceder a `/app/characters/create` sin autenticar), redirigir ahí en lugar de `/app`.

## 5. Animaciones y Microinteracciones

- [ ] **`prefers-reduced-motion`**: las animaciones de entrada (`loginSlideFromLeft`, `loginSlideFromRight`, etc.) no respetan `prefers-reduced-motion`. Añadir:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .login-left, .login-right, .login-card, .login-mobile-logo {
      animation: none !important;
    }
  }
  ```
- [ ] **Shake animation en error**: cuando hay un error de autenticación, el formulario no da feedback físico. Añadir una animación de "shake" sutil al card o al campo con error.
- [ ] **Loading state del botón**: el spinner del botón submit es funcional pero genérico. Considerar desactivar todos los inputs mientras `submitting === true` para evitar doble submit accidental.
- [ ] **Transición entre tabs**: el cambio login ↔ registro es inmediato. Añadir una transición suave (slide o fade) al contenido del formulario cuando cambia el tab.
- [ ] **Google button — loading state**: el botón de Google no muestra estado de carga al clickar. Como la redirección OAuth puede tardar, mostrar un spinner o estado "Redirigiendo...".

## 6. Diseño Visual y Consistencia

- [ ] **Inline styles excesivos**: el card usa muchos `style="..."` inline (backgrounds, box-shadows, gradients). Migrar a clases CSS o Tailwind custom para mejor mantenibilidad.
- [ ] **Colores hardcodeados**: los colores `#807953`, `#CDC9B2`, `#AAA37B`, `#8f3d38` se repiten sin usar el sistema de design tokens. Usar las custom properties existentes (`--app-text-faint`, etc.) o definir variables específicas para el tema login.
- [ ] **Google button inconsistencia**: el botón de Google usa colores de los brand guidelines de Google (correcto), pero el estilo del botón (rounded-xl, border transparency) difiere de las Google Sign-in Button Guidelines oficiales. Considerar usar el estilo branded o mantener pero verificar cumplimiento.
- [ ] **Divider "o continúa con"**: el copy podría ser más inclusivo. Si en el futuro se añaden más providers (GitHub, Discord), el divider debería adaptarse.
- [ ] **Favicon como logo**: la imagen `favicon.svg` se usa como logo en el panel izquierdo. Considerar usar un asset dedicado de mayor resolución para el panel de branding.

## 7. Estructura y Código

- [ ] **Extraer estilos de animación**: los `@keyframes` de las animaciones de entrada (`loginSlideFromLeft`, etc.) están en `<style>` inline. Moverlos a `global.css` o un archivo CSS dedicado para reutilización.
- [ ] **LoginForm.tsx — tamaño**: el componente tiene 196 líneas con form logic + UI en un solo archivo. Considerar separar la lógica de autenticación en un hook custom (`useLoginForm`) y los sub-componentes (TabSelector, PasswordInput, GoogleButton).
- [ ] **Error handling más granular**: todos los errores se muestran en un solo `<div>`. Considerar errores inline bajo cada campo (email inválido → error bajo email, contraseña corta → error bajo contraseña).
- [ ] **Redirect loop prevention**: si el usuario ya tiene sesión activa y navega a `/login`, no hay redirect automático a `/app`. Añadir una comprobación de sesión en el script del lado servidor:
  ```astro
  ---
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return Astro.redirect('/app');
  ---
  ```

## 8. Testing y QA

- [ ] **Lighthouse audit**: ejecutar Lighthouse en `/login` y corregir issues hasta score 90+.
- [ ] **Cross-browser**: verificar `backdrop-filter` en Safari (iOS), Firefox (puede necesitar `-webkit-backdrop-filter`), y Edge. Testear en modo incógnito (sin extensiones).
- [ ] **Slow network**: probar con throttling 3G. Si `landscape.png` no carga, la página es un fondo negro con un card transparente. Añadir `background-color: #0a0908` al body y verificar que el card sea usable sin la imagen.
- [ ] **Keyboard-only navigation**: navegar completamente con Tab, Shift+Tab, Enter y Space. Verificar que todos los controles son alcanzables y activables.
- [ ] **Screen reader testing**: probar con NVDA/VoiceOver la secuencia: llegar a la página → cambiar tab → llenar formulario → recibir error → corregir → enviar.

---

## Priorización Recomendada

| Prioridad | Área | Impacto |
|-----------|------|---------|
| 🔴 Alta | Labels + autocomplete en inputs | Accesibilidad fundamental, autofill UX |
| 🔴 Alta | role="alert" en mensajes de error | Usuarios de screen reader no ven errores |
| 🔴 Alta | "Olvidé mi contraseña" link | Funcionalidad crítica ausente |
| 🔴 Alta | prefers-reduced-motion | Accesibilidad obligatoria |
| 🟡 Media | Validación inline + strength meter | Reduce fricción de registro |
| 🟡 Media | LCP imagen hero (WebP/AVIF) | Core Web Vitals |
| 🟡 Media | Redirect post-login con returnUrl | UX de flujo de autenticación |
| 🟡 Media | Tab ARIA roles | Patrón de navegación estándar |
| 🟡 Media | Responsive en pantallas cortas | UX móvil landscape |
| 🟢 Baja | Shake animation, tab transitions | Polish visual |
| 🟢 Baja | Extraer hook useLoginForm | Code quality |
| 🟢 Baja | Google button guidelines | Compliance visual |
