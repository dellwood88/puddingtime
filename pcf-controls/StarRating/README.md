# Star Rating

> Clickable, keyboard-accessible star rating for a whole-number column.

| | |
|---|---|
| **Type** | PCF control (field) |
| **Works in** | Model-driven and canvas |
| **Status** | 🧪 Experimental — tested in the PCF harness, not yet in a live environment |
| **Bundle size** | ~7 KB, no dependencies |

## Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | Whole number (bound) | Yes | The rating. Empty means not rated. |
| `maxStars` | Whole number | No | Number of stars, 1–10. Default **5**. |
| `starColor` | Text | No | Any CSS colour for filled stars. Default **#f5b301**. |

## Behaviour

- Hover previews the rating; click sets it.
- Clicking the current rating again **clears** it (writes empty to the column).
- Keyboard: **← →** or **↑ ↓** step the rating, **1–9** jump to that rating, **Home/End** first/last, **Delete/Backspace/0** clear.
- Uses `radiogroup`/`radio` roles so screen readers announce "3 of 5, checked".
- Respects read-only/disabled forms.

## How to use

**Try it locally** (no environment needed):

```powershell
cd pcf-controls/StarRating
npm install
npm start
```

This opens the PCF test harness at http://localhost:8181, where you can change the inputs on the right.

**Push to a dev environment** (needs the [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction)):

```powershell
pac auth create --environment https://<your-org>.crm.dynamics.com
pac pcf push --publisher-prefix pud
```

Then add it to a column: **form designer → select the column → Components → + Component → Star Rating**. In canvas apps, turn on *Power Apps component framework for canvas apps* in the environment settings and import it from **Insert → Get more components → Code**.

## Known limitations

- Whole stars only (no half stars).
- Clearing the value was confirmed to send `null` in the harness; check it in your environment.

## Changelog

- **1.0.0** — Initial version
