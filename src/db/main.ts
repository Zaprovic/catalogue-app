import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// todo: fix .env issue
const client = createClient({
  url: "libsql://catalogue-app-db-zaprovic.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTYzMzQ3MDYsImlkIjoiNzgxZjM5NzYtMTUwOC00OWNiLThlNjUtYzFjOTQzMDNhOTY0In0.j3ftQXdnASxsyR0zfVDls53EYHuYD8UcUST9in95V9Yqef2llCJHkoEFa5W3I2n15Xs-tlIOGVa_3p7pVV-JCg",
});

export const db = drizzle(client);
