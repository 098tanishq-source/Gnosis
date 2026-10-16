# Gnosis

A lightweight, responsive Class 11 Physics learning prototype. React, Vite, compiled Tailwind CSS and Lucide SVG icons. All four requested sections have independent source folders.

## Run locally

Use Node.js 22.12 or newer. Open a terminal inside this extracted folder:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To create and inspect the production build:

```sh
npm test
npm run build
npm run preview
```

Deploy `dist/` to static hosting. This is a client-only project; it does not require a database or server. Do not double-click index.html: module imports need an HTTP server. Vite uses relative asset URLs to support subdirectory hosting.

## Start reading here

- `docs/ARCHITECTURE.md`: hierarchy, responsibilities, state ownership, data flow and extension points.
- `docs/DESIGN-SYSTEM.md`: exact ZIP source mappings, fonts, colours and performance adaptations.
- `docs/VALIDATION.md`: build sizes, checks and limitations.
- `src/features/`: separate Mock Test, Socratic AI, NCERT Hub and Tunnel Player files.

## What works

- Three-question NTA-style practice, radio responses, question palette, Previous, Next, clearing a response, submission and retry.
- +4 correct, −1 wrong, 0 unanswered. Every question receives analysis with the correct answer and explanation.
- Monotonic per-question timing, cumulative across revisits; paused outside Mock Test and while the document is hidden. Strictly more than 30,000 ms triggers a time-trap badge.
- Simulated Socratic hint with a delay and no final numeric solution.
- Three expandable original chapter summaries and the requested green offline status badges.
- Click-to-load responsive YouTube embed, unloaded on tab exit.
- Lite mode enabled by default, keyboard controls, focus indicators, reduced-motion support and safe-area bottom navigation.

## Prototype boundaries

No actual AI integration, account system, PDF textbook collection, service worker, background downloads or backend. Offline labels are illustrative; once loaded, summaries remain usable in this open page but offline reload is not guaranteed. Refresh resets test/hint state. The sample video ID is configurable in `src/features/player/video.js`; confirm availability and embed permission before release. YouTube may still show same-channel recommendations. Performance on a physical low-end phone has not been certified.

## Dependencies and fonts

`package-lock.json` pins the tested dependency resolution. Fonts are bundled through Fontsource and served from the same origin, with `font-display: swap`. Latin normal variable font files only: Plus Jakarta Sans initially; Inter and JetBrains Mono with the AI feature. Font licenses are provided in `docs/font-licenses/`.
