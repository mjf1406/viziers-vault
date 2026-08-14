import { RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

import { getPageMeta, ogElements, SITE } from "./lib/site";
import { createAppRouter } from "./router";

const MARKETING_LINKS = new Set([
  "/about",
  "/pricing",
  "/faq",
  "/team",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/404",
]);

function shimBrowserGlobals(url: string) {
  if (typeof globalThis.window !== "undefined") return;

  const parsed = new URL(url, SITE.url);
  const locationLike = {
    href: parsed.href,
    origin: parsed.origin,
    protocol: parsed.protocol,
    host: parsed.host,
    hostname: parsed.hostname,
    port: parsed.port,
    pathname: parsed.pathname,
    search: parsed.search,
    hash: parsed.hash,
    assign() {},
    replace() {},
    reload() {},
    toString() {
      return parsed.href;
    },
  };

  const classList = {
    add() {},
    remove() {},
    contains: () => false,
    toggle: () => false,
  };

  const documentLike = {
    documentElement: { classList, style: {} },
    body: { classList },
    head: { appendChild() {}, removeChild() {} },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: () => ({
      setAttribute() {},
      getAttribute: () => null,
      style: {},
      classList,
    }),
    addEventListener() {},
    removeEventListener() {},
    cookie: "",
  };

  const localStorage = {
    getItem: () => null,
    setItem() {},
    removeItem() {},
    clear() {},
    key: () => null,
    length: 0,
  };

  const windowLike = {
    location: locationLike,
    history: {
      state: null,
      length: 1,
      scrollRestoration: "auto",
      pushState() {},
      replaceState() {},
      go() {},
      back() {},
      forward() {},
    },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return true;
    },
    requestAnimationFrame(cb: (time: number) => void) {
      return setTimeout(() => cb(0), 0) as unknown as number;
    },
    cancelAnimationFrame(id: number) {
      clearTimeout(id);
    },
    matchMedia: () => ({
      matches: false,
      media: "",
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent() {
        return false;
      },
      onchange: null,
    }),
    localStorage,
    sessionStorage: localStorage,
    navigator: { userAgent: "prerender" },
    document: documentLike,
    innerWidth: 1280,
    innerHeight: 720,
    devicePixelRatio: 1,
  };

  Object.defineProperty(globalThis, "window", { value: windowLike, configurable: true });
  Object.defineProperty(globalThis, "document", { value: documentLike, configurable: true });
  if (!("localStorage" in globalThis)) {
    Object.defineProperty(globalThis, "localStorage", { value: localStorage, configurable: true });
  }
}

export async function prerender({ url }: { url: string }) {
  try {
    shimBrowserGlobals(url);
    const parsed = new URL(url, SITE.url);
    const pathname = parsed.pathname === "" ? "/" : parsed.pathname;
    const router = createAppRouter(pathname);
    await router.load();

    const html = renderToString(<RouterProvider router={router} />);
    const meta = getPageMeta(pathname);

    return {
      html,
      links: MARKETING_LINKS,
      head: {
        lang: "en",
        title: meta.title,
        elements: new Set(ogElements(pathname, pathname)),
      },
    };
  } catch (error) {
    console.error("[prerender]", url, error);
    throw error;
  }
}
