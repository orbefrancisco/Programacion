# DuroBlog

Blog personal. El post principal — **"Entendiendo los embeddings: de tokens a geometría"** — reconstruye el concepto desde cero, con siete visualizaciones interactivas.

---

## Stack

| Pieza            | Elección                   | Por qué                                                                 |
| ---------------- | -------------------------- | ----------------------------------------------------------------------- |
| Framework        | **Astro 6** (MDX + SSG)    | Islands architecture: cada viz se hidrata independiente. Estático por defecto → lee como blog, no como SPA. MDX nativo permite importar componentes dentro del post. |
| Islands          | **Ninguno (vanilla TS)**   | Los gráficos son SVG + DOM + `requestAnimationFrame`. No hay React ni Preact: menos peso, menos capa entre el código y el DOM, y encaja con el requisito de "SVG inline animado con JS nativo". |
| 3D               | **three.js**               | Carga perezosa via `IntersectionObserver` + `import('three')`: el chunk de 700 KB solo baja cuando el visor entra en viewport. |
| Estilos          | **Tailwind v4 (Vite)**     | Utilities para layout; tokens de tema en `:root` con `color-mix()` para el modo claro. Cero librería de componentes.      |
| Matemáticas      | **KaTeX** via remark/rehype | Render server-side de `$...$` y `$$...$$`. Nada de JS pesado para fórmulas. |
| Tipografía       | Inter + Literata (Google Fonts) | Inter para UI/headings, Literata para cuerpo largo. `display=swap`. |
| Acento           | `#F59E0B` (ámbar)          | WCAG AAA sobre `#0B0B0C` para texto ≥14pt; cálido sin saturación; lee como intencional. |

### Por qué Astro y no Next.js

Next App Router es más potente en general, pero para un post estático con visualizaciones independientes introduce capa de más: suspense/streaming, metadata API, cliente/servidor component boundary. Astro:

- El post es HTML estático con 7 islas interactivas inline; no hay *shell* que esperar.
- Cada viz es un `.astro` con `<script>` cuyo bundle se genera automáticamente.
- Partial hydration real: three.js no se carga hasta que la sección entra en viewport.
- Configuración mínima para MDX + KaTeX.

Para un blog con posts largos y gráficos, Astro es el stack natural.

---

## Estructura

```
src/
├── components/
│   ├── BaseHead.astro          # <head>: fuentes, KaTeX CSS, tema early
│   ├── DarkToggle.astro        # toggle tema (persistente)
│   ├── Header.astro, Footer.astro, HeaderLink.astro
│   └── viz/
│       ├── VizFrame.astro      # wrapper: título pequeño, caption
│       ├── VizControls.astro   # fila minimalista para sliders/toggles
│       ├── OneHotVsContinuous.astro    # viz 1
│       ├── SemanticArithmetic.astro    # viz 2
│       ├── SkipGramGD.astro            # viz 3
│       ├── DistanceConcentration.astro # viz 4
│       ├── ContextualAttention.astro   # viz 5
│       ├── Manifold3D.astro            # viz 6 (lazy + three.js)
│       └── Playground.astro            # viz 7
├── content/blog/
│   └── entendiendo-los-embeddings.mdx  # el post
├── data/
│   ├── mini-embeddings.ts      # ~40 palabras × 8d, hand-crafted
│   ├── toy-corpus.ts           # 8 palabras, pares para skip-gram
│   └── playground-vocab.ts     # ~170 palabras × 16d, tag-based
├── layouts/
│   ├── BlogPost.astro          # layout default
│   └── LongformPost.astro      # grid con breakout para viz
├── lib/viz/
│   └── math.ts, pca.ts, knn.ts
└── styles/global.css           # Tailwind import + tokens + base
```

---

## Cómo correr localmente

```bash
npm install
npm run dev        # http://localhost:4321
```

El post vive en `/blog/entendiendo-los-embeddings/`.

Otras rutas:
- `npm run build` — build estático a `dist/`
- `npm run preview` — sirve `dist/` localmente

Requiere Node ≥ 22.12.

---

## Despliegue

