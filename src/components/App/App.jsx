import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../../utilities";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CompletePage, Checkout, Donate } from "../../components";

const stripePromise = getStripe();

export const App = () => {
	const options = {
		mode: "payment",
		amount: 500,
		currency: "aud",
		// Elements component is customizable with appearance API.
		appearance: {
			theme: "flat",
		},
		loader: "auto",
	};

	return (
		<Router>
			<div className="App">
				<Elements options={options} stripe={stripePromise}>
					<Routes>
						<Route exact path="/" element={< Donate />} />
						<Route exact path="/checkout" element={<Checkout />} />
						<Route exact path="/complete" element={<CompletePage />} />
					</Routes>
				</Elements>
			</div>
		</Router>
	);
};
