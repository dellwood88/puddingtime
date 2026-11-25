# PCF controls

Power Apps Component Framework code components. Each subfolder is one control created with `pac pcf init`.

Build one locally:

```powershell
cd pcf-controls/<ControlName>
npm install
npm run build
```

Test it in the browser harness with `npm start watch`.

## Controls

| Control | Bound to | What it does |
|---------|----------|--------------|
| [StarRating](StarRating) | Whole number | Click or keyboard star rating, 1–10 stars |
| [ProgressBar](ProgressBar) | Any number | Read-only percentage bar |
| [CharCounter](CharCounter) | Text | Text box with live character counter |

## Project setup notes

All controls share the same setup: `pcf-scripts` with an ESLint 9 flat config (`eslint.config.mjs`). Keep `@microsoft/eslint-plugin-power-apps` on `^0.2` — newer versions need ESLint 10, which `pcf-scripts` doesn't support yet.
