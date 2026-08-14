import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

import { ThemeProviderContext, type Theme } from "@/components/theme/theme-context";
import { applyResolvedTheme, isTheme, THEME_STORAGE_KEY } from "@/components/theme/theme-storage";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useLayoutEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (isTheme(stored) && stored !== theme) {
      setTheme(stored);
      applyResolvedTheme(stored);
      return;
    }
    applyResolvedTheme(theme);
  }, [storageKey, theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolvedTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: (next) => {
          window.localStorage.setItem(storageKey, next);
          setTheme(next);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
