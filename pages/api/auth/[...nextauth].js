import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import { compare } from "bcryptjs";
import { MongoClient } from "mongodb";

export default NextAuth({
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM
        }),
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

                return { email: user.email, username: user.username };
            },
        }),
    ],
});