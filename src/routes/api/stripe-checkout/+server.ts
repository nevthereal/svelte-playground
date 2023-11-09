import type { RequestHandler } from './$types';
import Stripe from 'stripe';

const stripeKey = import.meta.env.VITE_STRIPE_API_KEY;
const stripe = new Stripe(stripeKey, {
	apiVersion: '2023-10-16'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;

	let lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
