import { useState } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface CheckoutFormProps {
    customerId: string;
    priceId: string;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
    const [error, setError] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    function handleCardInputChange(event) {
        setDisabled(event?.empty);
        setError(event?.error?.message ?? '');
    }

    async function handleCheckoutFormSubmit(event) {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe has not loaded yet
            return;
        }

        const subscriptionResponse = await fetch(
            '/api/subscribe',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId: props.customerId, priceId: props.priceId }),
            }
        );

        const subscription = await subscriptionResponse.json();

        const stripePayload = await stripe.confirmCardPayment(
            subscription.clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }
        );

        if (stripePayload.error) {
            setError(stripePayload.error.message);
        }
    }

    return (
        <form onSubmit={handleCheckoutFormSubmit}>
            <CardElement onChange={handleCardInputChange} />
            <button
                disabled={!stripe && disabled}
                type='submit'
            >
                Pay Now        
            </button>
        </form>
    )
}