import { expect, test } from "vite-plus/test";
import { getPageMeta, SITE } from "./site";

test("marketing origin is www, app origin is app", () => {
  expect(SITE.url).toBe("https://www.viziersvault.com");
  expect(SITE.appUrl).toBe("https://app.viziersvault.com");
});

test("known routes have titles", () => {
  expect(getPageMeta("/about").title).toContain("About");
  expect(getPageMeta("/terms-of-service").title).toContain("Terms");
});
