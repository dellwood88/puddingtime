# 🍮 puddingtime

A library of reusable **Microsoft Power Platform** components — PCF controls, canvas components, Power Fx patterns, Power Automate flows and importable solutions.

Everything here is meant to be copied, imported or adapted into your own apps.

## Catalog

| Component | Type | What it does | Status |
|-----------|------|--------------|--------|
| [Star Rating](pcf-controls/StarRating) | PCF control | Clickable, keyboard-accessible star rating for a whole-number column | 🧪 Experimental |
| [Progress Bar](pcf-controls/ProgressBar) | PCF control | Read-only progress bar for any number column, with label and "complete" colour | 🧪 Experimental |
| [Text with Character Counter](pcf-controls/CharCounter) | PCF control | Text box / text area with a live "used / limit" counter | 🧪 Experimental |

<!-- Add one row per component. Status: 🧪 Experimental → ✅ Stable once tested in a live environment. -->

## Repo layout

| Folder | Contents |
|--------|----------|
| [`pcf-controls/`](pcf-controls) | Power Apps Component Framework code components (TypeScript) |
| [`canvas-components/`](canvas-components) | Canvas app component libraries, unpacked to source with `pac canvas unpack` |
| [`power-fx/`](power-fx) | Copy-paste Power Fx formulas and patterns |
| [`flows/`](flows) | Power Automate cloud flow templates and child-flow patterns |
| [`solutions/`](solutions) | Unpacked Dataverse solutions, ready to pack and import |
| [`docs/`](docs) | Screenshots, diagrams and longer guides |
| [`templates/`](templates) | Starter README for new components |

## Using a component

- **PCF control** — build it (`npm install && npm run build` in its folder) or import the managed solution from the component's README, then add it to a form or canvas app.
- **Canvas component** — pack the source (`pac canvas pack --sources <folder> --msapp <name>.msapp`) and import the component library into your environment.
- **Power Fx snippet** — copy the formula into the property noted in the snippet.
- **Flow** — import the solution zip or rebuild from the documented steps.
- **Solution** — `pac solution pack --zipfile out.zip --folder solutions/<name>` then import it.

## Prerequisites

- [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction) (`pac`)
- [Node.js](https://nodejs.org/) LTS — for PCF controls
- A Power Platform environment to test in (a free [Developer environment](https://learn.microsoft.com/power-platform/developer/create-developer-environment) works)

## Adding a component

1. Create a folder in the right category, e.g. `pcf-controls/MyControl`.
2. Copy [`templates/COMPONENT_README.md`](templates/COMPONENT_README.md) into it as `README.md` and fill it in.
3. Add a screenshot or GIF under `docs/images/`.
4. Add a row to the **Catalog** table above.

See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions.
