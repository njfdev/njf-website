import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
    },
}

const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

export default async function handler(req, res) {
    const payload = (await buffer(req)).toString();
    const headers = req.headers;

    const wh = new Webhook(secret);
    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
        return
    }

    console.log(msg)

    res.json({});
}