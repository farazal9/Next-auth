import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env.local
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // ✅ Correct export for Next.js App Router
