/** @format */

import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
	const faviconPath = path.resolve(
		process.cwd(),
		"..",
		"shared",
		"src",
		"favicon.ico",
	);

	try {
		const iconBuffer = await readFile(faviconPath);
		return new Response(iconBuffer, {
			headers: {
				"content-type": "image/x-icon",
				"cache-control": "public, max-age=31536000, immutable",
			},
		});
	} catch {
		return new Response("Favicon not found", { status: 404 });
	}
}
