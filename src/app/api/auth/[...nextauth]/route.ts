import { handlers } from "@/auth";
import NextAuth from "next-auth";

export const { GET, POST } = handlers;

export const {
  handlers: routeHandlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [],
});
