/** @format */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { sql } from "drizzle-orm";
import type { ApiResponse } from "shared";
import { createDb } from "./db";

type Env = { Bindings: { DATABASE_URL: string } };

export const app = new Hono<Env>()
	.use(cors())
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/hello", async (c) => {
		const data: ApiResponse = {
			message: "Hello BHVR!",
			success: true,
		};
		return c.json(data, { status: 200 });
	})
	.get("/health", async (c) => {
		try {
			const db = createDb(c.env.DATABASE_URL);
			await db.execute(sql`SELECT 1`);
			return c.json(
				{ message: "OK! Server is running. Database connected.", success: true } satisfies ApiResponse,
				{ status: 200 },
			);
		} catch (e) {
			return c.json(
				{
					message: "OK! Server is running. Database not configured or unreachable.",
					success: true,
				} satisfies ApiResponse,
				{ status: 200 },
			);
		}
	});

export default app;
