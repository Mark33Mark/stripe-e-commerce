import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = async () => {
	if (!stripePromise) {
		stripePromise = await loadStripe(
			import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY
		);
	}
	return stripePromise;
};
