import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth, { Session, NextAuthOptions, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultUser;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
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

    async signIn({ profile }) {
      try {
        await connectToDB();

        if (profile) {
          const userExists = await User.findOne({
            email: profile.email,
          });

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name?.replaceAll(" ", "_").toLowerCase(),
              image: profile.image,
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
