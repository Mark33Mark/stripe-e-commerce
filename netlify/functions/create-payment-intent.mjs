import Stripe from "stripe";

export default async (req, context) => {
	const requestBody = await req.json();

	// console.log("req = ", requestBody);

	const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: requestBody.items[0].amount * 100,
		currency: "aud",
		// in current Stripe API, this parameter is optional as it is enabled by default
		// automatic_payment_methods: { enabled: true },
		// payment_method_types: [
		// 	"card",
		// 	//Australian Bulk Electronic Clearing System
		// 	"au_becs_debit",
		// ],
	});

	// console.log("paymentIntent = ", paymentIntent);

	return new Response(
		JSON.stringify(
			// { clientSecret: session.client_secret }
			// { message: requestBody }
			{ clientSecret: paymentIntent.client_secret }
		),
		{
			status: 200,
		}
	);
};

export const config = {
	method: "POST",
	path: "/create-payment-intent",
};
