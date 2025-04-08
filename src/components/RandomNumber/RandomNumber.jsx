import { useEffect, useState } from "react";
import { useApi } from "../../hooks";
import { SliderValueSelector } from "./SliderValueSelector";

export const RandomNumber = (props) => {
	const { setRandomNumberResponse, opacity } = props;
	const API_KEY = import.meta.env.VITE_RANDOM_NUMBER_KEY;

	const [sliderValue, setSliderValue] = useState(100);
	const [valueChanging, setValueChanging] = useState(false);
	const [randomNumberGenerated, setRandomNumberGenerated] = useState(false);

	const URL_FETCH = "https://api.random.org/json-rpc/4/invoke";
	const METHOD = "POST";
	const REQUEST_DATA_RANDOM = {
		jsonrpc: "2.0",
		method: "generateIntegers",
		params: {
			apiKey: API_KEY,
			n: 1,
			min: 1,
			max: sliderValue,
			replacement: true,
		},
		id: `watsonised-${Date.now()}`,
	};

	const { apiState, data, execute } = useApi(
		URL_FETCH,
		METHOD,
		REQUEST_DATA_RANDOM
	);

	const generateRandom = () => {
		execute();
		setRandomNumberGenerated(!randomNumberGenerated);
	};

	// useEffect(() => console.log(apiState), [apiState]);

	useEffect(() => {
		setValueChanging(true);
		setTimeout(() => {
			setValueChanging(false);
		}, 2500);
	}, [sliderValue]);

	useEffect(() => {
		if (data?.result?.random?.data) {
			const [randomNumber] = data?.result?.random?.data;
			setRandomNumberResponse(randomNumber);

			// console.log("random result = ", randomNumber);
		}
	}, [data]);

	const inspectAnimationEnd = event => {
		console.log('onAnimatedEnd Event "fadeIn" = ', event.target);
	}

	console.log('tag state = ', {opacity, randomNumberGenerated})

	return (
		<>
			<section className="random-generator__section">
				<div
					className={
						"random-generator__container " +
						(opacity || randomNumberGenerated ? "hide" : "show")
					}
				>
					<h3>Generate Random Donation</h3>

					<details className="random-generator__information-panel">
						<summary>
							<span> click me to learn about random generator </span>
						</summary>
						<p>
							Set the maximum random number by using the slider or + / -
							buttons. The Random Number generator is <strong>true</strong>{" "}
							random, created from atmospheric sound,{" "}
							<a
								href="https://random.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								click me for more information
							</a>
							.
						</p>
					</details>
					<SliderValueSelector
						setSliderValue={setSliderValue}
						sliderValue={sliderValue}
					/>
					<div className="slider-value-range">
						range for random generation:{" "}
						<p>
							minimum: <strong>AUD$1</strong> to
						</p>
						<p
							className={
								"slider-value-range__maximum" +
								(valueChanging ? "--changing" : "")
							}
						>
							maximum: <strong>AUD${sliderValue.toLocaleString()}</strong>
						</p>
					</div>
				</div>
				{apiState !== "server request: complete" && (
					<button className="random-generator__button" onClick={generateRandom}>
						{apiState === "server request: loading" ? (
							<div className="container-progress-balls">
								<div id="ball-1" className="circle"></div>
								<div id="ball-2" className="circle"></div>
								<div id="ball-3" className="circle"></div>
							</div>
						) : (
							<div>generate donation</div>
						)}
					</button>
				)}

				<div
					className={
						"random-generator__background " +
						(opacity || randomNumberGenerated ? "show" : "hide")
					}
					style={{visibility: randomNumberGenerated ? "visible" : "hidden"}}
				>
					<div className={"random-generator__background--pop-art "  +
						(opacity || randomNumberGenerated ? "show" : "hide")}
							onAnimationEnd={inspectAnimationEnd}
					></div>
				</div>
			</section>
		</>
	);
};
