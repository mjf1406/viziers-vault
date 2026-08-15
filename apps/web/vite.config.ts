import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: lazyPlugins(() => [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(import.meta.dirname, "src/prerender.tsx"),
      additionalPrerenderRoutes: [
        "/about",
        "/pricing",
        "/faq",
        "/contact",
        "/privacy-policy",
        "/terms-of-service",
        "/cookie-policy",
        "/404",
      ],
    }),
  ]),
  build: {
    reportCompressedSize: false,
    sourcemap: false,
  },
});
