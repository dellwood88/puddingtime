# Progress Bar

> Read-only progress bar for any number column, with a percentage label and a "complete" colour.

| | |
|---|---|
| **Type** | PCF control (field, read-only) |
| **Works in** | Model-driven and canvas |
| **Status** | 🧪 Experimental — tested in the PCF harness, not yet in a live environment |
| **Bundle size** | ~5 KB, no dependencies |

## Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | Whole number, Decimal, Float or Currency (bound) | Yes | The number to show. |
| `maxValue` | Decimal | No | The value that counts as 100%. Default **100**. |
| `barColor` | Text | No | CSS colour of the bar. Default **#0f6cbd**. |
| `completeColor` | Text | No | Colour once `value ≥ maxValue`. Default **#107c10** (green). Leave empty to keep `barColor`. |
| `showLabel` | Yes/No | No | Show the percentage. Default **Yes**. |

## Behaviour

- Percent = `value / maxValue`, clamped to 0–100%. Values over the maximum show a full bar.
- Empty value shows an empty bar and "—".
- Hover shows the raw value, e.g. "37 of 100".
- Exposes `role="progressbar"` with `aria-valuenow` / `aria-valuetext`.
- Never writes to the column.

## How to use

**Try it locally** (no environment needed):

```powershell
cd pcf-controls/ProgressBar
npm install
npm start
```

This opens the PCF test harness at http://localhost:8181, where you can change the inputs on the right.

**Push to a dev environment** (needs the [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction)):

```powershell
pac auth create --environment https://<your-org>.crm.dynamics.com
pac pcf push --publisher-prefix pud
```

Then add it to a column: **form designer → select the column → Components → + Component → Progress Bar**. In canvas apps, turn on *Power Apps component framework for canvas apps* in the environment settings and import it from **Insert → Get more components → Code**.

## Ideas

- Pair with a calculated or rollup column, e.g. *% of tasks complete* or *budget spent vs budget*.

## Changelog

- **1.0.0** — Initial version
