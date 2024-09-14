import User from "@models/user";
import { connectToDB } from "@utils/database";
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

const authOptions = {
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
        await connectToDB();

        if (profile) {
          const userExists = await User.findOne({
            email: profile.email,
          });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.username?.replaceAll(" ", "_").toLowerCase(),
              image: profile.picture,
            });
          }
        }

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions as NextAuthOptions);

export default authOptions;

export { handler as GET, handler as POST };
