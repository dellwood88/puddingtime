# Contributing

## Conventions

- **One component per folder**, named in PascalCase (`StarRating`, `PeoplePicker`).
- **Every component has a README** based on [`templates/COMPONENT_README.md`](templates/COMPONENT_README.md).
- **Source, not binaries.** Commit unpacked source, not `.msapp` or solution `.zip` files. Use:
  - `pac canvas unpack --msapp <file>.msapp --sources canvas-components/<Name>`
  - `pac solution unpack --zipfile <file>.zip --folder solutions/<Name> --packagetype Both`
- **Publisher prefix:** use one prefix for everything in this repo (e.g. `pud_`) so components don't collide.
- **No secrets or environment data.** Strip connection references, environment URLs, tenant IDs and test records before committing. Use environment variables in solutions.

## PCF controls

```powershell
pac pcf init --namespace Puddingtime --name MyControl --template field --run-npm-install
```

Run that inside `pcf-controls/MyControl`. CI builds every folder under `pcf-controls/` that has a `package.json`.

## Commit messages

Start with the area: `pcf: add StarRating`, `fx: add date-diff helper`, `flows: approval child flow`.
