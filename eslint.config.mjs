import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15.x is still eslintrc-shaped, so it needs FlatCompat to
// work under ESLint 9's flat config.
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: [".next/**", "out/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
