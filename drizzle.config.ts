import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
