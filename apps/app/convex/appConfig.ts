/**
 * TEMPLATE: Single brand config — change these when cloning (`bun run post-clone`).
 * **vctr** = template package name; **classclarus** slug/URLs = sample product (ClassClarus).
 * Brand images: `public/brand/`. Template favicon: `public/vctr/vctr-favicon.webp`.
 * `name` is never translated — i18n uses it via defaultVariables.appName.
 */
export const APP_CONFIG = {
  name: "Vizier's Vault",
  /** Storage keys (`${slug}-…` via src/lib/storageKeys.ts) and package-name check. */
  slug: "viziers-vault-app",
  /** Appended after name in the document title (`Name | suffix`). */
  titleSuffix: "App",
  /** Canonical app origin (printed join URLs, production deep links). */
  appUrl: "https://app.viziersvault.com",
  marketingUrl: "https://www.viziersvault.com",
  privacyUrl: "https://www.viziersvault.com/privacy-policy",
  termsUrl: "https://www.viziersvault.com/terms-of-service",
  cookieUrl: "https://www.viziersvault.com/cookie-policy",
  changeLog: "https://change-log.pages.dev/viziers-vault",
  roadMap: "https://change-log.pages.dev/viziers-vault/board",
  github: "https://github.com/mjf1406/viziers-vault-app",
  /** Electron / desktop release landing page. Billing Free downloads use desktopDownloads.ts. */
  downloadUrl: "https://github.com/mjf1406/viziers-vault-app/releases/latest",
  /** Self-hosting docs (billing Free card). Change when cloning. */
  selfHostUrl: "https://github.com/mjf1406/viziers-vault-app/blob/master/docs/SELF_HOSTING.md",
  /** Tip / gift links (billing page; replace placeholders). */
  kofiUrl: "https://ko-fi.com/michaelfitzgerald1406",
  patreonUrl: "https://www.patreon.com/cw/MichaelFitzgerald",
  /** Product-level authz namespace — set before first real deploy; rematerialize if changed later. */
  authzTenantId: "viziers-vault-app",
  /** Browser chrome — hex (meta theme-color is unreliable with oklch). */
  themeColors: {
    light: "#ffffff",
    /** Match `.dark --background` feel (oklch 0.145 ≈ #252525). */
    dark: "#252525",
  },
  /** Keep aligned with page background. */
  backgroundColors: {
    light: "#ffffff",
    dark: "#252525",
  },
  /**
   * App-managed card-less trial (not Polar-native).
   * `days` is the grant length; warn/force control the upgrade banner.
   */
  trial: {
    days: 90,
    warnWithinDays: 14,
    forceWithinDays: 3,
  },
  /**
   * Upload size limits and per-user storage quota.
   * Tunable without touching preset MIME lists — keep under Convex action return
   * limits (16 MiB) so private byte serving stays viable.
   */
  uploads: {
    quotaBytes: 100 * 1024 * 1024,
    maxSizeBytes: {
      images: 2 * 1024 * 1024,
      documents: 500 * 1024,
      audio: 5 * 1024 * 1024,
    },
  },
} as const;
