/*
Anything request starting 'api/auth/' will be considered handled by nextauth 
(ie it will be considered api/auth/nextauth/route.ts)
*/
import NextAuth, { CallbacksOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile: { login: string } }) {
      return profile.login === "DanB-Web";
    },
  } as unknown as CallbacksOptions,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

// Exposes GET and POST routes
export { handler as GET, handler as POST };
