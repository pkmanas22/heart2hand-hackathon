import { fetchUserDetails } from '@/lib/firebase/utils';
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

interface token extends JWT {
    role: string;
    id: string;
};

interface user extends AdapterUser {
    role: string;
    id: string;
}

// export interface session extends Session {
//     user?: {
//         id: string;
//         role: string
//         name?: string | null
//         email?: string | null
//         image?: string | null
//     }
// };

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & {
            id: string;
            role: string;
        };
    }
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "email",
                },
                password: {
                    label: "password:",
                    type: "password",
                }
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = credentials as {
                        email: string,
                        password: string
                    };

                    if (!email || !password) {
                        console.error("Email and password are required");
                        return null; // Return null for invalid input
                    }

                    const user = await fetchUserDetails(email);

                    if (!user || !user.hashedPassword) {
                        console.error("Invalid credentials");
                        return null; // Return null for invalid credentials
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        password,
                        user.hashedPassword
                    );

                    if (!isCorrectPassword) {
                        console.error("Invalid password");
                        return null; // Return null if the password is incorrect
                    }

                    // Successfully authenticated
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null; // Always return null on error
                }
            }

        })
    ],
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        jwt: async ({ token, user }) => {
            const newToken: token = token as token;
            const myUser: user = user as user;
            // console.log("user", user)
            if (user) {
                newToken.role = myUser.role;
                newToken.id = myUser.id
            }
            // console.log("token, token");
            return token;
        },
        session: async ({ session, token }) => {
            const newSession = session;
            if (newSession.user && token.id) {
                newSession.user.id = token.id as string;
                newSession.user.role = token.role as string;
            } else {
                console.error("session error occurred")
            }
            return newSession;
        },
    },
    pages: {
        signIn: "/signin"
    }
})

export { handler as GET, handler as POST }