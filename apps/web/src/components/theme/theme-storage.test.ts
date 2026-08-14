import { expect, test } from "vite-plus/test";

import { isTheme, resolveTheme, THEME_STORAGE_KEY } from "./theme-storage";

test("storage key matches the blocking bootstrap in index.html", () => {
  expect(THEME_STORAGE_KEY).toBe("viziers-vault-web-ui-theme");
});

test("isTheme accepts only dark, light, and system", () => {
  expect(isTheme("dark")).toBe(true);
  expect(isTheme("light")).toBe(true);
  expect(isTheme("system")).toBe(true);
  expect(isTheme("auto")).toBe(false);
  expect(isTheme(null)).toBe(false);
});

test("resolveTheme follows system preference only for system", () => {
  expect(resolveTheme("system", true)).toBe("dark");
  expect(resolveTheme("system", false)).toBe("light");
  expect(resolveTheme("light", true)).toBe("light");
  expect(resolveTheme("dark", false)).toBe("dark");
});
