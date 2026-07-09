# Soccer Formations React

This Vite + React JavaScript project was generated from the original `index.html` single-page app.

## What is preserved

- The original Formation View, Player View, and Coach View markup.
- The original CSS styling.
- The original JavaScript formation data, session plans, triggers, buildout patterns, defensive blocks, and SVG buildout visuals.
- The original interaction model, including formation-format buttons, view switching, player-position selection, coach tabs, and accordions.

## Project structure

```text
soccer-formations-react/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  ├─ legacy-app.js
│  └─ original-index-reconstructed.html
└─ src/
   ├─ App.jsx
   ├─ main.jsx
   ├─ components/
   │  └─ LegacySoccerApp.jsx
   └─ styles/
      └─ app.css
```

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## Build for deployment

```bash
npm run build
```

The production build will be created in `dist/`.

## Notes

This is a compatibility-first React conversion. It wraps the original working app inside React while preserving the original UI, UX, and data. A later refactor can progressively convert the legacy rendering functions into fully idiomatic React components.
