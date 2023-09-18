import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma!),
    callbacks: {

        async jwt({token, user, account, profile, isNewUser}) {
            try {
                if (isNewUser) {
                    //if (user?.image) await UserService.replaceSocialAccountImage(user as User);
                }
            } catch (e) {

            }

            return token
        },
        async session({session, token, user}) {
            if (token.sub) {
                const user = await prisma?.user.findUnique({
                    where: {
                        email: token.email as string
                    },
                    include: {
                        role : true,

                    }
                })
                session.user = user;
            }
            return session;
        }
        ,
    },


    // Configure one or more authentication providers
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

    ],
};