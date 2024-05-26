import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// fix: added NEXT_PUBLIC_ to environment variables

const client = createClient({
  url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client);
