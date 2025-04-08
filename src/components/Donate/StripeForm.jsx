// import { useElements, useStripe, useSubmitPayment } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { getStripe } from "../../utilities";


export const StripeForm = (props) => {

	const {
		client_secret,
		amount,
		handleClear,
		handleConfirmPayment,
	} = props;

	const stripe = getStripe();
	const elements = useElements();

	console.log('stripe StripeForm = ', stripe)

	const { error } = stripe.confirmPayment({
		elements,
		client_secret,
		confirmParams: {
			return_url: '/return',
			cancel_url: '/cancelled'
		},
	});

	console.log('confirmPayment error = ', error);

	const handleSubmit = async (e) => {
		elements.submit();
		e.preventDefault();
		mutate();
	};

	useEffect(() => {
		if (data) handleConfirmPayment(data);
	}, [data]);

	return (
		<div>
			<h2>
				Thanks for your support!
			</h2>
			<PaymentElement />
			<div>
				<button variant="outlined" onClick={handleClear}>
					Cancel
				</button>
				<button variant="contained" onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? "Progressing" : `Donate $${amount / 100}`}
				</button>
			</div>
		</div>
	);
};
