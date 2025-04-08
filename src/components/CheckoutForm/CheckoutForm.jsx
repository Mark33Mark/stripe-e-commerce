import { useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

    const [email, setEmail] = useState('');
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "https://5555.codeserver.watsonised.me/complete",
                receipt_email: email,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		// layout: "tabs",
        layout: {type: "accordion", visibleAccordionItemsCount: 1},
        business: {name: "Watsonised Pty Ltd"},
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<input
				id="email"
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter email address"
			/>
			<PaymentElement id="payment-element" options={paymentElementOptions} />
			<button disabled={isLoading || !stripe || !elements} id="submit">
				<span id="button-text">
					{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};
