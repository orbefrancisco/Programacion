# DuroBlog

Blog personal construido con Astro (plantilla oficial `blog`).

## Stack

- Astro + TypeScript (strict)
- Posts en Markdown con content collections (`src/content/blog/`)
- Sin framework UI adicional (HTML/CSS puro en componentes `.astro`)

## Comandos

- `npm run dev` — servidor de desarrollo en `http://localhost:4321`
- `npm run build` — build de producción a `dist/`
- `npm run preview` — sirve el build localmente para verificar

## Cómo añadir un post

Crear un archivo `.md` en `src/content/blog/` con frontmatter:

```yaml
---
title: 'Título del post'
description: 'Resumen corto (aparece en listas y meta tags).'
pubDate: 'Apr 23 2026'
updatedDate: 'Apr 24 2026'   # opcional
heroImage: '../../assets/mi-imagen.jpg'   # opcional
---

Contenido en Markdown aquí.
```

El frontmatter se valida con Zod en `src/content.config.ts`. Si falta un campo requerido, `npm run build` fallará con un error claro.

## Estructura

- `src/pages/` — rutas del sitio (`index.astro` = home, `blog/` = lista e individuales)
- `src/content/blog/` — posts en Markdown
- `src/components/` — componentes reutilizables (Header, Footer, BaseHead, etc.)
- `src/layouts/BlogPost.astro` — layout que envuelve cada post
- `src/consts.ts` — `SITE_TITLE` y `SITE_DESCRIPTION`
- `src/styles/global.css` — estilos globales
- `src/assets/` — imágenes y fuentes

## Despliegue

Por ahora solo local. Cuando se decida hosting:
- GitHub Pages / Netlify / Vercel / Cloudflare Pages funcionan todos.
- Ajustar `site` en `astro.config.mjs` con la URL final.
