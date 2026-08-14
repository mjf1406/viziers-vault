import { expect, test } from "vite-plus/test";
import { DESKTOP_DOWNLOADS, getPageMeta, SITE } from "./site";

test("marketing origin is www, app origin is app", () => {
  expect(SITE.url).toBe("https://www.viziersvault.com");
  expect(SITE.appUrl).toBe("https://app.viziersvault.com");
});

test("desktop downloads point at latest GitHub release assets", () => {
  expect(DESKTOP_DOWNLOADS.windows).toContain("/releases/latest/download/");
  expect(DESKTOP_DOWNLOADS.windows).toContain("Setup-Windows.exe");
  expect(DESKTOP_DOWNLOADS.mac).toContain("macOS.dmg");
  expect(DESKTOP_DOWNLOADS.ubuntu).toContain("Linux.AppImage");
});

test("known routes have titles", () => {
  expect(getPageMeta("/about").title).toContain("About");
  expect(getPageMeta("/terms-of-service").title).toContain("Terms");
});
