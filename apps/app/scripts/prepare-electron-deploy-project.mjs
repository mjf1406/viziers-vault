/**
 * Copy convex/ + install production deps into resources/deploy-project for packaged first-run deploy.
 * Root .gitignore already ignores resources/deploy-project — do not write a nested .gitignore that
 * excludes node_modules (electron-builder honors it and ships an empty deploy tree).
 */
import { $ } from "bun";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(appRoot, "../..");
const out = path.join(appRoot, "resources", "deploy-project");
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, "scripts"), { recursive: true });

await cp(path.join(appRoot, "convex"), path.join(out, "convex"), { recursive: true });
await cp(path.join(repoRoot, "patches"), path.join(out, "patches"), { recursive: true });
const pkg = JSON.parse(await readFile(path.join(appRoot, "package.json"), "utf8"));
delete pkg.dependencies?.["@vv/ui"];
await writeFile(path.join(out, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
await cp(path.join(appRoot, "tsconfig.json"), path.join(out, "tsconfig.json"));
await cp(path.join(appRoot, "tsconfig.app.json"), path.join(out, "tsconfig.app.json"));
await cp(
  path.join(appRoot, "scripts", "self-host-bootstrap.mjs"),
  path.join(out, "scripts", "self-host-bootstrap.mjs"),
);
await cp(
  path.join(appRoot, "scripts", "convexFingerprint.mjs"),
  path.join(out, "scripts", "convexFingerprint.mjs"),
);

console.log("Installing deploy-project production dependencies...");
await $`bun install --ignore-scripts --production`.cwd(out);
console.log(`Deploy project ready at ${out}`);
