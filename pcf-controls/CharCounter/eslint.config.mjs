import eslintjs from "@eslint/js";
import microsoftPowerApps from "@microsoft/eslint-plugin-power-apps";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

export default [
  { ignores: ["**/generated", "out/**", "node_modules/**"] },
  eslintjs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...typescriptEslint.configs.stylistic,
  microsoftPowerApps.configs.paCheckerHosted,
  {
    plugins: { "@microsoft/power-apps": microsoftPowerApps },
    languageOptions: {
      globals: { ...globals.browser, ComponentFramework: true },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
    },
  },
];
