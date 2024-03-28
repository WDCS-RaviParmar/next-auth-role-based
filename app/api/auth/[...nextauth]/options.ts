import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitterProvider from "next-auth/providers/twitter";

export const options: NextAuthOptions = {
    pages: {
        signIn: "/signin",
        // signOut: '/signout'
    },
    providers:[
        GithubProvider({
            profile(profile){
                return {
                    ...profile,
                    role: profile?.role ?? "user" //  you can use this || insted of ??,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            async authorize(credentials){
                return 
            }
        })
    ],
    callbacks: {
        async jwt({token,user}){
            if(user) token.role = user.role
            return token
        },
        async session({token,session}){
            if(session.user) session.user.role = token.role
            return session
        }
    }
}