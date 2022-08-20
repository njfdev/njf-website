import { Webhook } from "svix";
import { buffer } from "micro";
import { getServerSupabase } from "lib/supabase";

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

    const supabase = await getServerSupabase()

    const user_id = msg.data.id;

    switch (msg.type) {
        case 'user.created': {
            const { error } = await supabase
                .from('users')
                .insert([
                    { id: user_id }
                ]);

            if (error) {
                console.log(error);
                res.status(500).json({ error })
                break;
            }

            res.send(201);
            break;
        }

        case 'user.updated': {
            const { data, error } = await supabase
                .from('users')
                .upsert({ id: user_id });

            if (error) {
                console.log(error);
                res.status(500).json({ error })
                break;
            }

            res.send(200);
            break;
        }

        case 'user.deleted': {
            const { error } = await supabase
                .from('users')
                .delete()
                .match({ id: user_id });

            if (error) {
                console.log(error);
                res.status(500).json({ error })
                break;
            }

            res.send(204);
            break;
        }

        default: {
            console.error('Clerk unhandled webhook')
            res.send(400);
            break;
        }
    }
}