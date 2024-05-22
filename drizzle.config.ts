import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: "libsql://catalogue-app-db-zaprovic.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTYzMzQ3MDYsImlkIjoiNzgxZjM5NzYtMTUwOC00OWNiLThlNjUtYzFjOTQzMDNhOTY0In0.j3ftQXdnASxsyR0zfVDls53EYHuYD8UcUST9in95V9Yqef2llCJHkoEFa5W3I2n15Xs-tlIOGVa_3p7pVV-JCg",
  },
});
