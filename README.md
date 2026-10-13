# DyMEs Web

![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)

Versión web de **DyMEs**, la app de acompañamiento para **Dungeons & Dragons 5ª Edición en español**. Comparte backend con la app móvil [DyMEsApp](https://github.com/antoniopaya22/DyMEsApp).

## Qué incluye

- **Compendio** en español: clases, razas, trasfondos, conjuros y reglas.
- **Personajes**: creación y gestión de hojas de personaje.
- **Campañas**: organización de partidas y sus jugadores.
- **Cuenta y ajustes** con autenticación de Supabase.

## Stack

Astro 5 con islas de React 19, Tailwind CSS, Zustand para el estado y Supabase (Auth + Postgres) como backend.

## Puesta en marcha

```bash
npm install
cp .env.example .env   # si no existe, crea .env con las variables de abajo
npm run dev            # http://localhost:4321
```

Variables de entorno:

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

## Documentación

- `docs/historias_usuario/`: historias de usuario.
- `docs/ux/`: diseño de experiencia de usuario.
