import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginQuery from "@tanstack/eslint-plugin-query";
import convexPlugin from "@convex-dev/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typegpu from "eslint-plugin-typegpu";
import { fileURLToPath } from "node:url";

const tsconfigRootDir = fileURLToPath(new URL(".", import.meta.url));

export default [
  {
    ignores: [
      "node_modules",
      "**/node_modules",
      "**/dist",
      "**/dist-electron/**",
      "**/release/**",
      "apps/app/resources/**",
      "apps/app/public/**",
      "apps/app/docker/**",
      "apps/app/convex/_generated/**",
      "apps/app/src/routeTree.gen.ts",
      "apps/web/src/routeTree.gen.ts",
      "apps/web/dist/**",
      "convex/**/*.test.ts",
      "apps/app/convex/**/*.test.ts",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: {
          // allow running with TS default project options for files that
          // aren't part of any tsconfig (e.g. `eslint.config.js`)
          allowDefaultProject: ["eslint.config.js", "vite.config.ts"],
        },
        tsconfigRootDir,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Type-aware TS rules (avoid false positives from base rules)
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Replace oxlint "react" correctness subset
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],

      // Replace Vite+ oxlint rule "prefer-vite-plus-imports"
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["vitest"], message: "Use `vite-plus/test`." },
            {
              group: ["vitest/*"],
              message: "Use `vite-plus/test/*`.",
            },
            { group: ["vitest/config"], message: "Use `vite-plus`." },

            { group: ["@vitest/browser"], message: "Use `vite-plus/test/browser`." },
            {
              group: ["@vitest/browser/*"],
              message: "Use `vite-plus/test/browser/*`.",
            },
            {
              group: ["@vitest/browser-playwright"],
              message: "Use `vite-plus/test/browser-playwright`.",
            },
            {
              group: ["@vitest/browser-playwright/*"],
              message: "Use `vite-plus/test/browser-playwright/*`.",
            },
            {
              group: ["@vitest/browser-preview"],
              message: "Use `vite-plus/test/browser-preview`.",
            },
            {
              group: ["@vitest/browser-preview/*"],
              message: "Use `vite-plus/test/browser-preview/*`.",
            },
          ],
        },
      ],
    },
  },

  // TypeGPU 'use gpu' pitfalls (AST-only; safe without type info).
  {
    ...typegpu.configs.recommended,
    files: ["apps/app/**/*.{js,mjs,ts,jsx,tsx}"],
  },

  // TanStack Query rules (AST-only; safe without type info).
  ...pluginQuery.configs["flat/recommended"],

  // Convex rules (some require type-aware linting).
  ...convexPlugin.configs.recommended,

  // Additional Convex hardening for this template.
  // Do not override projectService here: the top-level service already
  // discovers convex/tsconfig.json, and reconfiguring it drops
  // allowDefaultProject for eslint.config.js.
  {
    files: ["apps/app/convex/**/*.ts"],
    rules: {
      "@convex-dev/no-collect-in-query": "error",
    },
  },

  // Electron main/preload + shared types (Node, tsconfig.node.json).
  // Do not list these paths in allowDefaultProject — they are already in
  // tsconfig.node.json; dual membership makes typed lint fail to parse.
  {
    files: ["apps/app/electron/*.ts", "apps/app/shared/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: {
          defaultProject: "./apps/app/tsconfig.node.json",
        },
        tsconfigRootDir,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Preload/main are not React Fast Refresh modules.
      "react-refresh/only-export-components": "off",
    },
  },

  // TanStack file routes export `Route` plus page components.
  {
    files: ["apps/web/src/routes/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  // Bun/Node scripts + root builder configs (no TS project).
  {
    files: ["apps/app/scripts/**/*.{js,mjs,cjs}", "apps/app/electron-builder.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
];
