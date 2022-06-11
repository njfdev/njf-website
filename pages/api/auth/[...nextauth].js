import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token }) {

            const client = await MongoClient.connect(
                process.env.MONGODB_URI,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
            const db = client.db("main");

            const users = await db.collection('users');
            const user = await users.findOne({
                email: token.email
            });

            if (!user) {
                return null;
            }

            token.first_name = user.first_name;
            token.last_name = user.last_name;
            token.username = user.username;
            token.data = user.data;

            return { ...token };
        },
        async session({ session, token }) {
            if (!token) {
                return null;
            }

            const user = {
                email: token.email,
                username: token.username,
                first_name: token.first_name,
                last_name: token.last_name,
                data: token.data,
            };

            return {
                user,
                expires: session.expires,
            };
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const client = await MongoClient.connect(
                    process.env.MONGODB_URI,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                const db = client.db("main");

                const users = await db.collection('users');
                const userByEmail = await users.findOne({
                    email: credentials.email_username,
                });
                const userByUsername = await users.findOne({
                    username: credentials.email_username,
                });

                if (!userByEmail && !userByUsername) {
                    client.close();
                    throw new Error('No Account Exists With The Provided Email Or Username');
                }

                const user = userByEmail ? userByEmail : userByUsername;

                const correctPassword = await compare(credentials.password, user.password);
                if (!correctPassword) {
                    throw new Error('The Provided Password Is Incorrect');
                }

                return {
                    email: user.email,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                };
            },
        }),
    ],
});