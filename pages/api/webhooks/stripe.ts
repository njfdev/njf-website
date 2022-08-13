import { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
import nc from 'next-connect';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { getSupabase } from 'lib/supabase';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handleStripeWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
    let event;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: null });

    try {
        event = await stripe.webhooks.constructEvent(
            await buffer(req),
            req.headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (e) {
        console.error(e);
        res.send(400);
    }

    switch (event.type) {
        case 'subscription.created': {
            const subscription = event.data.object;

            console.log(event.data.object)
            // You can use this to detect changes in the subscription
            // subscription.status will return the current status of the subscription

            // Things you can do here:
            // 1. Send a thank you email to the user
            // 2. Send content you've created that would enhance the user's experience/workflow
            break;
        }

        case 'customer.subscription.deleted':
        case 'customer.subscription.updated': {
            const subscription = event.data.object;

            console.log(event.data.object)
            // You can use this to detect changes in the subscription
            // subscription.status will return the current status of the subscription
            
            // Things you can do here:
            // 1. Send an email to the user notifying them about the change in subscription status
            // 2. If the user cancelled the subscription you could trigger
            // a email campaign to inform users of the benefits they're missing out on.
            break;
        }

        case 'invoice.payment_succeeded': {
            const invoice = event.data.object;

            const { error } = await (await getSupabase())
                .from('profiles_private')
                .update({ pro: true })
                .match({ customer_id: invoice.customer });

            if (error) {
                console.error(error);
                res.send(400);
            }

            // If you have trials, this event is triggered when the trial ended and the user was charged for continued access
            // Things you can do:
            // 1. Notify the user of the charge
            // 2. Thank them for their continued belief in your product
            // 3. Send additional content that could enable better workflows for the user
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object;

            const { error } = await (await getSupabase())
                .from('profiles_private')
                .update({ pro: false })
                .match({ customer_id: invoice.customer });

            if (error) {
                console.error(error);
                res.send(400);
            }

            break;
        }

        default: {
            console.error(`Unhandled event type: ${event.type}`);
            break;
        }
    }
    res.status(200);
}

const handler = nc({ attachParams: true }).post(handleStripeWebhook);

export default handler;