El repo incluye un workflow (`.github/workflows/deploy.yml`) que despliega a **GitHub Pages** en cada push a `main` o `claude/*`. Para activarlo la primera vez:

1. `Settings` → `Pages` → `Source` = **GitHub Actions**.
2. Push al branch configurado; el workflow construye y publica.

URL resultante: `https://orbefrancisco.github.io/Programacion/blog/entendiendo-los-embeddings/`

Para **Netlify / Vercel**:

- Conectar el repo.
- Build command: `npm run build`.
- Publish dir: `dist`.
- Ajustar `site` y eliminar `base` en `astro.config.mjs` si el sitio va al raíz del dominio en vez de subruta.

---

## Datos pre-computados

### ¿Por qué no GloVe?

El brief pide un playground con embeddings reales (GloVe u otros). **Decisión consciente:** los tres ficheros de datos de este repo son **sintéticos**, diseñados pedagógicamente, no entrenados.

Razón:

- GloVe 50d con ~400k palabras pesa ~170 MB sin comprimir; un subset curado de 3k palabras pesaría ~1-2 MB tras cuantización, lo que está en el límite de lo que es razonable cargar en un blog.
- Más importante: **la mayoría de vectores de GloVe no satisfacen bien la aritmética** a bajas dimensiones. Un playground con datos reales pero sin los ejemplos canónicos cerrando produce una experiencia mala; mejor declarar la simplificación.

En su lugar, cada archivo de datos usa ejes semánticos pre-alineados por construcción, igual que un modelo bien entrenado exhibe emergentemente:

- **`src/data/mini-embeddings.ts`** — 40 palabras × 8 dimensiones. Cada dimensión es un atributo semántico (género, realeza, edad, humanidad, animalidad, tamaño, valencia, movimiento). Las analogías *king − man + woman ≈ queen*, *father − man + woman ≈ mother*, etc., se satisfacen algebraicamente.

- **`src/data/toy-corpus.ts`** — 8 palabras (`king, queen, man, woman, dog, cat, runs, sleeps`) con 14 frases cortas. Se genera el conjunto de pares `(centro, contexto)` vía ventana 1. El entrenamiento en la simulación es **real** (SGNS con k=3 negativos, gradiente analítico, descenso de gradiente en 2D); sólo el corpus está reducido para que converja en <200 iteraciones instantáneas.

- **`src/data/playground-vocab.ts`** — ~170 palabras × 16 dimensiones. Cada palabra se etiqueta con rasgos (`male`, `female`, `royal`, `animal`, `big`, `small`, `emotion`, `hot`, `cold`, etc.), cada rasgo se mapea a una dimensión con un peso, el vector resultante se normaliza a norma 1. Cosine similarity y aritmética A−B+C funcionan por construcción.

Todos los datasets se declaran explícitamente como pedagógicos tanto en este README como en el propio post (en la sección 7 del texto). El objetivo del post no es "mostrar GloVe"; es **construir las intuiciones** para que el lector entienda por qué GloVe funciona.

---

## Accesibilidad

- Contraste AA mínimo entre texto y fondo (con el acento `#F59E0B` sobre `#0B0B0C` pasa AAA para texto grande, AA para texto normal).
- Todos los controles tienen `aria-label` o `<label>` asociado.
- Los sliders responden a teclado (arrow keys) por defecto del `<input type="range">`.
- Toggle de tema persiste en `localStorage` y aplica `.light` antes del primer paint para evitar FOUC.
- `:focus-visible` con contorno acento visible en toda interacción clave.

---

## Performance

- Scripts de cada viz se generan como chunks separados; Astro los inline cuando son pequeños.
- three.js (~700 KB minificado) va en su propio chunk y se carga vía `import('three')` dentro de un `IntersectionObserver` con `rootMargin: 200px`. Un lector que nunca llega a la sección 6 no baja nunca three.js.
- Fuentes cargan con `display=swap` y `preconnect`.
- Build estático: todas las páginas son HTML plano + chunks bajo demanda.

---

## Licencia / crédito

Código: MIT para el scaffold. El contenido del post es del autor.

Los datos pedagógicos (`src/data/*.ts`) son diseño manual y están bajo la misma licencia.
