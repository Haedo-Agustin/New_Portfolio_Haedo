# AGENTS.md — Guía del proyecto y roles de agentes

Este documento describe el proyecto, cómo compilar/desplegar y cómo dividir el
trabajo entre **varios agentes especializados** para que cada uno realice tareas
distintas sin pisarse entre sí.

---

## 1. Resumen del proyecto

Portafolio personal de desarrollador/seguridad con estética "cyber" (termial
interactivo, matrix background, sandbox de proyectos, formulario de contacto,
i18n ES/EN, audio sintetizado con Web Audio API).

### Stack

| Capa        | Tecnología                                   |
| ----------- | -------------------------------------------- |
| Framework   | React 19 + TypeScript                        |
| Build tool  | Vite 6                                       |
| Estilos     | Tailwind CSS 4 (`@tailwindcss/vite`)         |
| Animación   | `motion` (Framer Motion)                     |
| Iconos      | `lucide-react`                               |
| Deploy      | GitHub Pages (`gh-pages` o GitHub Actions)   |

### Estructura

```
.
├─ index.html                 # HTML raíz (Vite)
├─ vite.config.ts             # Config Vite (incluye base path de GitHub Pages)
├─ package.json
├─ public/.nojekyll           # Evita el procesado Jekyll en GitHub Pages
├─ .github/workflows/deploy.yml  # CI: build + deploy a GitHub Pages
└─ src/
   ├─ main.tsx                # Entry point
   ├─ App.tsx                 # Composición de secciones y estado global
   ├─ index.css               # Estilos globales / utilidades cyber
   ├─ types.ts                # Tipos compartidos (Project, Skill, etc.)
   ├─ data/portfolioData.ts   # Contenido (proyectos, skills, experiencia…)
   ├─ utils/audio.ts          # Motor de audio Web Audio API
   └─ components/             # Componentes de UI por sección
```

---

## 2. Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo en http://localhost:3000
npm run build        # Build de producción -> dist/
npm run preview      # Previsualizar el build de producción
npm run lint         # Chequeo de tipos (tsc --noEmit)
```

Deploy (dos rutas válidas, ver sección 4).

---

## 3. Convenciones (aplican a TODOS los agentes)

- **Idioma de contenido:** todo texto visible debe existir en `es` y `en`
  (los tipos en [types.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/types.ts) usan `{ es, en }`).
- **Contenido centralizado:** los textos/datos van en
  [portfolioData.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/data/portfolioData.ts), no hardcodeados en componentes.
- **Sin `process.env` en código cliente:** Vite solo expone variables vía
  `import.meta.env.VITE_*`. Usar `process.env` en `src/` rompe en el navegador.
- **Base path:** el sitio se sirve bajo `/New_Portfolio_Haedo/`. No cambiar
  rutas absolutas de assets. El `base` está en
  [vite.config.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/vite.config.ts#L8-L9).
- **No commitear** `dist/`, `node_modules/` ni `.env` (ya están en `.gitignore`).
- **Verificación obligatoria:** antes de dar una tarea por terminada ejecutar
  `npm run lint` y `npm run build`.

---

## 4. Deploy en GitHub Pages (causa del "no se ve nada")

**Síntoma:** el sitio en GitHub Pages quedaba en blanco.

**Causas corregidas:**

1. `package.json` estaba **roto** (bloque `"homepage"` fuera del objeto JSON),
   por lo que `npm run build` fallaba siempre.
2. `vite.config.ts` **no definía `base`**, así que los assets se pedían en
   `/assets/...` (raíz) en lugar de `/New_Portfolio_Haedo/assets/...` → 404.
3. El script `deploy` apuntaba a `build/` pero Vite genera `dist/`.
4. No existía workflow de CI ni `.nojekyll`.

**Configuración requerida en GitHub (una sola vez):**
`Repo → Settings → Pages → Build and deployment → Source = "GitHub Actions"`.

A partir de ahí, cada `push` a `main` dispara
[deploy.yml](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/.github/workflows/deploy.yml)
que compila y publica `dist/`.

URL esperada:
`https://haedo-agustin.github.io/New_Portfolio_Haedo/`

**Alternativa manual** (sin Actions): `npm run deploy` (usa `gh-pages -d dist`)
y configurar Source = rama `gh-pages`.

---

## 5. Roles de agentes

Cada agente tiene un alcance acotado. Un agente **no debe** modificar archivos
fuera de su alcance sin justificarlo.

### Agente 1 — DevOps / Deploy
- **Objetivo:** mantener el pipeline de build y publicación funcionando.
- **Archivos de su ámbito:**
  [vite.config.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/vite.config.ts),
  [package.json](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/package.json),
  `package-lock.json`, `.github/workflows/`, `public/.nojekyll`, `.gitignore`.
- **Tareas típicas:** ajustar `base` si cambia el repo, corregir scripts,
  diagnosticar fallos de Actions, cache/dependencias.
- **Guardrails:** no tocar componentes de UI ni el contenido.

### Agente 2 — Frontend / UI
- **Objetivo:** componentes, estilos y animaciones.
- **Archivos de su ámbito:** `src/components/**`,
  [App.tsx](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/App.tsx),
  [index.css](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/index.css).
- **Tareas típicas:** nuevos componentes, responsive, accesibilidad, performance
  visual, bugs de render.
- **Guardrails:** consumir datos desde `portfolioData.ts`; no cambiar firmas de
  tipos sin coordinar con el Agente 3.

### Agente 3 — Datos / Contenido e i18n
- **Objetivo:** contenido del portafolio y traducciones.
- **Archivos de su ámbito:**
  [portfolioData.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/data/portfolioData.ts),
  [types.ts](file:///Users/haedo/Documents/GitHub/New_Portfolio_Haedo/src/types.ts).
- **Tareas típicas:** añadir/editar proyectos, skills, experiencia; asegurar
  paridad ES/EN; mantener tipos consistentes.
- **Guardrails:** nunca dejar una entrada solo en un idioma.

### Agente 4 — QA / Testing
- **Objetivo:** verificar calidad y detectar regresiones.
- **Ámbito:** ejecutar `npm run lint` y `npm run build`; revisar consola del
  navegador en `npm run preview`; reportar bugs con pasos de reproducción.
- **Tareas típicas:** validar cambios de otro agente, revisar enlaces rotos
  (URLs de GitHub/proyectos), comprobar que el build queda bajo el base correcto.
- **Guardrails:** por defecto solo reporta; escribe código solo si se le pide.

### Agente 5 — Seguridad / Revisión
- **Objetivo:** revisar dependencias y evitar fugas de secretos.
- **Ámbito:** `package.json` (dependencias), `.env*`, código cliente.
- **Tareas típicas:** `npm audit`, revisar que no haya claves en el bundle,
  validar entradas del formulario de contacto.
- **Guardrails:** no commitear nunca secretos; reportar en lugar de "arreglar"
  silenciosamente.

---

## 6. Flujo de trabajo sugerido

1. **DevOps** asegura que `main` compila y despliega.
2. **Datos/Contenido** y **Frontend** trabajan en paralelo sobre sus ámbitos.
3. **QA** valida el resultado combinado.
4. Antes de merge: `npm run lint && npm run build` deben pasar.
5. Tras el merge a `main`, el workflow publica automáticamente en Pages.
