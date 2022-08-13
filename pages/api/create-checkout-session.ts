import { baseUrl } from 'lib/helpers';
import { getSupabase, getServerSupabase } from 'lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Stripe from 'stripe';
import { getSession } from 'supertokens-node/recipe/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: null });

const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user_session = await getSession(req, res);
        // @ts-ignore
        const supabaseUserClient = await getSupabase(user_session.userDataInAccessToken.supabase_token);

        const { data: data_user, error: error_user } = await supabaseUserClient.from("users").select().single();

        if (error_user) {
            console.error(error_user);
            res.status(400).json(error_user);
            return
        }

        let customerId = data_user.customer_id;

        if (!customerId) {
            const customer = await stripe.customers.create();
            customerId = customer.id;

            const { error } = await (await getServerSupabase()).from("users").update({ customer_id: customerId }).match({ id: data_user.id });

            if (error) {
                console.error(error);
                res.status(400).json(error);
                return
            }
        } else {
            const customer = await stripe.customers.retrieve(customerId);

            if (customer.deleted) {
                const customer = await stripe.customers.create();
                customerId = customer.id;
    
                const { error } = await (await getServerSupabase()).from("users").update({ customer_id: customerId }).match({ id: data_user.id });
    
                if (error) {
                    console.error(error);
                    res.status(400).json(error);
                    return
                }
            }
        }

        const { priceId } = req.body;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            customer: customerId,
            success_url: `${baseUrl}/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cancel`
        });

        res.redirect(303, session.url);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'subscription_create_failed',
            error: e,
        })
    }
}

const createNewCustomer = () => {
    
}

const handler = nc({ attachParams: true })
    .post(createSubscription)

export default handler;