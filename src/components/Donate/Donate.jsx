import { useState, useEffect } from "react";
import { RandomNumber, Checkout } from "../../components";

const MIN_DONATION = 1;
const MAX_DONATION = 5000;

export const Donate = () => {
	const [amount, setAmount] = useState(MIN_DONATION);
	const [randomNumberResponse, setRandomNumberResponse] = useState("");
	const [showStripeForm, setShowStripeForm] = useState(false);

	const [opacity, setOpacity] = useState(false);

	const handleDonationInput = (event) => {
		const userEnteredDonation = event.target.value;

		// validation user entered number < 1 or > 5000, revert user entry to min or max.
		const checkIfValueInRange =
			parseInt(userEnteredDonation) > MAX_DONATION
				? MAX_DONATION
				: parseInt(userEnteredDonation) < MIN_DONATION
				? MIN_DONATION
				: parseInt(userEnteredDonation);

		const strNumberWithThousandsSeparation =
			addThousandsSeparation(checkIfValueInRange);

		setAmount(strNumberWithThousandsSeparation);
	};

	const addThousandsSeparation = (value) => {
		// https://stackoverflow.com/questions/74666712/how-to-add-thousand-separator-for-number-input-fields-in-react
		return value
			.toString()
			.replace(/[^0-9]/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const submitDonationAmount = () => {
		console.log("DONATION SUBMITTED opactiy = ", opacity);
		setOpacity(!opacity);
	};

	useEffect(() => {
		if (randomNumberResponse > 0) {
			setAmount(randomNumberResponse);
		}
	}, [randomNumberResponse]);

	const handleUnmountAfterAnimation = (event) => {
		if (event.target.className === "donation__card hide") {
			setShowStripeForm(true);
		}
	};

	return (
		<>
			{!showStripeForm && (
				<div className="donation__landing">
					<RandomNumber
						setRandomNumberResponse={setRandomNumberResponse}
						opacity={opacity}
					/>

					<section
						className={"donation__card " + (opacity ? "hide" : "show")}
						onAnimationEnd={handleUnmountAfterAnimation}
					>
						<div className="donation__card-content">
							<h2 className="donation__card-heading" />
							<h2>donate here:</h2>
							<div className="donation__input-wrapper">
								<label hidden>donate here:</label>
								<span className="donation__input--prefix">AUD$</span>
								<input
									id="input-donation-amount"
									className="donation__input--field"
									type="text"
									value={amount.toLocaleString()}
									name="donation"
									onChange={handleDonationInput}
								/>
							</div>
							<button
								className="donation__button"
								type="submit"
								onClick={submitDonationAmount}
							>
								Pay
							</button>
						</div>
					</section>
				</div>
			)}

			{showStripeForm && (
				<div className={"stripe-checkout " + (opacity ? "show" : "hide")}>
					<Checkout donation={amount.toLocaleString()} />
				</div>
			)}
		</>
	);
};
