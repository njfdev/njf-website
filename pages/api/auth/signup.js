import clientPromise from "lib/mongodb";
import { hash } from 'bcryptjs';
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { fname, lname, email, username, password } = req.body;

        if (!email) {
            res.status(422).json({ message: "Please Provide An Email" });
            return;
        } else if (!email.includes('@')) {
            res.status(422).json({ message: "Please Provide A Vaild Email" });
            return;
        } else if (!username) {
            res.status(422).json({ message: "Please Provide A Username" });
            return;
        } else if (!password) {
            res.status(422).json({ message: "Please Provide A Password" });
            return;
        } else if (!fname || !lname) {
            res.status(422).json({ message: "Please Provide Your Full Name" });
            return;
        }

        const client = await MongoClient.connect(
            process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db("main");

        const userByEmail = await db
            .collection('users')
            .findOne({ email: email });

        const userByUsername = await db
            .collection('users')
            .findOne({ username: username });
        
        if (userByEmail) {
            res.status(422).json({ message: "An Account With This Email Is Already In Use" });
            client.close();
            return;
        } else if (userByUsername) {
            res.status(422).json({ message: "This Username Has Been Taken" });
            client.close();
            return;
        }

        const status = await db.collection('users').insertOne({
            first_name: fname,
            last_name: lname,
            email,
            username,
            password: await hash(password, 12),
        });

        res.status(201).json({ message: "Your Account Has Been Created", ...status });
        client.close();
    } else {
        res.status(500).json({ message: "Route Not Valid" })
    }
}

export default handler;