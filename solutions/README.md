# Solutions

Unpacked Dataverse solutions.

```powershell
# Export from an environment and unpack
pac solution export --name MySolution --path MySolution.zip
pac solution unpack --zipfile MySolution.zip --folder solutions/MySolution --packagetype Both

# Pack and import
pac solution pack --zipfile MySolution.zip --folder solutions/MySolution
pac solution import --path MySolution.zip
```

Don't commit the `.zip` files — they're in `.gitignore`.
