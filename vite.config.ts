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
  run: {
    tasks: {
      "app:ds": {
        command: "vp run --filter @vv/app --fail-if-no-match ds",
        cache: false,
      },
      "web:dev": {
        command: "vp run --filter @vv/web --fail-if-no-match dev",
        cache: false,
      },
      /** App ds (perms + Vite + Convex) and marketing site dev in parallel. */
      "ds:servers": {
        command: "echo Dev stacks stopped.",
        dependsOn: ["app:ds", "web:dev"],
        cache: false,
      },
    },
  },
});
