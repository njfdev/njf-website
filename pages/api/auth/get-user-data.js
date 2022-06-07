import { hash } from 'bcryptjs';
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;

        const email = body.session.user.email;

        const client = await MongoClient.connect(
            process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        const db = await client.db("main");

        const user = await db
            .collection('users')
            .findOne({ email: email });
        
        if (!user) {
            res.status(422).json({ message: "Could Not Find User Data For This Email" });
            client.close();
            return;
        }
        
        res.status(200).json({ message: "Your Account Has Been Created", user: user });
        client.close();
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

export default handler;