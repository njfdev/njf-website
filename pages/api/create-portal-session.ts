import { baseUrl } from 'lib/helpers';
import { getSupabase } from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Stripe from 'stripe';
import { getSession } from 'supertokens-node/recipe/session';

const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getSession(req, res);
        const supabaseUserClient = await getSupabase(session.userDataInAccessToken.supabase_token);

        const { data: { customer_id }, error } = await supabaseUserClient
            .from('users')
            .select('customer_id')
            .single();
        
        if (error) {
            console.error(error);
            res.send(400);
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: null });

        const returnUrl = baseUrl;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customer_id,
            return_url: returnUrl
        });

        res.redirect(303, portalSession.url);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'subscription_create_failed',
            error: e,
        })
    }
}

const handler = nc({ attachParams: true })
    .post(createSubscription)
    
export default handler;