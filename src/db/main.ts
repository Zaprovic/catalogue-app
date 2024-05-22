import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

dotenv.config();

// fixed: .env needed to be loaded ahead of time
const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client);
