
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Simulating robust auth for prototype phase
                // REAL IMPLEMENTATION SHOULD USE DATABASE QUERY + BCRYPT
                if (
                    credentials.email === "admin@autoland.com" &&
                    credentials.password === "admin123"
                ) {
                    return {
                        id: "1",
                        name: "Master Admin",
                        email: "admin@autoland.com",
                        role: "admin",
                    }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})
