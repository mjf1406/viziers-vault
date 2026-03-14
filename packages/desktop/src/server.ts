/** @format */

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";
import * as schema from "shared/schema";
import path from "node:path";
import { createAdaptorServer } from "@hono/node-server";

const PORTS = [3001, 3002, 3003, 3004, 3005];

function listenAsync(
	server: ReturnType<typeof createAdaptorServer>,
	port: number,
): Promise<number | null> {
	return new Promise((resolve, reject) => {
		server.once("error", (err: NodeJS.ErrnoException) => {
			if (err.code === "EADDRINUSE") resolve(null);
			else reject(err);
		});
		server.listen(port, () => resolve(port));
	});
}

export async function startLocalServer(userDataPath: string): Promise<number> {
	const dbPath = path.join(userDataPath, "pglite-data");
	const client = new PGlite(dbPath);
	const db = drizzle(client, { schema });

	const app = new Hono()
		.use(cors())
		.get("/", (c) => c.text("Hello Hono!"))
		.get("/hello", async (c) => {
			const data: ApiResponse = {
				message: "Hello BHVR!",
				success: true,
			};
			return c.json(data, { status: 200 });
		})
		.get("/health", async (c) => {
			try {
				await db.execute(sql`SELECT 1`);
				return c.json(
					{
						message: "OK! Server is running. Database connected.",
						success: true,
					} satisfies ApiResponse,
					{ status: 200 },
				);
			} catch {
				return c.json(
					{
						message: "OK! Server is running. Database not configured or unreachable.",
						success: true,
					} satisfies ApiResponse,
					{ status: 200 },
				);
			}
		});

	const server = createAdaptorServer({ fetch: app.fetch });
	for (const port of PORTS) {
		const result = await listenAsync(server, port);
		if (result !== null) {
			console.log(`Local API: http://localhost:${result}`);
			return result;
		}
	}
	throw new Error(`All ports ${PORTS.join(", ")} are in use`);
}
