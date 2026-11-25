# Text with Character Counter

> Text box (or text area) with a live "used / limit" counter that turns amber near the limit and red at it.

| | |
|---|---|
| **Type** | PCF control (field) |
| **Works in** | Model-driven and canvas |
| **Status** | 🧪 Experimental — tested in the PCF harness, not yet in a live environment |
| **Bundle size** | ~7 KB, no dependencies |

## Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `value` | Single line of text, Text area or Multiline text (bound) | Yes | The column to edit. |
| `maxLength` | Whole number | No | Character limit. If empty, uses the column's own maximum length. |
| `warnAt` | Whole number | No | Percent of the limit where the counter turns amber. Default **90**. |
| `multiline` | Yes/No | No | Resizable text area instead of a single-line box. Default **No**. |
| `placeholder` | Text | No | Hint shown when empty. |

## Behaviour

- Typing stops at the limit (`maxlength` is enforced in the box).
- Counter is announced politely to screen readers and linked with `aria-describedby`.
- Clearing the box writes empty to the column.
- Typing doesn't jump the cursor when the form refreshes the value.

## How to use

**Try it locally** (no environment needed):

```powershell
cd pcf-controls/CharCounter
npm install
npm start
```

This opens the PCF test harness at http://localhost:8181, where you can change the inputs on the right.

**Push to a dev environment** (needs the [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction)):

```powershell
pac auth create --environment https://<your-org>.crm.dynamics.com
pac pcf push --publisher-prefix pud
```

Then add it to a column: **form designer → select the column → Components → + Component → Text with Character Counter**. In canvas apps, turn on *Power Apps component framework for canvas apps* in the environment settings and import it from **Insert → Get more components → Code**.

## Known limitations

- Counts UTF-16 code units, like Dataverse does — some emoji count as 2.

## Changelog

- **1.0.0** — Initial version
