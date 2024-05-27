import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db/main";
import { AccountTable, SessionTable, users } from "./db/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: AccountTable,
    sessionsTable: SessionTable,
  }),
  providers: [Google],
});
