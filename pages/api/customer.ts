import { baseUrl } from 'lib/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Stripe from 'stripe';

const createCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: null });
        const { email, name } = req.body;

        const customer = await stripe.customers.create({
            email,
            name,
        });

        // TODO: Store the customer object or ID to supabase
        console.log(customer);

        res.status(200).json({
            code: 'customer_created',
            customer,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'customer_creation_failed',
            error: e,
        });
    }
}

const handler = nc({ attachParams: true }).post(createCustomer);

export default handler;