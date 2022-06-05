import clientPromise from "lib/mongodb";
import { hash } from 'bcryptjs';
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: "Invalid Data" });
            return;
        }

        const client = await MongoClient.connect(
            process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db("main");

        const isExisting = await db
            .collection('users')
            .findOne({ email: email });
        
        if (isExisting) {
            res.status(422).json({ message: "User Already Exists" })
            return;
        }

        const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        });

        res.status(201).json({ message: "User Created", ...status });
    } else {
        res.status(500).json({ message: "Route Not Valid" })
    }
}

export default handler;