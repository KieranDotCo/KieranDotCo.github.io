// TypeScript 6 checks side-effect imports (TS2882), and Next declares
// `*.module.css` but not plain `*.css` — so `import "./globals.css"` needs this.
//
// Keep it narrow. A blanket `declare module "*.css"` ties with `*.module.css` on
// specificity, shadows Next's declaration, and silently degrades every CSS
// Module import to `any`.
declare module "*/globals.css";
