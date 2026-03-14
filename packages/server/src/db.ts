/** @format */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "shared/schema";

export function createDb(connectionString: string) {
	return drizzle(neon(connectionString), { schema });
}
