# Canvas components

Canvas component libraries stored as source (`.pa.yaml`) so changes are reviewable in Git.

- **Export:** download the `.msapp` from Power Apps Studio, then
  `pac canvas unpack --msapp MyLibrary.msapp --sources canvas-components/MyLibrary`
- **Import:** `pac canvas pack --sources canvas-components/MyLibrary --msapp MyLibrary.msapp`, then open it in Studio and publish.
