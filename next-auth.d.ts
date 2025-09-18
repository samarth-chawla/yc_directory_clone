// declare module "next-auth" {
//   interface Session {
//     id?: string;
//   }
//   interface JWT {
//     id?: string;
//   }
// }
// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string; // ✅ this matches your session callback
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
