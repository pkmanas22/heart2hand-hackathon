'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
})

interface CheckoutSessionParams {
    amount: number
    requestId: string
    donorEmail: string
    recipientName: string
    requestTitle: string
}

export async function createCheckoutSession({
    amount,
    requestId,
    recipientName,
    requestTitle,
}: CheckoutSessionParams) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Donation for ${recipientName}'s Request`,
                            description: requestTitle,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/request/${requestId}`,
            metadata: {
                requestId,
            },
        })
        // console.log(session)

        if (!session.url) {
            throw new Error('Failed to create checkout session')
        }

        return session.url
    } catch (error) {
        console.error('Error creating checkout session:', error)
        throw error
    }
}

