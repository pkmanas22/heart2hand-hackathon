import { fetchUserDetails } from '@/lib/firebase/utils';
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

interface token extends JWT {
    role: string;
    uid: string;
};

interface user extends AdapterUser {
    role: string;
    uid: string;
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
                        throw Error("Email and password are required");
                    }

                    const user = await fetchUserDetails(email);
                    // console.log("Fetched user:", user);

                    if (!user || !user.hashedPassword) {
                        throw Error("Invalid credentials");
                    }

                    const isCorrectPassword =await bcrypt.compare(
                        password,
                        user.hashedPassword
                    );

                    // console.log("Password match:", isCorrectPassword);

                    if (!isCorrectPassword) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorize Error:", error);
                    return error;
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        jwt: async ({ token, user }) => {
            const newToken: token = token as token;
            const myUser: user = user as user;
            
            if (user) {
                newToken.role = myUser.role;
                newToken.uid = myUser.uid
            }
            // console.log(token);
            return token;
        },
        session: async ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    uid: token.uid,
                    role: token.role,
                },
            };
        },
    },
    pages: {
        signIn: "/signin"
    }
})

export { handler as GET, handler as POST }