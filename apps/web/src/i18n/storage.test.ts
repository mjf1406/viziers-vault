import { expect, test } from "vite-plus/test";

import { LANGUAGE_STORAGE_KEY } from "./storage";

test("language storage key matches the app so the preference carries over", () => {
  expect(LANGUAGE_STORAGE_KEY).toBe("viziers-vault-app-language");
});
