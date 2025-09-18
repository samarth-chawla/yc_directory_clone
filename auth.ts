// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { client } from "./sanity/lib/client";
// import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queies";
// import { writeClient } from "./sanity/lib/write-client";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
//   callbacks: {
//     async signIn({ user, profile }) {
//       const author = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//         githubId: profile?.id,
//       });
//       if (!author) {
//         await writeClient.create({
//           _type: "author",
//           _id: profile?.id,
//           id: profile?.id,
//           name: profile?.name,
//           username: profile?.login,
//           email: user?.email,
//           image: user?.image,
//           bio: profile?.bio || "",
//         });
//         if (author) return true;
//       }
//       return true;
//     },
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const user = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//           githubId: profile?.id,
//         });
//         if (user) {
//           token.id = user._id;
//         }
//       }
//       return token;
//     },
//     async session({session,token}){
//       if(token){
//         session.user.id = token.id as string
//       }
//       return session;
//       // Object.assign(session, {id: token.id})
//     }
//   },
// });
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_ID } from "./sanity/lib/queies";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile?.id?.toString()) return false;

      let author = await client.fetch(AUTHOR_BY_ID, {
        githubId: profile.id,
      });

      if (!author) {
        author = await writeClient.createIfNotExists({
          _type: "author",
          _id: String(profile.id),
          id: String(profile.id),
          name: profile.name ?? user.name,
          username: (profile as any).login,
          email: user.email,
          image: user.image,
          bio: (profile as any).bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      
      // Only runs on initial sign-in
      if (account && profile?.id) {
        console.log("Account in JWT callback:", account);
        console.log("Profile in JWT callback:", profile);
        // console.log("Account and profile detected in JWT callback", profile._id);
        const author = await client.fetch(AUTHOR_BY_ID, {
          githubId: String(profile.id),
        });
        console.log("Fetched author:", author);

        if (author) {
          token.id = author.id; // ✅ save _id permanently
        }
      }

      // console.log("JWT after:", token);
      return token;
    },
    
    async session({session,token}){
      if(token){
        session.user.id = token.id as string
        Object.assign(session.user, {id: token.id})
      }
      return session;
    }
  },
});
