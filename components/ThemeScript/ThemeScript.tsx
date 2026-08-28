/**
 * Sets data-theme before first paint so there is no flash of the wrong theme.
 * Runs in <head>, so it stays tiny and dependency-free.
 */
const script = `(function(){try{var m=localStorage.getItem("kieran-theme");document.documentElement.dataset.theme=(m==="light"||m==="dark")?m:"system"}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
