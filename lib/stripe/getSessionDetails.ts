"use server"
import Stripe from "stripe";

export const getSessionDetails = async (sessionId: string) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-11-20.acacia",
    });

    const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.retrieve(sessionId);
    const amount = session.amount_total || 0;

    return {session, amount}
}