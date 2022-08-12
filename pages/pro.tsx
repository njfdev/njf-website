import CheckoutForm from "components/CheckoutForm";
import { Button, H2, Input } from "components/CustomTags";
import { useState } from "react";

export default function ProPage() {
    return (
        <div className="">
            <H2>Monthly - $5</H2>
            <form action="/api/create-checkout-session" method='POST'>
                <Input type='hidden' name='priceId' value='price_1LVKZaCDK4ggXhY0r9lrgls0' />
                <Input type='submit' value='Checkout' />
            </form>
        </div>
    )
}