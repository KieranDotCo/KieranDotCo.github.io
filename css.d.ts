// Next.js declares `*.module.css` (next/types/global.d.ts) but deliberately not
// plain `*.css`, on the basis that "TSC *doesn't check side-effecting imports*".
// TypeScript 6 does check them, so `import "./globals.css"` in app/layout.tsx
// fails with TS2882 under a TS 6 language server (VS Code bundles its own).
//
// Deliberately narrow. A blanket `declare module "*.css"` also matches
// `*.module.css` — the two patterns tie on specificity, so it shadows Next's
// declaration and silently degrades every CSS Module import to `any`. This
// pattern cannot match a `.module.css` path, so the two never compete.
declare module "*/globals.css";
