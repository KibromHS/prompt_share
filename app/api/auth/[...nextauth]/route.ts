import NextAuth, { SessionOptions } from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    async session({ session } : {session: any}) {},

    async signIn({ profile } : {profile: any}) {}
});

export { handler as GET, handler as POST };