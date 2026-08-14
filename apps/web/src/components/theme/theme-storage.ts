import type { Theme } from "@/components/theme/theme-context";

/** Keep in sync with the blocking bootstrap script in `apps/web/index.html`. */
export const THEME_STORAGE_KEY = "viziers-vault-web-ui-theme";

export const THEME_COLOR_LIGHT = "#ffffff";
export const THEME_COLOR_DARK = "#121212";

export function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light" || value === "system";
}

export function resolveTheme(theme: Theme, prefersDark: boolean): "dark" | "light" {
  if (theme === "system") return prefersDark ? "dark" : "light";
  return theme;
}

export function applyResolvedTheme(theme: Theme) {
  const resolved = resolveTheme(theme, window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", resolved === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
}
