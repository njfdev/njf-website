import { baseUrl } from 'lib/helpers';
import { getSupabase } from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Stripe from 'stripe';
import { getSession, refreshSession, revokeSession } from 'supertokens-node/recipe/session';
import { deleteUser, init } from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

const runDeleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = JSON.parse(req.body);
        await deleteUser(body.userId);
        
        res.send(401);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: e,
        })
    }
}

const handler = nc({ attachParams: true })
    .post(runDeleteUser)
    
export default handler;