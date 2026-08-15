export const SITE = {
  name: "Vizier's Vault",
  description:
    "Generate magic shops, encounters, spellbooks, battle maps, and worlds for D&D 5e 2024",
  url: "https://www.viziersvault.com",
  appUrl: "https://app.viziersvault.com",
  githubUrl: "https://github.com/mjf1406/viziers-vault-app",
  downloadUrl: "https://github.com/mjf1406/viziers-vault-app/releases/latest",
  selfHostUrl:
    "https://github.com/mjf1406/viziers-vault-app/blob/master/apps/app/docs/SELF_HOSTING.md",
  discordUrl: "https://discord.gg/",
} as const;

function latestDownloadUrl(artifact: string): string {
  return `${SITE.githubUrl}/releases/latest/download/${artifact}`;
}

/** Direct GitHub “latest release” asset URLs for the marketing download menu. */
export const DESKTOP_DOWNLOADS = {
  windows: latestDownloadUrl(`${SITE.name}-Setup-Windows.exe`),
  mac: latestDownloadUrl(`${SITE.name}-macOS.dmg`),
  ubuntu: latestDownloadUrl(`${SITE.name}-Linux.AppImage`),
} as const;

export const DEFAULT_TITLE = `${SITE.name} - D&D 5e Tools`;

export type PageMeta = {
  title: string;
  description: string;
};

export const PAGE_META: Record<string, PageMeta> = {
  "/": { title: DEFAULT_TITLE, description: SITE.description },
  "/about": { title: `About | ${SITE.name}`, description: SITE.description },
  "/pricing": { title: `Pricing | ${SITE.name}`, description: SITE.description },
  "/faq": { title: `FAQ | ${SITE.name}`, description: SITE.description },
  "/contact": { title: `Contact | ${SITE.name}`, description: SITE.description },
  "/privacy-policy": { title: `Privacy Policy | ${SITE.name}`, description: SITE.description },
  "/terms-of-service": { title: `Terms of Service | ${SITE.name}`, description: SITE.description },
  "/cookie-policy": { title: `Cookie Policy | ${SITE.name}`, description: SITE.description },
  "/404": { title: `Not Found | ${SITE.name}`, description: SITE.description },
};

export function getPageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] ?? PAGE_META["/"]!;
}

export function ogElements(pathname: string, canonicalPath: string) {
  const meta = getPageMeta(pathname);
  const url = `${SITE.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  return [
    { type: "meta", props: { name: "description", content: meta.description } },
    { type: "meta", props: { property: "og:title", content: meta.title } },
    { type: "meta", props: { property: "og:description", content: meta.description } },
    { type: "meta", props: { property: "og:type", content: "website" } },
    { type: "meta", props: { property: "og:url", content: url } },
    { type: "meta", props: { property: "og:site_name", content: SITE.name } },
    { type: "link", props: { rel: "canonical", href: url } },
  ];
}

export function routeHead(pathname: string) {
  const meta = getPageMeta(pathname);
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "website" },
    ],
  };
}
