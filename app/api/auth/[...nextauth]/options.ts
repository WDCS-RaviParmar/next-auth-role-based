import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    pages: {
        signIn: "/signin",
        // signOut: '/signout'
    },
    providers:[
        GithubProvider({
            profile(profile: GithubProfile){
                return {
                    ...profile,
                    role: profile?.role ?? "user" //  you can use this || insted of ??,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            // name: "Credentials",
            // type
            // credentials: 
            // {
                // username: {
                //     label: "User name",
                //     placeholder: "Enter Username",
                //     type: "text"
                // },
                // password: {
                //     label: "Password",
                //     placeholder: "Enter Password",
                //     type: "password"
                // }
            // },
            async authorize(credentials) {
                console.log("dfgerthtrjytkj", credentials);
                
                const admin = { name: "Ravi", password: "123", role: "admin" }
                const manager = { name: "Neni", password: "123", role: "manager" }
                if (credentials?.username === admin.name && credentials?.password === admin.password) {
                    return admin
                } else if (credentials?.username === manager.name && credentials?.password === manager.password) {
                    return manager
                } else {
                    return {name: credentials?.username, password: credentials?.password, role: "user"}
                }
            },
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