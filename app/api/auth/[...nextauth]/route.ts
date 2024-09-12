import User from "@models/user";
import NextAuth, { Session, NextAuthOptions, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface Profile {
  email: string;
  username: string;
  picture: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultUser;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }: { session: Session }) {
      if (session.user?.email) {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }

      return session;
    },

    async signIn({ profile }: { profile?: Profile | null }) {
      try {
        if (profile) {
          const userExists = await User.findOne({
            email: profile.email,
          });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.username.replace(" ", "_").toLowerCase(),
              image: profile.picture,
            });
          }
        }

        return true; // Allow sign-in
      } catch (e) {
        console.error(e);
        return false; // Deny sign-in on error
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
