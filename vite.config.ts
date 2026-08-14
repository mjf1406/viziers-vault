import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {},
  check: {
    lint: false,
  },
  staged: {
    "*": "vp fmt --write",
    "*.{ts,tsx,js,jsx}": "bunx eslint --fix",
  },
  defaultPackage: {
    dev: "apps/app",
    build: "apps/app",
    preview: "apps/app",
  },
});
