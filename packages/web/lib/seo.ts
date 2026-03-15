/** @format */

import type { Metadata } from "next";

function ensureAbsoluteUrl(input?: string | null): string {
    const raw = (input || "").trim();
    if (!raw) return "http://localhost:3000";
    try {
        new URL(raw);
        return raw;
    } catch {}
    const candidate = `https://${raw.replace(/^\/+/, "")}`;
    try {
        new URL(candidate);
        return candidate;
    } catch {
        return "http://localhost:3000";
    }
}

const siteUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const isProd =
    /^https?:\/\//.test(siteUrl) && !/localhost|127\.0\.0\.1/.test(siteUrl);

export const seoDefaults = {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Vizier's Vault",
    locale: "en_US",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Generate magic shops, encounters, spellbooks, battle maps, and worlds for D&D 5e 2024",
};

export function buildBaseMetadata(): Metadata {
    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: seoDefaults.siteName,
            template: "%s | " + seoDefaults.siteName,
        },
        description: seoDefaults.description,
        icons: {
            icon: [
                { url: "/api/favicon", rel: "icon", type: "image/x-icon" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            ],
            apple: "/apple-touch-icon.png",
            other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
        },
        manifest: "/site.webmanifest",
    };
}
