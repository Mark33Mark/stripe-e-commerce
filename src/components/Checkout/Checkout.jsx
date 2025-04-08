import { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

export const Checkout = (props) => {

	const { donation } = props;

	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const handleError = (error) => {
		setLoading(false);
		setErrorMessage(error.message);
		console.log("⚠️ There's a problem: ", error.message);
	};

	const handleSubmit = async (event) => {
		// stop default form submission from refreshing the page
		event.preventDefault();

		if (!stripe) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			console.log("⚠️ Process Error: Stripe has not loaded, exiting payment.")
			return;
		}

		setLoading(true);

		// Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}

		// Create the PaymentIntent and obtain clientSecret
		const res = await fetch("/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: [
					{ id: "donation-for-Mark-Watson-web-development", amount: donation },
				],
			}),
		});

		//https://stackoverflow.com/questions/53511974/javascript-fetch-failed-to-execute-json-on-response-body-stream-is-locked
		const { clientSecret } = await res.clone().json();

		// Confirm the PaymentIntent using the details collected by the Payment Element
		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: "https://8888.codeserver.watsonised.me/complete",
				// receipt_email: email,
			},
		});

		if (error) {
			// This point is only reached if there's an immediate error when
			// confirming the payment. Show the error to your customer (for example, payment details incomplete)
			handleError(error);

		}
	};

	const paymentElementOptions = {
		// layout: "tabs",
        layout: {type: "accordion",  spacedAccordionItems: true, visibleAccordionItemsCount: 1},
        business: {name: "Watsonised Pty Ltd"},
		fields: {billingDetails:"auto"},
		paymentMethodOrder: ["card", "au_becs_debit"]
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" options={paymentElementOptions} />
			<button type="submit" disabled={!stripe || loading}>
				donate <span className="button__donation-amount" > AUD$ {donation} </span> to: Mark Watson
			</button>
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
};
